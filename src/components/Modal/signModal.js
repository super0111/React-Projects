
import React, { useState, useEffect, useHistory } from 'react';
import {FaTimes, FaQuestionCircle} from 'react-icons/fa';
import {apiSignUp} from '../../services/main';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Modal from 'react-modal';
import { checkEmail, checkName } from '../../services/utils';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius:'25px'
    },
    overlay: {
        background: "rgba(69, 42, 122, 0.6)"
    },
};

const SignModal = ({isOpen}) => {  
    const [isSignOpen, setSignIsOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPass, setUserPass] = useState('');

    const [validError, setValidError] = useState({
        name: { error: false, msg: "Yourname filed should be required!" },
        email: { error: false, msg: "Youshould input correct Email(Ex: xxx@gmail.com)." },
        pass: { error: false, msg: "Your pass filed should be required!" },
    });

    const closeModal = () => {
        setSignIsOpen(false);
    }
    useEffect(() => {
        setSignIsOpen(isOpen);
    }, [isOpen]); 

    const checkValidation = () => {
        let { name: eName,
            email: eEmail,
            pass: ePass,
        } = validError;

        eName.error = false;
        eEmail.error = false;
        ePass.error = false;

        if (!checkEmail(userEmail)) {
            eEmail.error = true;
        }
        if (!checkName(userName)) {
            eName.error = true;
        }
        if (!checkName(userPass)) {
            ePass.error = true;
        }
        setValidError({
            ...validError,
            name: eName,
            email: eEmail,
            pass: ePass,
        });

        if (eName.error || eEmail.error || ePass.error) {
            return false;
        }
        return true;
    }

    const signUp = () => {

        if(checkValidation()) {
            console.log(validError);
            const leadData = {
                userName: userName,
                userEmail: userEmail,
                userPass: userPass,
            }

            apiSignUp(leadData)
                .then(res => {
                    console.log("res-----", res);
                    toast.info('You have successfully registered in this web app!');
                    setSignIsOpen(false);
                    setUserName('');
                    setUserEmail('');
                    setUserPass('');
                    if (res.data.error) {
                        console.log(res);
                        if (res.data.msg) {
                            console.log(res);
                        }
                    }
                })
            .catch(err => {
                console.log("err-----", err);
                toast.error('Your info is wrong!');
                setSignIsOpen(false);
                setUserName('');
                setUserEmail('');
                setUserPass('');
            })
        }
    }

    return (
        <>
            <Modal
                isOpen={isSignOpen}
                style={customStyles}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <div className='d-flex justify-content-between title-color'>
                    <h5 className='font-OpenSansBold' >User Sign Up</h5>
                    <FaTimes className='cursor-pointer' onClick={closeModal}/>
                </div>
                <hr className='my-3' /> 
                <div className='p-3 w-350'> 
                    <div className='d-flex'>                  
                        <span className='align-self-center pr-5 text-gray3 font-OpenSansSemiBold w-25 fs-12'>Name : </span>
                        <div className='w-75'>
                            <input type='text' className='form-control' value={userName} onChange={(e) => setUserName(e.target.value)} />
                            <span className={`fs-11 text-red ${validError.name.error ? `block` : `hidden`} `}>{validError.name.msg}</span>
                        </div>                        
                    </div>
                    <div className='d-flex pt-3'>                  
                        <span className='align-self-center pr-5 text-gray3 font-OpenSansSemiBold w-25 fs-12'>Email : </span>
                        <div className='w-75'>
                            <input type='text' className='form-control' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                            <span className={`fs-11 text-red ${validError.email.error ? `block` : `hidden`} `}>{validError.email.msg}</span>
                        </div>
                    </div>
                    <div className='d-flex pt-3'>                  
                        <span className='pr-5 text-gray3 font-OpenSansSemiBold w-25 fs-12'>Pass : </span>
                        <div className='w-75'>
                            <textarea type='text' rows={5} className='form-control' onChange={(e) => setUserPass(e.target.value)}>{userPass}</textarea>
                            <span className={`fs-11 text-red ${validError.pass.error ? `block` : `hidden`} `}>{validError.pass.msg}</span>
                        </div>
                    </div>
                </div>
                <div className='text-center'>
                    <div className="align-self-center btn btn-primary rounded-3xl rounded-button main-bg-color font-OpenSansBold mr-4" onClick={signUp}>
                        Submit                        
                    </div>
                </div>
                <div className='d-flex justify-content-center title-color'>
                    <FaQuestionCircle className='align-self-center' /><p className='align-self-center mb-0'> Learn how to connect</p>
                </div>                
            </Modal>
        </>
    )
}

export default SignModal;
