import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
        <footer className="p-4 h-20 bg-black text-white rounded-md text-center mt-auto">
            <a href="https://www.erasmushogeschool.be/nl" target='blank'><p className='hover:underline'>©copyright erasmus hogeschool Brussel</p></a>
        </footer>
        <div className='flex justify-center p-1 space-x-4 text-lg'>
            <a href="https://www.facebook.com/erasmushogeschool/?locale=nl_BE" target='blank'>
                <FaFacebook className=' hover:bg-gray-200' />
            </a>
            <a href="https://twitter.com/ehbrussel" target='blank'>
                <FaXTwitter className=' hover:bg-gray-200'/>
            </a>  
            <a href="https://www.instagram.com/erasmushogeschool/" target='blank'>
                <FaInstagram className=' hover:bg-gray-200' />
            </a>
            <a href="https://www.linkedin.com/school/erasmushogeschool-brussel/?originalSubdomain=be" target='blank'>
                <FaLinkedin className=' hover:bg-gray-200' />
            </a>
        </div>
    </>
  );
};

export default Footer;