import { useState } from 'react'
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css'
import Header from './Component/Header';
import Sidebar from './Component/Sidebar';
import Footer from './Component/Footer';
import { Outlet } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <!-- Header --> */}
      <Header />

      <main>
        {/* <!-- Sidebar --> */}
        <Sidebar />
        <div className="content">
          <Outlet />
        </div>
      </main>
      <Footer />

    </>
  )
}

export default App
