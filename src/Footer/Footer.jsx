import React from 'react'
import './Footer.css'

const Footer = () => {
    const year = new Date().getFullYear();
  
    return <footer>Copyright © <a href='http://www.aartiyazilim.com.tr/'>AARTI Yazılım</a> {`${year}`}</footer>;
  };
  
  export default Footer;