import './App.css'
import Navbar from './Navbar'
import { useState } from 'react'
import Banner from './components/Banner'

function App() {
    const [showBanner, setShowBanner] = useState(true);
    const handleCloseBanner = () => { setShowBanner(false); };

  return (
      <>
          <div className="App">
              {showBanner && (
                  <Banner
                      message="Bienvenido a nuestro nuevo portal web!"
                      onClose={handleCloseBanner}
                   />
              )}
          </div>
          <Navbar/>
      </>
  )
}

export default App
