import React, { useState } from 'react';
import AuthModal from '../components/AuthModal.js';
import Navbar from '../components/Navbar.js';
import {useCookies} from "react-cookie";

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const authToken = cookies.AuthToken

    const handleClick = () => {
        if (authToken) {
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return
        }
        setShowModal(true)
        setIsSignUp(true)
    }

    return (
        <>
            <div className="overlay">
                <Navbar authToken={authToken} minimal={false} setIsSignUp={setIsSignUp} setShowModal={setShowModal} showModal={showModal}/>
                <div className='home'>
                    <h1 className='primary-title'>Swipe Right&reg;</h1>
                    <button className='primary-button' onClick={handleClick}>
                        {authToken ? 'Signout' : 'Create Acccount'}
                    </button>

                    {showModal && (
                        <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;