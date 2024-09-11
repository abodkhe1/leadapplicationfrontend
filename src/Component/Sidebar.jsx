import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <>
      <nav className="sidebar p-3" style={{background:'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)'}}>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active text-dark" to={'Dashboard'}>Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to={'CreateLead'}>Create Lead</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to={'LeadList'}>Lead List</Link>

          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to={'AddPrd'}>Add Product</Link>

          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to={'ProdList'}>Product List</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Sidebar