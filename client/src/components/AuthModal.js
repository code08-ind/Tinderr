import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const AuthModal = ({ setShowModal, isSignUp }) => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    let navigate = useNavigate();

    const handleClick = () => {
        setShowModal(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignUp && (password === confirmPassword)) {
                setError("Passwords need to match!!");
                return
            }
            const response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup' : 'login'}`, { email, password });
            setCookie('AuthToken', response.data.token);
            setCookie('UserId', response.data.userId)

            const success = response.status === 201;
            if (success && isSignUp) navigate('/onboarding');
            if (success && !isSignUp) navigate('/dashboard');
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='auth-modal'>
            <div className='close-icon' onClick={handleClick}>
                &#x26D2;
            </div>
            <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
            <p>By clicking Sign In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id='email'
                    name='email'
                    placeholder='Enter Your Email Address'
                    required={true}
                    onChange={(e) => setEmail(e.targte.value)}
                />
                <input
                    type="password"
                    id='password'
                    name='password'
                    placeholder='Enter Your Password'
                    required={true}
                    onChange={(e) => setPassword(e.targte.value)}
                />
                {isSignUp && <>
                    <input
                        type="password"
                        id='password-check'
                        name='password-check'
                        placeholder='Enter Your Password Again'
                        required={true}
                        onChange={(e) => setConfirmPassword(e.targte.value)} />
                    <input className='secondary-button' type="submit" value="" />
                </>
                }
                <p>{error}</p>
            </form>
            <hr />
            <h2>GET THE APP</h2>
        </div>
    )
}

export default AuthModal