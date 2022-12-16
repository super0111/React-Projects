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

const Home = (props) => {
    const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
    const [series1, setSeries1] = useState([75, 25, 11]);
    const [option1, setOption1] = useState({
        title: {
            text:'Distrution',
            align: 'center',
            style: {
                color:'white'
            }
        },
        plotOptions: {
            area: undefined,
        },
        labels:['token1', 'token2', 'token3'],
        chart: {
            type: 'donut',
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                width: 300
                }
            }
        }]
    });

    const [series2, setSeries2] = useState([75, 25, 11]);
    const [option2, setOption2] = useState({
        title: {
            text:'GLP pool',
            align: 'center',
            style: {
                color:'white'
            }
        },
        dataLabels: {textAnchor:'end'},
        plotOptions: {
            area: undefined,
        },
        labels:['token1', 'token2', 'token3'],
        chart: {
            type: 'donut',
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                width: 300
                } 
            }
        }]
    });

    return (
        <div className='pb-5'>
            <div className='container'>
                <div className='stats pt-5'>
                    <div className='px-4'>
                        <h4 className='text-white font-bold'>Stats</h4>
                        <p>Arbitrum Total Stats start from 01 Sep 2021 <br/>For detailed stats: https://stats.gmx.io.</p>
                    </div>
                    <div className='d-flex px-4 justify-content-between flex-wrap'>
                        <div className='overview mt-3 w-1'>
                            <div><h5 className='text-white px-4 pt-3'>Overview</h5></div>
                            <hr className='text-white mx-4'/>
                            <div className='overview-body pb-2'>
                                <div className='d-flex'>
                                    <div>
                                        <p>AUM</p>
                                        <h5 className='text-white'>$801,951,731</h5>
                                    </div>
                                    <div className='text-gray'> | </div>
                                    <div>
                                        <p>24h Volume</p>
                                        <h5 className='text-white'>$801,951,731</h5>
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <div>
                                        <p>GLP Pool</p>
                                        <h5 className='text-white'>$801,951,731</h5>
                                    </div>
                                    <div className='text-gray'> | </div>
                                    <div>
                                        <p>Short Position</p>
                                        <h5 className='text-white'>$801,951,731</h5>
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <div>
                                        <p>Fees</p>
                                        <h5 className='text-white'>$801,951,731</h5>
                                    </div>
                                    <div className='text-gray'> | </div>
                                    <div>
                                        <p>Long Position</p>
                                        <h5 className='text-white'>$801,951,731</h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='overview mt-3 w-2'>
                            <div><h5 className='text-white px-4 pt-3'>Total stats</h5></div>
                            <hr className='text-white mx-4'/>
                            <div className='overview-body pb-2'>
                                <div className='d-flex'>
                                    <div>
                                        <p>Total Fees</p>
                                        <h5 className='text-white'>$801,951,731</h5>
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <div>
                                        <p>Total Volumes</p>
                                        <h5 className='text-white'>$801,951,731</h5>
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <div>
                                        <p>Floor Price Fund</p>
                                        <h5 className='text-white'>$801,951,731</h5>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='stats'>
                    <div className='px-4'>
                        <h4 className='text-white font-bold'>Tokens</h4>
                        <p>Platform and GLP index tokens.</p>
                    </div>
                    <div className='d-flex px-4 justify-content-between flex-wrap'>
                        <div className='overview mt-3 w-3'>
                            <div className='d-flex py-3 px-4'>
                                <img src={TokenIcon1} width={35} />
                                <div className='px-2'>
                                    <h6 className='text-white mb-0'>GMX</h6>
                                    <p className='fs-12 text-gray'>GMX</p>
                                </div>
                                <div className='pt-1'>
                                    <FaAngleDown className='text-white' />
                                </div>
                            </div>
                            <hr className='text-white mx-4 m-0'/>
                            <div className='overview-body pb-2'>
                                <div className='d-flex justify-content-between flex-wrap'>
                                    <div className='w-80 pri-0 wmin-340'>
                                        <div className='d-flex justify-content-between py-2'>
                                            <h6 className='text-gray'>AUM</h6>
                                            <h6 className='text-white'>$80.4</h6>
                                        </div>
                                        <div className='d-flex justify-content-between py-2'>
                                            <h6 className='text-gray'>Supply</h6>
                                            <h6 className='text-white'>8,307,163 GMX</h6>
                                        </div>
                                        <div className='d-flex justify-content-between py-2'>
                                            <h6 className='text-gray'>Total Staked</h6>
                                            <h6 className='text-white'>$801,951,732</h6>
                                        </div>
                                        <div className='d-flex justify-content-between py-2'>
                                            <h6 className='text-gray'>Market Cap</h6>
                                            <h6 className='text-white'>$453,984,472</h6>
                                        </div>
                                    </div>
                                    <div className='align-self-center donut px-0'>
                                        <Chart options={option1} series={series1} type="donut"  width="300"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='overview mt-3 w-3'>
                            <div className='d-flex py-3 px-4'>
                                <img src={TokenIcon2} width={35} />
                                <div className='px-2'>
                                    <h6 className='text-white mb-0'>GMX</h6>
                                    <p className='fs-12 text-gray'>GMX</p>
                                </div>
                                <div className='pt-1'>
                                    <FaAngleDown className='text-white' />
                                </div>
                            </div>
                            <hr className='text-white mx-4 m-0'/>
                            <div className='overview-body pb-2'>
                                <div className='d-flex justify-content-between flex-wrap'>
                                    <div className='w-80 pri-0 wmin-340'>
                                        <div className='d-flex justify-content-between py-2'>
                                            <h6 className='text-gray'>AUM</h6>
                                            <h6 className='text-white'>$80.4</h6>
                                        </div>
                                        <div className='d-flex justify-content-between py-2'>
                                            <h6 className='text-gray'>Supply</h6>
                                            <h6 className='text-white'>8,307,163 GMX</h6>
                                        </div>
                                        <div className='d-flex justify-content-between py-2'>
                                            <h6 className='text-gray'>Total Staked</h6>
                                            <h6 className='text-white'>$801,951,732</h6>
                                        </div>
                                        <div className='d-flex justify-content-between py-2'>
                                            <h6 className='text-gray'>Market Cap</h6>
                                            <h6 className='text-white'>$453,984,472</h6>
                                        </div>
                                    </div>
                                    <div className='align-self-center donut px-0'>
                                        <Chart options={option2} series={series2} type="donut"  width="300"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='px-4'>
                        <div className='overview mt-3 w-5 pb-4'>
                            <div className='d-flex py-3 px-4'>
                                <h5 className='text-white'>GLP Index Composition</h5>
                            </div>
                            <hr className='text-white mx-4 m-0'/>
                            <div className='overview-body pb-2 token-table'>
                                <div className='d-flex justify-content-between'>
                                    {!isMobile && (
                                        <div className='d-flex w-100'>
                                            <div className='w-20'><p className='text-gray'>Token</p></div>
                                            <div className='w-20'><p className='text-gray'>Price</p></div>
                                            <div className='w-20'><p className='text-gray'>Pool</p></div>
                                            <div className='w-20'><p className='text-gray'>Weight</p></div>
                                            <div className='w-20'><p className='text-gray'>Utilization</p></div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className='w-100 py-2'>
                                        {!isMobile && (
                                        <div>
                                            <div className='d-flex py-1'>
                                                <div className='w-20 d-flex'>
                                                    <img src={TokenIcon3} width={40} height={20} />
                                                    <div className='pl-4'>
                                                        <h6 className='mb-0'>Ethereum</h6>
                                                        <p className='text-gray text-left'>ETH</p>
                                                    </div>
                                                    <FaAngleDown className='text-white mt-1 ml-3 cursor-pointer'/>
                                                </div>
                                                <div className='w-20'><h6 className='text-gray'>$801,953,731</h6></div>
                                                <div className='w-20'><h6 className='text-gray'>$801,953,731</h6></div>
                                                <div className='w-20'><h6 className='text-gray'>34.5% / 45%</h6></div>
                                                <div className='w-20'><h6 className='text-gray'>46.20%</h6></div>
                                            </div>
                                            <hr className='text-gray my-1'/>
                                        </div>)}
                                        {!isMobile && (
                                        <div>
                                            <div className='d-flex py-1'>
                                                <div className='w-20 d-flex'>
                                                    <img src={TokenIcon1} width={40} height={20} />
                                                    <div className='pl-4'>
                                                        <h6 className='mb-0'>Binance</h6>
                                                        <p className='text-gray text-left'>BNB</p>
                                                    </div>
                                                    <FaAngleDown className='text-white mt-1 ml-3 cursor-pointer'/>
                                                </div>
                                                <div className='w-20'><h6 className='text-gray'>$801,953,731</h6></div>
                                                <div className='w-20'><h6 className='text-gray'>$801,953,731</h6></div>
                                                <div className='w-20'><h6 className='text-gray'>34.5% / 45%</h6></div>
                                                <div className='w-20'><h6 className='text-gray'>46.20%</h6></div>
                                            </div>
                                            <hr className='text-gray my-1'/>
                                        </div>)}
                                        {!isMobile && (
                                        <div>
                                            <div className='d-flex py-1'>
                                                <div className='w-20 d-flex'>
                                                    <img src={TokenIcon2} width={40} height={20} />
                                                    <div className='pl-4'>
                                                        <h6 className='mb-0'>Binance Smart Chain</h6>
                                                        <p className='text-gray text-left'>BSC</p>
                                                    </div>
                                                    <FaAngleDown className='text-white mt-1 ml-3 cursor-pointer'/>
                                                </div>
                                                <div className='w-20'><h6 className='text-gray'>$801,953,731</h6></div>
                                                <div className='w-20'><h6 className='text-gray'>$801,953,731</h6></div>
                                                <div className='w-20'><h6 className='text-gray'>34.5% / 45%</h6></div>
                                                <div className='w-20'><h6 className='text-gray'>46.20%</h6></div>
                                            </div>
                                        </div>)}
                                        {isMobile && (
                                        <div>
                                            <div className='py-0'>
                                                <div className='w-100 d-flex pl-3 pb-2'>
                                                    <img src={TokenIcon3} width={40} height={20} />
                                                    <div className='pl-4'>
                                                        <h6 className='mb-0'>Ethereum</h6>
                                                        <p className='text-gray text-left'>ETH</p>
                                                    </div>
                                                    <FaAngleDown className='text-white mt-1 ml-3 cursor-pointer'/>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='w-50'><p className='text-gray pl-3'>Token</p></div>
                                                    <div className='w-50'><h6 className='text-gray'>$801,953,731</h6></div>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='w-50'><p className='text-gray pl-3'>Price</p></div>
                                                    <div className='w-50'><h6 className='text-gray'>$801,953,731</h6></div>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='w-50'><p className='text-gray pl-3'>Pool</p></div>
                                                    <div className='w-50'><h6 className='text-gray'>$801,953,731</h6></div>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='w-50'><p className='text-gray pl-3'>Weight</p></div>
                                                    <div className='w-50'><h6 className='text-gray'>34.5% / 45%</h6></div>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='w-50'><p className='text-gray pl-3'>Utilization</p></div>
                                                    <div className='w-50'><h6 className='text-gray'>46.20%</h6></div>
                                                </div>                                                
                                                <hr className='text-gray my-1'/>
                                            </div>
                                        </div>)}
                                        {isMobile && (
                                        <div>
                                            <div className='py-0'>
                                                <div className='w-100 d-flex pl-3 pb-2'>
                                                    <img src={TokenIcon1} width={40} height={20} />
                                                    <div className='pl-4'>
                                                        <h6 className='mb-0'>Binance</h6>
                                                        <p className='text-gray text-left'>BNB</p>
                                                    </div>
                                                    <FaAngleDown className='text-white mt-1 ml-3 cursor-pointer'/>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='w-50'><p className='text-gray pl-3'>Token</p></div>
                                                    <div className='w-50'><h6 className='text-gray'>$801,953,731</h6></div>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='w-50'><p className='text-gray pl-3'>Price</p></div>
                                                    <div className='w-50'><h6 className='text-gray'>$801,953,731</h6></div>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='w-50'><p className='text-gray pl-3'>Pool</p></div>
                                                    <div className='w-50'><h6 className='text-gray'>$801,953,731</h6></div>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='w-50'><p className='text-gray pl-3'>Weight</p></div>
                                                    <div className='w-50'><h6 className='text-gray'>34.5% / 45%</h6></div>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='w-50'><p className='text-gray pl-3'>Utilization</p></div>
                                                    <div className='w-50'><h6 className='text-gray'>46.20%</h6></div>
                                                </div>                                                
                                                <hr className='text-gray my-1'/>
                                            </div>
                                        </div>)}
                                        {isMobile && (
                                        <div>
                                            <div className='py-0'>
                                                <div className='w-100 d-flex pl-3 pb-2'>
                                                    <img src={TokenIcon2} width={40} height={20} />
                                                    <div className='pl-4'>
                                                        <h6 className='mb-0'>Binance Smart Chain</h6>
                                                        <p className='text-gray text-left'>BSC</p>
                                                    </div>
                                                    <FaAngleDown className='text-white mt-1 ml-3 cursor-pointer'/>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='w-50'><p className='text-gray pl-3'>Token</p></div>
                                                    <div className='w-50'><h6 className='text-gray'>$801,953,731</h6></div>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='w-50'><p className='text-gray pl-3'>Price</p></div>
                                                    <div className='w-50'><h6 className='text-gray'>$801,953,731</h6></div>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='w-50'><p className='text-gray pl-3'>Pool</p></div>
                                                    <div className='w-50'><h6 className='text-gray'>$801,953,731</h6></div>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='w-50'><p className='text-gray pl-3'>Weight</p></div>
                                                    <div className='w-50'><h6 className='text-gray'>34.5% / 45%</h6></div>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='w-50'><p className='text-gray pl-3'>Utilization</p></div>
                                                    <div className='w-50'><h6 className='text-gray'>46.20%</h6></div>
                                                </div>                            
                                            </div>
                                        </div>)}
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

export default Home;