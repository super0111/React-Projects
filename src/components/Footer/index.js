
import React, { useState, useEffect, useHistory } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
const Footer = () => {

    return (
        <>            
            <footer>
                <a href="https://www.saitamatoken.com/" target="_blank" rel="noreferrer">Website</a>
                <a href="https://t.me/SaitamaWorldwide" target="_blank" rel="noreferrer">Telegram</a>
                <a href="https://discord.com/invite/saitama" target="_blank" rel="noreferrer">Discord</a>
                <a href="https://twitter.com/WeAreSaitama" target="_blank" rel="noreferrer">Twitter</a>
                <a href="https://etherscan.io/address/0xce3f08e664693ca792cace4af1364d5e220827b2" target="_blank" rel="noreferrer">BSCscan</a>
                <a href="https://www.saitamatoken.com/" target="_blank" rel="noreferrer">Contact us</a>
            </footer>
        </>
    )
}

export default Footer;
