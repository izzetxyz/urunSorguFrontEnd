import Sorgu from './Sorgu';
import Navbar from './Navbar/Navbar';
import './App.css';
import Footer from './Footer/Footer';
import Login from   './Login/Login'
import { Link} from "react-router-dom";

import { Cookies,useCookies } from 'react-cookie';

const İletisim = () => {


  const [cookies, setCookie] = useCookies(['jwtToken']);
  const [cookiesv2, setCookiev2] = useCookies(['Company_Name']);

  if (cookies.jwtToken && cookiesv2.Company_Name) {

  
  return (

    <>
      <Navbar/>
      <br/><br/><br/>
    <div className='sonuc'>
    <br/> <br/> <br/> <br/>
          <h1>İletişim Bilgileri</h1>

          <h3>
          <h2><b>A+ Yazılım Ltd. Şti</b></h2>
          <br/> <br/>
          Aşağı Öveçler Cad. 1322. Cadde No:75/4 ÇANKAYA / ANKARA  <br/> <br/>
          Telefon: (0312) 473 36 39 - GSM : 0533 636 80 44  <br/> <br/> Eposta : info@aartiyazilim.com.tr
          </h3>
    </div>

    <br/> <br/>
    <Footer/>
    </>
  )
                   } 
  else{
    return (
      <div className='sonuc'>

        <br/><br/><br/><br/><br/>
          <h1>Oturum sonlandı veya çıkış yapılmak isteniyor...</h1>
          <br/><br/>
          <Link to="/"><h2>Giriş Sayfasına Git</h2></Link>
        </div>
    )
  }
}

export default İletisim;
