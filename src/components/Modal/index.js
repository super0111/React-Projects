
import React, { useState, useEffect, useHistory } from 'react';
import Web3 from 'web3';
import { FaAlignJustify, FaHome, FaTractor, FaBabyCarriage, FaSteam, FaOutdent,
    FaShareSquare, FaTwitter, FaArrowRight, FaClosedCaptioning, FaTimes, FaQuestion, FaQuestionCircle} from 'react-icons/fa';
import MetaMask from '../../img/quotation/metamask.svg';
import Bnbwallet from '../../img/quotation/bnb-busd.svg';
import Trustwallet from '../../img/quotation/TWT.png';
import './index.css';
import Modal from 'react-modal';
import { ethers } from "ethers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {apiLogin} from '../../services/main';
import { TOKEN_ADDRESS, TOKEN_ABI, RPC_URL } from '../../services/Types';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius:'25px',
      zIndex: 5000,
    },
    overlay: {
        background: "rgba(69, 42, 122, 0.6)"
    },  
};

const MyModal = ({isOpen, isLogin, isBalance, setAddress, isStake}) => {

    const web3 = new Web3(RPC_URL);    
    let contract =  new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS);

    let subtitle;
    const [step, setStep] = useState(1);
    const [kword, setKword] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = 'rgb(69, 42, 122)';
    }
    
    function closeModal() {
        setIsOpen(false);
    }
    function ConfirmMigrate() {
        setIsOpen(false);
    }

    useEffect(() => {
        setIsOpen(isOpen);
    }, [isOpen]);     

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='d-flex justify-content-between title-color'>
                    <h5 className='font-OpenSansBold' ref={(_subtitle) => (subtitle = _subtitle)}>Confirm Migrate</h5>
                    <FaTimes className='cursor-pointer' onClick={closeModal}/>
                </div>
                
                <hr className='my-3'/> 

                SUCCESSFULLY CONSOLIDATED TO SAITAMA V2 
                
                <p className='text-grey'>This proccess may take up to 15 minutes due to high network congesture.</p>
                <div className='text-center'>
                    <div className="w-25 align-self-center btn submit-button rounded-button-long font-OpenSansBold mr-4 mt-2" onClick={() => ConfirmMigrate()}>
                        OK
                    </div>
                </div>

                <div className='d-flex justify-content-center title-color'>
                    <FaQuestionCircle className='align-self-center' /><p className='align-self-center mb-0'> <a href="https://community.trustwallet.com/t/how-to-import-a-wallet-via-recovery-phrase/843" target="_blank">Learn how to connect</a> </p>
                </div>
            </Modal>
        </>
    )
}

export default MyModal;
