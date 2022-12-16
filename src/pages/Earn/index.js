import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import './index.css';
import Header from '../../components/Header'
import Web3 from 'web3';
import {useHistory} from 'react-router-dom';
import detectEthereumProvider from '@metamask/detect-provider';
import Countdown from 'react-countdown';
import BigNumber from "bignumber.js";
import moment from 'moment';

import TokenNomics from '../../img/quotation/bnb-busd.svg';
import TokenIcon1 from '../../img/quotation/bnb-busd.svg';
import TokenIcon2 from '../../img/quotation/lbd-bnb.svg';
import TokenIcon3 from '../../img/quotation/eth-bg.png';
import EtherIcon from '../../img/quotation/pan-bg2.svg';

import { FaAngleDown } from 'react-icons/fa';

import { useMediaQuery } from 'react-responsive';
import Chart from 'react-apexcharts';

const Earn = (props) => {
    const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

    return (
        <div className='py-5'>
            <div className='container'>
                <div>
                    <h4 className='text-white px-3'>Earn</h4>
                    <p className='text-gray px-3'>Stake GMX and GLP to earn rewards.</p>
                </div>
                <div>
                    <div className='box pt-4 d-flex justify-content-between flex-wrap'>
                        <div className='box-item'>
                            <div>
                                <h5 className='text-white pt-3 pl-5'>GMX</h5>
                                <hr className='text-gray'/>
                            </div>
                            <div className='box-item-body-1 d-flex flex-column justify-content-between'>
                                <div className='pt-3 px-4'>
                                    <div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Price</p>
                                            <p className='text-white'>$80.4</p>
                                        </div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Wallet</p>
                                            <p className='text-white'>8,307,163 GMX</p>
                                        </div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Staked</p>
                                            <p className='text-white'>$801,951,732</p>
                                        </div>
                                        <hr className='text-gray'/>
                                    </div>
                                    <div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>APR</p>
                                            <p className='text-white'>$80.4</p>
                                        </div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Rewards</p>
                                            <p className='text-white'>8,307,163 GMX</p>
                                        </div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Multiplier Points APR</p>
                                            <p className='text-white'>$801,951,732</p>
                                        </div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Boost Percentage</p>
                                            <p className='text-white'>$801,951,732</p>
                                        </div>
                                        <hr className='text-gray'/>
                                    </div>
                                    <div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Total Staked</p>
                                            <p className='text-white'>$80.4</p>
                                        </div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Total Supply</p>
                                            <p className='text-white'>8,307,163 GMX</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <hr className='text-gray mx-4'/>
                                    <div className='d-flex justify-content-between px-4 py-3 pt-0 flex-wrap'>
                                        <div className='earn-button'>Buy GMX</div>
                                        <div className='earn-button'>Stake</div>
                                        <div className='earn-button'>Unstake</div>
                                        <div className='earn-button'>Transfer Account</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='box-item'>
                            <div>
                                <h5 className='text-white pt-3 pl-5'>Total Rewards</h5>
                                <hr className='text-gray'/>
                            </div>
                            <div className='box-item-body-1 d-flex flex-column justify-content-between'>
                                <div className='pt-3 px-4'>
                                    <div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>ETH(WETH)</p>
                                            <p className='text-white'>$80.4</p>
                                        </div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>GMX</p>
                                            <p className='text-white'>8,307,163 GMX</p>
                                        </div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Escrowed GMX</p>
                                            <p className='text-white'>$801,951,732</p>
                                        </div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Multiplier Points</p>
                                            <p className='text-white'>$80.4</p>
                                        </div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>staked Multiplier Points</p>
                                            <p className='text-white'>801,951,732 GMX</p>
                                        </div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Mulitplier Points APR</p>
                                            <p className='text-white'>$801,951,732</p>
                                        </div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Total</p>
                                            <p className='text-white'>$801,951,732</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <hr className='text-gray mx-4'/>
                                    <div className='d-flex px-4 py-3 pt-0'>                                    
                                        <div className='earn-button'>Compound</div>
                                        <div className='earn-button ml-4'>Claim</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='box pt-4 d-flex justify-content-between flex-wrap'>
                        <div className='box-item'>
                            <div>
                                <h5 className='text-white pt-3 pl-5'>GLP (Arbitrum)</h5>
                                <hr className='text-gray'/>
                            </div>
                            <div className='box-item-body-2 d-flex flex-column justify-content-between'>
                                <div className='pt-3 px-4'>
                                    <div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Price</p>
                                            <p className='text-white'>$80.4</p>
                                        </div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Wallet</p>
                                            <p className='text-white'>8,307,163 GMX</p>
                                        </div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Staked</p>
                                            <p className='text-white'>$801,951,732</p>
                                        </div>
                                        <hr className='text-gray'/>
                                    </div>
                                    <div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>APR</p>
                                            <p className='text-white'>$80.4</p>
                                        </div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Rewards</p>
                                            <p className='text-white'>8,307,163 GMX</p>
                                        </div>
                                        <hr className='text-gray'/>
                                    </div>
                                    <div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Total Staked</p>
                                            <p className='text-white'>$80.4</p>
                                        </div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Total Supply</p>
                                            <p className='text-white'>8,307,163 GMX</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <hr className='text-gray mx-4'/>
                                    <div className='d-flex px-4 py-3 pt-0 flex-wrap'>
                                        <div className='earn-button mr-4'>Buy GLP</div>
                                        <div className='earn-button mr-4'>Sell GLP</div>
                                        <div className='earn-button'>Purchase Insurance</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='box-item'>
                            <div>
                                <h5 className='text-white pt-3 pl-5'>Escrowed GMX</h5>
                                <hr className='text-gray'/>
                            </div>
                            <div className='box-item-body-2 d-flex flex-column justify-content-between'>
                                <div className='pt-3 px-4'>
                                    <div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Price</p>
                                            <p className='text-white'>$80.4</p>
                                        </div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Wallet</p>
                                            <p className='text-white'>8,307,163 GMX</p>
                                        </div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Staked</p>
                                            <p className='text-white'>$801,951,732</p>
                                        </div>
                                        <hr className='text-gray'/>
                                    </div>
                                    <div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>APR</p>
                                            <p className='text-white'>$80.4</p>
                                        </div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Rewards</p>
                                            <p className='text-white'>8,307,163 GMX</p>
                                        </div>
                                        <hr className='text-gray'/>
                                    </div>
                                    <div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Total Staked</p>
                                            <p className='text-white'>$80.4</p>
                                        </div>
                                        <div className='d-flex justify-content-between py-1'>
                                            <p className='text-gray'>Total Supply</p>
                                            <p className='text-white'>8,307,163 GMX</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <hr className='text-gray mx-4'/>
                                    <div className='d-flex px-4 py-3 pt-0'>
                                        <div className='earn-button'>Stake</div>
                                        <div className='earn-button ml-4'>Unstake</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pt-5'>
                    <h4 className='text-white px-3'>Vestor</h4>
                    <p className='text-gray px-3'>Convert esGMX tokens to GMX tokens.Please read the vesting details before using the vaults.</p>
                    <div>
                        <div className='box pt-4 d-flex justify-content-between flex-wrap'>
                            <div className='box-item'>
                                <div>
                                    <h5 className='text-white pt-3 pl-5'>GMX Vault</h5>
                                    <hr className='text-gray'/>
                                </div>
                                <div className='box-item-body-3 d-flex flex-column justify-content-between'>
                                    <div className='pt-3 px-4'>
                                        <div>
                                            <div className='d-flex justify-content-between py-1'>
                                                <p className='text-gray'>Staked Tokens</p>
                                                <p className='text-white'>$80.4</p>
                                            </div>
                                            <div className='d-flex justify-content-between py-1'>
                                                <p className='text-gray'>Reserverd for Vesting</p>
                                                <p className='text-white'>8,307,163 GMX</p>
                                            </div>
                                            <div className='d-flex justify-content-between py-1'>
                                                <p className='text-gray'>Vesting Status</p>
                                                <p className='text-white'>$801,951,732</p>
                                            </div>
                                            <div className='d-flex justify-content-between py-1'>
                                                <p className='text-gray'>Claimable</p>
                                                <p className='text-white'>$801,951,732</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <hr className='text-gray mx-4'/>
                                        <div className='d-flex px-4 py-3 pt-0'>
                                            <div className='earn-button'>Deposit</div>
                                            <div className='earn-button ml-4'>Withdraw</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='box-item'>
                                <div>
                                    <h5 className='text-white pt-3 pl-5'>GLP Vault</h5>
                                    <hr className='text-gray'/>
                                </div>
                                <div className='box-item-body-3 d-flex flex-column justify-content-between'>
                                    <div className='pt-3 px-4'>
                                        <div>
                                            <div className='d-flex justify-content-between py-1'>
                                                <p className='text-gray'>Staked Tokens</p>
                                                <p className='text-white'>$80.4</p>
                                            </div>
                                            <div className='d-flex justify-content-between py-1'>
                                                <p className='text-gray'>Reserverd for Vesting</p>
                                                <p className='text-white'>8,307,163 GMX</p>
                                            </div>
                                            <div className='d-flex justify-content-between py-1'>
                                                <p className='text-gray'>Vesting Status</p>
                                                <p className='text-white'>$801,951,732</p>
                                            </div>
                                            <div className='d-flex justify-content-between py-1'>
                                                <p className='text-gray'>Claimable</p>
                                                <p className='text-white'>$801,951,732</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <hr className='text-gray mx-4'/>
                                        <div className='d-flex px-4 py-3 pt-0'>
                                            <div className='earn-button'>Deposit</div>
                                            <div className='earn-button ml-4'>Withdraw</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Earn;