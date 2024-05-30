package org.ehbproject.backend;

import org.springframework.context.ApplicationContext;
import org.ehbproject.backend.services.emailservice.EmailService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class SendEmailApplication {

    private EmailService emailService;
    public SendEmailApplication (EmailService emailService){
        this.emailService = emailService;
    }

    public static void main(String[] args){
        ApplicationContext context = SpringApplication.run(SendEmailApplication.class, args);
        SendEmailApplication app = context.getBean(SendEmailApplication.class);

        app.Run();
    }

    private void Run(){
        emailService.SendMail("thomas.van.der.borght@student.ehb.be", "herinnering", "breng terug");
    }
}
