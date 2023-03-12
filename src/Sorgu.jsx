import './App.css';
import React, { useState, useEffect} from 'react'
import Quagga from 'quagga';
import {BiBarcodeReader} from 'react-icons/bi'
import {BsFillCaretDownFill, BsFillCaretUpFill} from 'react-icons/bs'
import {FiRefreshCcw} from'react-icons/fi'
import {AiOutlineClose} from 'react-icons/ai'
import axios from 'axios';
import { useLocation, useNavigate,Link  } from 'react-router-dom';
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'

import { Cookies, useCookies } from 'react-cookie';
const Sorgu = () => {
  const navigate= useNavigate();
  const [cookies, setCookie] = useCookies(['jwtToken']);
  const [cookiesv2, setCookiev2] = useCookies(['Company_Name']);
  const  [barcode, setBarcode] = useState("-");
    const  [urunadi, setUrunadi] = useState("-");
    const  [urunrenk, setUrunrenk] = useState("-");
    const  [urunbarkod, setUrunbarkod] = useState("-");
    const  [beden, setBeden] = useState("-");
    const  [merkez, setMerkez] = useState("-");
    const  [magaza, setMagaza] = useState("-");
    const  [sezon, setSezon] = useState("-");
    const [uyari, setUyari] = useState("-");
    const [uyariiki, setUyariiki] = useState("");
    const [message, setMessage] = useState('');
    const [gelenad, setGelenad] = useState("");
    const [visible, setVisible] = useState(false);
    const [veri, setVeri] = useState([]);
    // const hosgeldin = cookiesv2.Company_Name.toString()
    

  if (cookies.jwtToken && cookiesv2.Company_Name) {
    
    
  
      const openCam = () =>{
          Quagga.init({
            numOfWorkers: 0,
              inputStream : {
                name : "Live",
                type : "LiveStream",
                target: document.querySelector('#camera')    
              },
              decoder : {
                readers : ["ean_reader"]
              }
            }, function(err) {
                if (err) {
                    console.log(err);
                    return
                }
                console.log("Initialization finished. Ready to start");
                Quagga.start();
            });
          
          
            Quagga.onDetected(function(data)
            {

              console.log(data);
              if(data) {
                  setBarcode(data.codeResult.code)
                  console.log(barcode)
                  
                  const json = {
                      barcode: data.codeResult.code.toString(),
                      Company_Name: cookiesv2.Company_Name
                      }
          
                      axios.post("https://aartiurunsorguv1.onrender.com/api/getBarcodev2", json).then(response => {
                          console.log(response);
                        if (response.data){
                          setUrunadi(response.data.UrunAdi);
                          setUrunbarkod(response.data.Barcode);
                          setUrunrenk(response.data.RenkAdi);
                          setBeden(response.data.Beden)
                          setMerkez(response.data.Merkez)
                          setMagaza(response.data.Magaza)
                          setSezon(response.data.Sezon)
                          setUyari("")
                          setGelenad(response.data.UrunAdi)
                        }else{
                          setUyari("Ürün Veritabanında Bulunamadı!")
                          setUrunadi("-");
                          setUrunbarkod("-");
                          setUrunrenk("-");
                          setBeden("-")
                          setMerkez("-")
                          setMagaza("-")
                          setSezon("-")
                          
                        }
                        
                      
          
                      }).catch(error => {
                          console.log("hata olustu");
                          
                      })
              }
              //  document.querySelector('#barcode').innerHTML = data.codeResult.code;
            })
            


          
      }


          
          
        

              
              

              const kiyasla = () =>{ 
                
                      setBarcode(message)
                      const json = {
                          barcode: message.toString(),
                          Company_Name: cookiesv2.Company_Name
                          }
                          axios.post("https://aartiurunsorguv1.onrender.com/api/getBarcodev2", json).then(response => {
                              console.log(response);
                            if (response.data){
                              setUrunadi(response.data.UrunAdi);
                              setUrunbarkod(response.data.Barcode);
                              setUrunrenk(response.data.RenkAdi);
                              setBeden(response.data.Beden)
                              setMerkez(response.data.Merkez)
                              setMagaza(response.data.Magaza)
                              setSezon(response.data.Sezon)
                              setUyari("")
                              setGelenad(response.data.UrunAdi)
                              


                            } else{
                              setUyari("Ürün Veritabanında Bulunamadı!")
                              setUrunadi("-");
                              setUrunbarkod("-");
                              setUrunrenk("-");
                              setBeden("-")
                              setMerkez("-")
                              setMagaza("-")
                              setSezon("-")
                              
                            }
              
                          }).catch(error => {
                              console.log("hata olustu");
                              
                          })
                      
                      
                  
          }




              const digerbedenler = () => {
                 setVisible(true)
                console.log(gelenad)
                const json = {
                  UrunAdi: gelenad,
                  Company_Name: cookiesv2.Company_Name
                  }
                axios.post("https://aartiurunsorguv1.onrender.com/api/getOthers" , json)
                                .then(res=>{
                                    console.log(res)
                                  setVeri(res.data[0])
                                  setUyariiki("")
                                    console.log(veri)
                                    if (uyari == "Ürün Veritabanında Bulunamadı!" || uyari == "-"){
                                      setVeri([""])
                                      setUyariiki("Beden Bulunamadı!")
                                    }
                                }
                                )
              }

              const digerbedenlerkapat = () => {
                setVisible(false);
              }
          

          const handleChange = (event) => {
              setMessage(event.target.value);
          
              console.log('Input değeri : ', event.target.value);
          };

        
         

      return (

        <>
        <Navbar/>
          <br/><br/><br/><br/><br/>
          <div className="sonuc">
              <div className='sonuc'>


                  <div className='aside'>
                      
                      {/* <h3>Hoşgeldin, <b>{hosgeldin}</b></h3> */}
                      <br/> <br/>
                      <h2>Ürün:</h2>
                      <input type="text" name="input" placeholder='Barkod No Giriniz...' value={message} onChange={handleChange} required >
                      </input>
                      <br/> <br/>
                      <button className='btn' type="button" onClick={kiyasla}>
                          Sorgula
                      </button>
                      &nbsp; &nbsp; &nbsp;<br/><br/>
                    
                      <button onClick={openCam} type="button" className='btn'>
                          Kamera ile Sorgula <BiBarcodeReader/>
                      </button>
                      &nbsp; &nbsp; &nbsp;
                      

                    
          

                  </div>
                      
                      <div >
                          <br/>
                      {/* <div className='sonuc'>
                          <h3>Okunan Barkod:</h3> <h2><i>{barcode}</i></h2><br/> 
                          
                          
                        </div> */}

                        
                            
                            
                                {/* <u> <h3>Ürün Bilgileri </h3> </u>
                              Ürün adı: <b><i>{urunadi}</i> </b> <br/>
                              Ürün barkodu: <b><i>{urunbarkod}</i></b> <br/>  
                              Ürün renk: <b><i>{urunrenk}</i> </b><br/> 
                              <b><i>{uyari}</i> </b> */}
                              <div >
                                <table >
                                <caption><h3>Ürün Bilgileri</h3></caption>
                                <thead>
                                  <tr>
                                    <th scope="col">Ürün Adı</th>
                                    <th scope="col">Barkod</th>
                                    <th scope="col">Renk</th>
                                    <th scope="col">Beden</th>
                                    <th scope="col">Merkez Envanter</th>
                                    <th scope="col">Mağaza Envanter</th>
                                    <th scope="col">Sezon Envanter</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  <tr>
                                    <td data-label="Ürün Adı">{urunadi}</td>
                                    <td data-label="Barkod">{urunbarkod}</td>
                                    <td data-label="Renk">{urunrenk}</td>
                                    <td data-label="Beden">{beden}</td>
                                    <td data-label="Merkez Envanter">{merkez}</td>
                                    <td data-label="Mağaza Envanter">{magaza}</td>
                                    <td data-label="Sezon Envanter">{sezon}</td>
                                  </tr>
                                  </tbody>
                                  

                                  <tfoot>
                                    <tr>
                                      <th colSpan= "7"><i>{uyari}</i></th>
                                    </tr>
                                  </tfoot>
                                  
                                </table>
                            </div>

                            <br/>
                          
                          <button onClick={digerbedenler} className='btn' type="button" >
                          Diğer Bedenleri Göster <FiRefreshCcw/> 
                            </button> 
                            <br/> <br/> 
                            {visible && (
                                <div >
                                <table >
                                <thead>
                                  <tr>
                                    <th scope="col">Ürün Adı</th>
                                    <th scope="col">Barkod</th>
                                    <th scope="col">Renk</th>
                                    <th scope="col">Beden</th>
                                    <th scope="col">Merkez Envanter</th>
                                    <th scope="col">Mağaza Envanter</th>
                                    <th scope="col">Sezon Envanter</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                      {veri.map((item) => (
                                        <tr key={item.Barcode}>
                                          <td>{item.UrunAdi}</td>
                                          <td>{item.Barcode}</td>
                                          <td>{item.RenkAdi}</td>
                                          <td>{item.Beden}</td>
                                          <td>{item.Merkez}</td>
                                          <td>{item.Magaza}</td>
                                          <td>{item.Sezon}</td>
                                        </tr>
                                      ))}
                                  </tbody>
                                  

                                  <tfoot>
                                    <tr>
                                      <th colSpan= "7"><i>{uyariiki}</i></th>
                                    </tr>
                                  </tfoot>
                                  
                                </table>
                                <br/> 
                                <button onClick={digerbedenlerkapat} className='btn' type="button" >
                                   Kapat <AiOutlineClose/>
                            </button>
                            </div>
                                  )}
                    
                          
                    
                          <br/>
                          <div className="camera">
                      <div id='camera'>
                      {/* <div id="reader" width="600px"></div> */}
                      </div>
                          

                      </div>

                    
                      </div>
                      
                  </div>



                  </div>  
                  <br/><br/><br/><br/><br/><br/>
                  <Footer/>  
                  </>

      
      );
                            }
    else{
      
      return (
        <div className='sonuc'>
          <br/><br/><br/><br/><br/>
          <h1>Oturum sonlandı veya çıkış yapılmak isteniyor...</h1>
          <br/><br/>
          <Link to="/"><h2>Giriş Sayfasına Git</h2></Link>
        </div>
      );
      
    }
}

export default Sorgu;
