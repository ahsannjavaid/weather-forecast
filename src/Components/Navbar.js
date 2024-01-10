import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const ClickHandler = () => {
        window.location.reload()
        navigate("/")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark shadow-lg" style={{backgroundColor: 'blueviolet'}}>
                <div className="container-fluid">
                    <button onClick={ClickHandler} className="navbar-brand fw-bolder mx-auto btn" to={'/'}>Weather Forecast</button>
                </div>
            </nav>
        </>
    )
}

export default Navbar