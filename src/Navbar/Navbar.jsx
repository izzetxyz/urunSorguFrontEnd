import React, {useState} from 'react'
import './Navbar.css'
import {AiFillCloseCircle} from 'react-icons/ai'
import {TbGridDots} from 'react-icons/tb'
import {BiBarcodeReader} from 'react-icons/bi'
import aartilogo from './aartilogo.png'
import { Cookies, useCookies } from 'react-cookie';


const Navbar = () => {
  const [cookiesv2, setCookiev2,removeCookie] = useCookies(['Company_Name']);
  const [cookies, setCookie] = useCookies(['jwtToken']);
  const [active, setActive]  = useState('navBar')
  const showNav = ()=>{
      setActive('navBar activeNavbar')
  }
  const removeNav = ()=>{
      setActive('navBar')
  }

  const cikis = () => {
    removeCookie('Company_Name')
  }
  
  return (
    <section className='navBarSection'>
       <header className="header flex">
        
          <div className="logoDiv">
            <a  href="/home" className="logo flex"><img src={aartilogo}/>&nbsp; &nbsp;<h1>  Ürün Sorgulama  <BiBarcodeReader/></h1></a>
          </div>

          <div className={active}>
            <ul onClick={removeNav} className="navLists flex">
              <li className="navItem">
                <a href="/home" className="navLink">Ana Sayfa</a>
              </li>
             
              <li className="navItem">
                <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwjLxcKWmNb9AhV7Q_EDHSmQBSAQFnoECBIQAQ&url=http%3A%2F%2Fwww.aartiyazilim.com.tr%2F&usg=AOvVaw3iFaDR0J8OokIkBgdpXOKY" className="navLink">Hakkımızda</a>
              </li>
              <li className="navItem">
                <a href="/contact" className="navLink">İletişim</a>
              </li>
             
              <button onClick={cikis} className="btn">
                   ÇIKIŞ
              </button>

            </ul>
              <div onClick={removeNav} className="closeNavbar">
              <AiFillCloseCircle className='icon'/>
              </div>
          </div>

          <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className='icon'/>
          </div>
       </header>
    </section>
  )
}

export default Navbar