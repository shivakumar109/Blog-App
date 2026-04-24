import Header from './Header.jsx'
import Footer from './Footer.jsx' 
import { Outlet } from 'react-router'
import { useEffect } from 'react'
import { useAuth } from '../Store/AuthStore.js'

function RootLayout() {
  const checkAuth=useAuth((state)=>state.checkAuth);
  const loading =useAuth((state)=>state.loading);
  useEffect(()=>{
    checkAuth();
  },[])
  //wait until the checkauth function 
  if (loading){
    return <p>Loading....</p>
  }
  return (
    <div>
      <Header/>
          {/* component placeholder */}
          <div className='mx-20 min-h-screen'>
               <Outlet/>
          </div>
          <Footer/> 
    </div>
  )
}

export default RootLayout