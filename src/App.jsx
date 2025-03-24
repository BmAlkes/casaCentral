import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import Listing from './Pages/Listing'
import Property from './Pages/Property'
import Bookings from './Pages/Bookings'
import Favorites from './Pages/Favorites'
import { Suspense, useState } from 'react'
import Layout from './components/Layout'
import {QueryClient, QueryClientProvider} from 'react-query'
import { ToastContainer } from 'react-toastify'
import {ReactQueryDevtools} from 'react-query/devtools'
import 'react-toastify/ReactToastify.css'
import UserDetailContext from './Context/userDetailsContext'

function App() {
  
  const queryClient = new QueryClient()
  const [userDetail, setUserDetail]=useState({
    favorites:[],
    bookings:[],
    token:null
  })

  return (
    <>
    <UserDetailContext.Provider value={{userDetail, setUserDetail}}>

    <QueryClientProvider client={queryClient}>

      <BrowserRouter>
      <Suspense fallback={<div>Loading data...</div>}>
      <Routes >
        <Route element={<Layout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/listing">
        <Route index element={<Listing/>}/>
        <Route path=":propetyId" element={<Property/>} />
        </Route>
        <Route path="/bookings" element={<Bookings/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
        </Route>
      </Routes>
      </Suspense>
      </BrowserRouter>
      <ToastContainer/>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </UserDetailContext.Provider>
    </>
  )
}

export default App
