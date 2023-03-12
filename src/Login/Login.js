import React, {useState} from "react";
import "./Login.css"
import aartilogo from './aartilogo.png'
import Footer from "../Footer/Footer";
import { useNavigate, Link, useHistory} from "react-router-dom";
import axios from 'axios'
import { Cookies,useCookies } from 'react-cookie';
import Sorgu from "../Sorgu";
import * as ReactRouterDOM from 'react-router-dom';

const jwt = require('jsonwebtoken')



const Login = () => {
    const [popupStyle, showPopup] = useState("hide")

    const popup = () => {
        showPopup("login-popup")
        setTimeout(()=> showPopup("hide"),3000)
    }
    const [Username, setUsername] = useState('')
    const [token, setToken] = useState('')
    const [Password, setPassword] = useState('')
    const navigate= useNavigate();
    const [cookies, setCookie] = useCookies(['jwtToken']);
    const [cookiesv2, setCookiev2] = useCookies(['Company_Name']);
    const[girishatali, setGirishatali] = useState("")
    
    if(!(cookies.jwtToken) || !(cookiesv2.Company_Name)){
        async function submit (e) {
        

            e.preventDefault();

            try{

                    await axios.post("https://aartiurunsorguv1.onrender.com/api/login",{
                        Username, Password
                    }).then(response => {
                        
                        if(response){
                            
                            console.log(response)
                            
                            if(response.data.status == "Giriş Başarı İle Yapıldı"){
                                setToken(response.data.jwtToken)     
                                const cookies = new Cookies();

                                const expirationDate = new Date();
                                expirationDate.setDate(expirationDate.getDate() + 7)
                                cookies.set('jwtToken', response.data.jwtToken, { path: '/', expires: expirationDate });  
                                cookies.set('Company_Name', response.data.loggedCompany, { path: '/', expires: expirationDate });           
                                navigate('/home')

                            }
                            else{                        
                                navigate('/')
                                setGirishatali("Kullanıcı adı veya şifre hatalı")
                                
                            }
                        }
                    })
            }
            catch(e){

                console.log(e) 
            }
        }




        

        return(

        <>
            <div className="sonucv2">
                <a className="logo-flex"><img src={aartilogo}/><h1>Ürün Sorgulama Giriş </h1></a> <br/>
                <form action="POST">
                    <input
                    type='text'
                    placeholder="Kullanıcı Adı"
                    onChange={(e)=>(setUsername(e.target.value))}
                    
                    />
                    <br/> <br/>
                    <input
                    type='password'
                    placeholder="Şifre"
                    onChange={(e)=>(setPassword(e.target.value))}
                    
                    />
                    <br/>  <br/>
                    <button type="submit" className="btn" onClick={submit}>GİRİŞ</button>
                </form>
                
                    <br/>  <br/>
                <div>
                   <i>{girishatali}</i> 
                </div>
            </div>

            <Footer/>
            </>
            
        )
    }
    else{
        return (
            <div className="sonuc">
                <br/><br/><br/><br/><br/>
                <h3>Çıkış yapmak için ana sayfada menüden "Çıkış" butonuna basınız.</h3>
             <br/><br/><br/><br/><br/>
              <Link to="/home"><h3>Anasayfaya Dön</h3></Link>
            </div>
          );
    }
}

export default Login