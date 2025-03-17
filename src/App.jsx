import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import Listing from './Pages/Listing'
import Property from './Pages/Property'
import AddProperty from './Pages/AddProperty'
import Bookings from './Pages/Bookings'
import Favorites from './Pages/Favorites'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/listing" element={<Listing/>}/>
        <Route path="/addproperty" element={<AddProperty/>}/>
        <Route path="/bookings" element={<Bookings/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
