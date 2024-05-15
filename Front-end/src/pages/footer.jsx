import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {

    return (
    <>
        <footer className="flex justify-between p-4 h-20 bg-black rounded-md mt-40 w-full">
            <Link to="/FAQ">
                <div className='bg-white rounded-full p-3 flex items-center justify-center 
                transform transition-transform duration-250 hover:scale-110'>
                    <p>FAQ</p>
                </div>
            </Link>
            <div className="flex-grow flex items-center justify-center">
                <a href="https://www.erasmushogeschool.be/nl" target='blank'>
                    <p className='hover:underline text-white'>©copyright erasmus hogeschool Brussel</p>
                </a>
            </div>
        </footer>
        <div className='flex items-center justify-center p-1 space-x-6 text-lg'>
            <a href="https://www.facebook.com/erasmushogeschool/?locale=nl_BE" target='blank'>
                <FaFacebook className=' transform transition-transform duration-250 hover:scale-110' />
            </a>
            <a href="https://twitter.com/ehbrussel" target='blank'>
                <FaXTwitter className=' transform transition-transform duration-250 hover:scale-110'/>
            </a>  
            <a href="https://www.instagram.com/erasmushogeschool/" target='blank'>
                <FaInstagram className=' transform transition-transform duration-250 hover:scale-110' />
            </a>
            <a href="https://www.linkedin.com/school/erasmushogeschool-brussel/?originalSubdomain=be" target='blank'>
                <FaLinkedin className=' transform transition-transform duration-250 hover:scale-110' />
            </a>
        </div>
    </>
  );    
};

export default Footer;