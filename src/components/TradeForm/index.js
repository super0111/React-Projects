
import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {useHistory} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FaList, FaAngleDown } from 'react-icons/fa';
import { ethers } from "ethers";
import { Slider, RangeSlider } from 'rsuite';

import $ from 'jquery';
import Web3 from 'web3';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import { StoreContext } from '../../store';

import ExchangeLogo from '../../img/quotation/exchange.png';
import Logo from '../../img/quotation/TWT.png';
import TokenIcon1 from '../../img/quotation/bnb-busd.svg';
import TokenIcon2 from '../../img/quotation/lbd-bnb.svg';
import TokenIcon3 from '../../img/quotation/eth-bg.png';

const TradeForm = () => {
    const global = useContext(StoreContext);
    const [formIndex, setFormIndex] = useState(1);
    const [isTokenMenu, setIsTokenMenu] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
    const connectWallet = () => {
        global.setModalIsOpen(true);
    }
    return (
        <div>
            <div className='trade-form'>
                <div className='trade-form-input d-flex justify-content-center'>
                    <div className={`${formIndex == 1 ? 'active' : ''}`}><p onClick={() => setFormIndex(1)}>Long</p></div>
                    <div className={`${formIndex == 2 ? 'active' : ''}`}><p onClick={() => setFormIndex(2)}>Short</p></div>
                    <div className={`${formIndex == 3 ? 'active' : ''}`}><p onClick={() => setFormIndex(3)}>Swap</p></div>
                </div>
                {formIndex == 1 && (
                    <div>
                        <div>
                            <div className='trade-form-select d-flex'>
                                <div><p className='text-white'>Market</p></div>
                                <div><p className='text-white'>Limit</p></div>
                                <div><p className='text-white'>Trigger</p></div>
                            </div>
                            <div className='trade-token-select mb-2'>
                                <p className='text-gray text-left'>Pay</p>
                                <div className='d-flex justify-content-between'>
                                    <input type='text' className='token-select-input' placeholder='0.0' />
                                    <div className='d-flex cursor-pointer token-select' onClick={() => setIsTokenMenu(true)}><h4>ETH</h4><FaAngleDown className='fs-26 mt-2' /></div>
                                </div>
                            </div>
                            <div className='ex-logo-part'><img src={ExchangeLogo} width={45} className='exchange-logo' /></div>
                            <div className='trade-token-select mt-2'>
                                <div className='d-flex justify-content-between'><p className='text-gray text-left'>Long</p><p className='text-gray text-left'>Leverage:2.00x</p></div>
                                <div className='d-flex justify-content-between'>
                                    <input type='text' className='token-select-input' placeholder='0.0' />
                                    <div className='d-flex cursor-pointer token-select' onClick={() => setIsTokenMenu(true)}><h4>ETH</h4><FaAngleDown className='fs-26 mt-2' /></div>
                                </div>
                            </div>
                            <div>
                                <p className='text-left pt-2'>Leverage slider</p>
                                <div className='pt-3'>
                                    <Slider
                                        defaultValue={5}
                                        min={2}
                                        step={3}
                                        max={50}
                                        graduated
                                        progress
                                        renderMark={mark => {
                                            return mark;
                                        }}
                                        className='custom-slider'
                                    />
                                </div>
                            </div>
                            <div className='pt-3'>
                                <div className='d-flex justify-content-between'>
                                    <p className='text-gray'>Collateral In</p>
                                    <p>USD</p>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <p className='text-gray'>Leverage</p>
                                    <p>-</p>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <p className='text-gray'>Entry Price</p>
                                    <p>$1,951,732</p>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <p className='text-gray'>Liq.Price</p>
                                    <p>-</p>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <p className='text-gray'>Fees</p>
                                    <p>-</p>
                                </div>
                            </div>                            
                            <div className='earn-button w-100 text-center' onClick={connectWallet}>Connect Wallet</div>
                        </div>
                    </div>
                )}
                {formIndex == 2 && (
                    <div>
                        <div className='trade-form-select d-flex'>
                            <div><p className='text-white'>Market</p></div>
                            <div><p className='text-white'>Limit</p></div>
                            <div><p className='text-white'>Trigger</p></div>
                        </div>
                        <div className='trade-token-select mb-2'>
                            <p className='text-gray text-left'>Pay</p>
                            <div className='d-flex justify-content-between'>
                                <input type='text' className='token-select-input' placeholder='0.0' />
                                <div className='d-flex cursor-pointer token-select' onClick={() => setIsTokenMenu(true)}><h4>ETH</h4><FaAngleDown className='fs-26 mt-2' /></div>
                            </div>
                        </div>
                        <div className='ex-logo-part'><img src={ExchangeLogo} width={45} className='exchange-logo' /></div>
                        <div className='trade-token-select mt-2'>
                            <div className='d-flex justify-content-between'><p className='text-gray text-left'>Short</p><p className='text-gray text-left'>Leverage:2.00x</p></div>
                            <div className='d-flex justify-content-between'>
                                <input type='text' className='token-select-input' placeholder='0.0' />
                                <div className='d-flex cursor-pointer token-select' onClick={() => setIsTokenMenu(true)}><h4>ETH</h4><FaAngleDown className='fs-26 mt-2' /></div>
                            </div>
                        </div>
                        <div>
                            <p className='text-left pt-2'>Leverage slider</p>
                            <div className='pt-3'>
                                <Slider
                                    defaultValue={5}
                                    min={2}
                                    step={3}
                                    max={50}
                                    graduated
                                    progress
                                    renderMark={mark => {
                                        return mark;
                                    }}
                                    className='custom-slider'
                                />
                            </div>
                        </div>
                        <div className='pt-3'>
                            <div className='d-flex justify-content-between'>
                                <p className='text-gray'>Collateral In</p>
                                <p>USD</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p className='text-gray'>Leverage</p>
                                <p>-</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p className='text-gray'>Entry Price</p>
                                <p>$1,951,732</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p className='text-gray'>Liq.Price</p>
                                <p>-</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p className='text-gray'>Fees</p>
                                <p>-</p>
                            </div>
                        </div>                            
                        <div className='earn-button w-100 text-center' onClick={connectWallet}>Connect Wallet</div>
                    </div>
                )}
                {formIndex == 3 && (
                    <div>
                        <div className='trade-form-select d-flex'>
                            <div><p className='text-white'>Market</p></div>
                            <div><p className='text-white'>Limit</p></div>
                        </div>
                        <div className='trade-token-select mb-2'>
                            <p className='text-gray text-left'>Pay</p>
                            <div className='d-flex justify-content-between'>
                                <input type='text' className='token-select-input' placeholder='0.0' />
                                <div className='d-flex cursor-pointer token-select' onClick={() => setIsTokenMenu(true)}><h4>ETH</h4><FaAngleDown className='fs-26 mt-2' /></div>
                            </div>
                        </div>
                        <div className='ex-logo-part'><img src={ExchangeLogo} width={45} className='exchange-logo' /></div>
                        <div className='trade-token-select mt-2'>
                            <div className='d-flex justify-content-between'><p className='text-gray text-left'>Receive</p></div>
                            <div className='d-flex justify-content-between'>
                                <input type='text' className='token-select-input' placeholder='0.0' />
                                <div className='d-flex cursor-pointer token-select' onClick={() => setIsTokenMenu(true)}><h4>ETH</h4><FaAngleDown className='fs-26 mt-2' /></div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p className='text-left pt-2'>Fees</p>
                            <p className='text-gray pt-2'>--</p>
                        </div>                           
                        <div className='earn-button w-100 text-center' onClick={connectWallet}>Connect Wallet</div>
                    </div>
                )}
            </div>
            
            {formIndex == 1 && (<div className='trade-form mt-2'>
                <div>
                    <div>
                        <h5 className='text-white text-left'>Long ETH</h5>
                        <hr className='text-gray'/>
                        <div className='d-flex justify-content-between'>
                            <p className='text-gray'>Entry Price</p>
                            <p>$8,951,732</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p className='text-gray'>Exit Price</p>
                            <p>$8,951,732</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p className='text-gray'>Borrow Fee</p>
                            <p>0.0050% / 1h</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p className='text-gray'>Available Liquidity</p>
                            <p>$4,984,472</p>
                        </div>
                    </div>                            
                </div>
            </div>
            )}
            {formIndex == 2 && (<div className='trade-form mt-2'>
                <div>
                    <div>
                        <h5 className='text-white text-left'>Short ETH</h5>
                        <hr className='text-gray'/>
                        <div className='d-flex justify-content-between'>
                            <p className='text-gray'>Entry Price</p>
                            <p>$8,951,732</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p className='text-gray'>Exit Price</p>
                            <p>$8,951,732</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p className='text-gray'>Borrow Fee</p>
                            <p>0.0050% / 1h</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p className='text-gray'>Available Liquidity</p>
                            <p>$4,984,472</p>
                        </div>
                    </div>                            
                </div>
            </div>
            )}
            {formIndex == 3 && (<div className='trade-form mt-2'>
                <div>
                    <div>
                        <h5 className='text-white text-left'>Swap</h5>
                        <hr className='text-gray'/>
                        <div className='d-flex justify-content-between'>
                            <p className='text-gray'>ETH Price</p>
                            <p>$1211.22</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p className='text-gray'>BTC Price</p>
                            <p>$17,243.23</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p className='text-gray'>Available Liquidity</p>
                            <p>$1,537,243.23</p>
                        </div>
                    </div>                            
                </div>
            </div>
            )}

            {isTokenMenu && (
                <div className='token-menu p-4'>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex py-2'><h4 className='text-white'>Pay</h4></div>
                        <div className='text-white cursor-pointer' onClick={() => setIsTokenMenu(false)}><h3 className='text-white'>x</h3></div>
                    </div>
                    <hr className='text-white my-1' />
                    <input className='referral text-gray mt-2 w-100 border-radius-0' type='text' placeholder='Search Token'/>
                    <div className='pt-4'>
                        <div className='d-flex token-item'>
                            <img src={TokenIcon1} width={45} />
                            <div className='ml-4'>
                                <h5 className='text-white text-left'>BNB</h5>
                                <p className='text-gray'>Bianace smart chain</p>
                            </div>
                        </div>
                        <div className='d-flex token-item'>
                            <img src={TokenIcon2} width={45} />
                            <div className='ml-4'>
                                <h5 className='text-white text-left'>Doge</h5>
                                <p className='text-gray'>Dogechain</p>
                            </div>
                        </div>
                        <div className='d-flex token-item'>
                            <img src={TokenIcon3} width={45} />
                            <div className='ml-4'>
                                <h5 className='text-white text-left'>ETH</h5>
                                <p className='text-gray'>Ethereum</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}            
        </div>
    )
}

export default TradeForm;
