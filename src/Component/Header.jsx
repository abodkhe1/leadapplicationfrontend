import React from 'react'

function Header() {
    return (

        <>
            <header className="text-white text-center py-3 d-flex justify-content-between align-items-center" style={{ background: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)' }}>
                <h3 className='text-dark text-start'>Lead Application</h3>

                {/* Logout Dropdown */}
                <div className="dropdown me-3">
                    <button className="btn btn- dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        User Menu
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Logout</a></li>
                    </ul>
                </div>
            </header>
        </>
    )
}

export default Header