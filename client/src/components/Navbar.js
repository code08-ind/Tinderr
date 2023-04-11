import React from 'react';
import whiteLogo from '../images/tinder_logo_white.png'
import colorLogo from '../images/color-logo-tinder.png';

const Navbar = ({ authToken, minimal, setShowModal, showModal, setIsSignUp }) => {

    const handleClick = () => {
        setShowModal(true);
        setIsSignUp(false);
    }

    return (
        <>
            <nav>
                <div className="logo-container">
                    <img className='logo' src={minimal ? colorLogo : whiteLogo} alt="Tinderr" />
                </div>
                {
                    authToken && !minimal &&
                    <button
                        className='nav-button'
                        onClick={handleClick}
                        disabled={showModal}
                    >
                        Log In
                    </button>
                }
            </nav>
        </>
    );
}

export default Navbar;