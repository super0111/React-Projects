
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import './index.css';
import Order from '../../components/Order';
import Web3 from 'web3';
import {useHistory} from 'react-router-dom';
import detectEthereumProvider from '@metamask/detect-provider';
import Countdown from 'react-countdown';
import BigNumber from "bignumber.js";
import moment from 'moment';

import { FaAngleDown } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';

import Chart from 'react-apexcharts';
import TradingViewWidget, { Themes, IntervalTypes } from 'react-tradingview-widget';

import ExchangeLogo from '../../img/quotation/exchange.png';
import { Slider, RangeSlider } from 'rsuite';
import './style.css';
import './slider.less';
import TradeForm from '../../components/TradeForm';


const Trade = (props) => {

    const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
    return (
        <div className='container pt-5 text-center'>
            <div className='d-flex justify-content-between flex-wrap pb-2'>
                <div className='t-w-1'>
                    <div className='trade-header d-flex justify-content-between'>
                        <div className='d-flex'>
                            <h4 className='text-white m-auto cursor-pointer'>ETH/USD</h4>
                            <FaAngleDown className='m-auto fs-28 text-white' />
                        </div>
                        <div className='d-flex trade-result flex-wrap justify-content-between'>
                            <div>
                                <p className='text-gray'>1,322.26</p>
                                <h6 className='text-white'>$1,322.26</h6>
                            </div>
                            <div>
                                <p className='text-gray'>24h Change</p>
                                <h6 className='text-green'>+4.19%</h6>
                            </div>
                            <div>
                                <p className='text-gray'>24h high</p>
                                <h6 className='text-white'>$1,346.79</h6>
                            </div>
                            <div>
                                <p className='text-gray'>1,322.26</p>
                                <h6 className='text-white'>$1,322.26</h6>
                            </div>
                        </div>
                    </div>                    
                    <div className="chartview">
                        <TradingViewWidget
                            theme={Themes.DARK}
                            locale="fr"
                            autosize
                            symbol="BINANCE:ETHPERP"
                            interval={IntervalTypes.D}
                            timezone="Etc/UTC"
                            style="1"
                            local="in"
                            allow_symbol_change={true}
                            className="view-chart"
                        />
                    </div>
                    <Order />
                </div>
                <div className='t-w-2'>
                    <TradeForm />                    
                    <div className='trade-form mt-2'>
                        <div>
                            <div>
                                <h5 className='text-white text-left'>Useful Links</h5>
                                <hr className='text-gray'/>
                                <div className='d-flex justify-content-between'>
                                    <p>Trading guide</p>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <p>Leaderboard</p>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <p>Speed up page loading</p>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trade;

