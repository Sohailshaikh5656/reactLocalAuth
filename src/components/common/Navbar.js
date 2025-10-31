import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserData } from '../../store/slice/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState(null);
    
    useEffect(() => {
        dispatch(getUserData())
    }, [])
    
    const AllUsers = useSelector((state) => state.users.user)

    useEffect(() => {
        const userEmail = localStorage.getItem("email")
        if (userEmail && AllUsers) {
            const foundUser = AllUsers.find((item) => item.email === userEmail)
            if (foundUser) {
                setEmail(foundUser.email)
            } else {
                navigate("/login")
                setEmail(null)
            }
        }
    }, [AllUsers, navigate])

    const handleLogout = () => {
        localStorage.setItem("email", "");
        setEmail(null);
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark shadow" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '1rem 0'
        }}>
            <div className="container">
                {/* Brand Logo */}
                <Link to="/" className="navbar-brand fw-bold fs-3">
                    <i className="bi bi-rocket-takeoff me-2"></i>
                    Brand
                </Link>

                {/* Mobile Toggle Button */}
                <button 
                    className="navbar-toggler border-0" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Content */}
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    {/* Left Side Navigation */}
                    <div className="navbar-nav me-auto">
                        {email != null && (
                            <>
                                <Link to="/" className="nav-link mx-2 px-3 py-2 rounded-pill hover-effect">
                                    <i className="bi bi-house me-1"></i>
                                    Home
                                </Link>
                                <Link to="/profile" className="nav-link mx-2 px-3 py-2 rounded-pill hover-effect">
                                    <i className="bi bi-person me-1"></i>
                                    Profile
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Right Side Navigation */}
                    <div className="navbar-nav align-items-center">
                        {email == null ? (
                            <>
                                <Link to="/login" className="nav-link mx-2 px-4 py-2 rounded-pill btn-outline-light">
                                    <i className="bi bi-box-arrow-in-right me-1"></i>
                                    Login
                                </Link>
                                <Link to="/signup" className="nav-link mx-2 px-4 py-2 rounded-pill btn-light text-primary fw-medium">
                                    <i className="bi bi-person-plus me-1"></i>
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <div className="d-flex align-items-center">
                                <span className="text-light me-3 d-none d-sm-block">
                                    <i className="bi bi-person-circle me-1"></i>
                                    Welcome, {email.split('@')[0]}
                                </span>
                                <button 
                                    onClick={handleLogout} 
                                    className="nav-link mx-2 px-4 py-2 rounded-pill btn-outline-light"
                                >
                                    <i className="bi bi-box-arrow-right me-1"></i>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bootstrap Icons CDN - Add this in your index.html */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" />
        </nav>
    )
}