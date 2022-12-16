
import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHistory, useLocation} from 'react-router-dom';
import $, { get } from 'jquery';
import { ethers } from "ethers";
import Web3 from 'web3';
import './index.css';
import Logo from '../../img/quotation/logo.png';
import { useMediaQuery } from 'react-responsive';
import { FaList } from 'react-icons/fa';

import { StoreContext } from '../../store';

const Header = () => {
    const history = useHistory();    
    const location = useLocation();
    const global = useContext(StoreContext);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const [isShowModal, setIsShowModal] = useState(false);
    const [menuItem, setMenuItem] = useState(false);
    const [isMenu, setIsMenu] = useState(false);
    const showModal = () => {
        setIsMenu(true);
    }
    const goLink = (text) => {
        history.push("/" + text);
        setMenuItem(text);
        setIsMenu(false);
    }
    const getItem = () => {        
        const path = location.pathname.split("/")[1];
        console.log(path);
        setMenuItem(path);
    }
    const connectWallet = () => {
        global.setModalIsOpen(true);
    }
    useEffect(() => {
        getItem();
    }, [menuItem])
    return (
        <div className='nav py-2'>
            <div className='container'>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex'>
                        <div className='m-auto logo cursor-pointer' onClick={() => goLink('home')}><img src={Logo} /></div>
                        {!isTabletOrMobile && (
                            <div className='d-flex align-self-center'>
                                <div className='px-4' onClick={() => goLink('home')}><p className={`cursor-pointer ${menuItem !== 'home' ? 'text-gray' : 'text-white'}`}>Dashbaord</p></div>
                                <div className='px-4' onClick={() => goLink('trade')}><p className={`cursor-pointer ${menuItem !== 'trade' ? 'text-gray' : 'text-white'}`}>Trade</p></div>
                                <div className='px-4' onClick={() => goLink('earn')}><p className={`cursor-pointer ${menuItem !== 'earn' ? 'text-gray' : 'text-white'}`}>Earn</p></div>
                                <div className='px-4' onClick={() => goLink('referral')}><p className={`cursor-pointer ${menuItem !== 'referral' ? 'text-gray' : 'text-white'}`}>Referral</p></div>
                            </div>
                        )}
                        {isTabletOrMobile && (
                            <div>
                                <div className='d-flex mt-2 ml-3'>
                                    <FaList className='text-white fs-24' onClick={showModal}/>
                                </div>
                                {isMenu && (
                                    <div className='nav-menu p-4'>
                                        <div className='d-flex justify-content-between'>
                                            <div className='logo d-flex py-2'><img src={Logo} /></div>
                                            <div className='text-white' onClick={() => setIsMenu(false)}><h3 className='text-white'>x</h3></div>
                                        </div>
                                        <hr className='text-white' />
                                        <div className={`pt-1 ${menuItem !== 'home' ? '' : 'menu-active'}`} onClick={() => goLink('home')}><h4 className='text-white'>Dashboard</h4></div>
                                        <div className={`${menuItem !== 'trade' ? '' : 'menu-active'}`} onClick={() => goLink('trade')}><h4 className='text-white'>Trade</h4></div>
                                        <div className={`${menuItem !== 'earn' ? '' : 'menu-active'}`} onClick={() => goLink('earn')}><h4 className='text-white'>Earn</h4></div>
                                        <div className={`${menuItem !== 'referral' ? '' : 'menu-active'}`} onClick={() => goLink('referral')}><h4 className='text-white'>Referral</h4></div>
                                    </div>
                                )}                                
                            </div>
                        )}
                    </div>  
                    <div>
                        <div className='button d-flex' onClick={connectWallet}><div className='circle mr-2'></div><p className='mb-0'>Connect Wallet</p></div>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default Header;
