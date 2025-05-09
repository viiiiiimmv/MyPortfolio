import React, { useRef, useState } from 'react';
import { FaInstagram, FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';
import Loader from './Loader';
import '../assets/css/FooterContent.css';

const FooterContact = () => {
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: '', type: '' });

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        setToast({ message: '', type: '' });

        emailjs.sendForm(
            'shivchauhan',
            'template_ouv734e',
            form.current,
            '54fxdjxYO7MfHvQvi'
        )
            .then((result) => {
                setLoading(false);
                setToast({ message: 'Message sent successfully!', type: 'success' });
                form.current.reset();
            }, (error) => {
                setLoading(false);
                setToast({ message: 'Oops! Something went wrong.', type: 'error' });
            });
    };

    return (
        <div className="footer-container" id='contact'>
            {loading && <LoaderOverlay><Loader /></LoaderOverlay>}
            {toast.message && (
                <Toast className={toast.type}>
                    {toast.message}
                </Toast>
            )}
            <div className="left-section">
                <h1>CURIOUS</h1>
                <h1>ABOUT</h1>
                <h1>SOMETHING?</h1>
                <p>CONNECT WITH ME</p>
                <div className="social-icons">
                    <a href="https://www.instagram.com/__shiv.chauhan?igsh=NnJ5aWV1aTRnNnhr" target='_blank'><FaInstagram /></a>
                    <a href="https://www.linkedin.com/in/shiv-chauhan-7a8f05" target='_blank'><FaLinkedin /></a>
                    <a href="https://github.com/shiv-835" target='_blank'><FaGithub /></a>
                    <a href="https://x.com/iamshivchauhann?t=0s3quq5vbQUwe2U64NhSBw&s=09" target='_blank'><FaXTwitter /></a>
                </div>
                <p className="copyright">© 2025, Shiv Chauhan.<br />All Rights Reserved</p>
            </div>

            <div className="divider"></div>

            <div className="right-section">
                <h2>DROP ME A MESSAGE!</h2>
                <form ref={form} onSubmit={sendEmail}>
                    <label>
                        NAME
                        <input type="text" name="user_name" placeholder="Your Name" required />
                    </label>
                    <label>
                        EMAIL
                        <input type="email" name="user_email" placeholder="Your Email" required />
                    </label>
                    <label>
                        MESSAGE
                        <textarea name="message" placeholder="Your Message" required></textarea>
                    </label>
                    <button type="submit" disabled={loading}>START A CONVERSATION</button>
                </form>
            </div>
        </div>
    );
};

const LoaderOverlay = styled.div`
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
`;

const Toast = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 1000;
    background-color: ${props => props.className === 'success' ? '#4caf50' : '#f44336'};
    animation: fadeInOut 3s forwards;

    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(-20px); }
        10% { opacity: 1; transform: translateY(0); }
        90% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-20px); }
    }
`;

export default FooterContact;
