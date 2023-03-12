import Sorgu from './Sorgu';
import Navbar from './Navbar/Navbar';
import './App.css';
import Footer from './Footer/Footer';
import Login from   './Login/Login'
import İletisim from   './İletisim'

import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {



  
  return (

    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/home" element={<Sorgu/>} />
        <Route path="/contact" element={<İletisim/>} />
        
        
      </Routes>
    </Router>

    // <div>
    //   <Navbar/>
    //   <br/> <br/> <br/>
    //   <Sorgu/>
    //   <br/> <br/> <br/>
    //   <Footer/>

    // </div>

  )
}

export default App;
