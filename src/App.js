import React, { useEffect, useContext } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Modal from 'react-modal';

import './App.css';
import './css/tailwind.output.css';
import './font/font.css';
import './css/fontawesome-free-6.0.0-beta3-web/css/fontawesome.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';

import Home from './pages/Home';
import Referral from './pages/Referral';
import Earn from './pages/Earn';
import Trade from './pages/Trade';
import Header from './components/Header';

import { ToastContainer, toast } from 'react-toastify';
import { StoreContext } from './store';

import Suiet from './img/quotation/suiet.png';
import Martian from './img/quotation/martian.png';
import SUI from './img/quotation/SUI.png';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '300px',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#342D55',
    padding: '10px 20px'
  },
  overlay: {
    backgroundColor: 'rgb(0 0 0 / 86%)'
  }
};

function App() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);


  function closeModal() {
    setModalIsOpen(false);
  }

  const location = useLocation();
  useEffect(() => {
    localStorage.setItem('reward', 0);
  }, [location]);

  const storeValue = {
    modalIsOpen, setModalIsOpen
  }

  return (
    <StoreContext.Provider value= {storeValue}>
      <React.Fragment>       
        <Header />
        <Switch>       
          <Redirect from="/" exact to="/home" />
          <Route path="/home" exact component={Home} />
          <Route path="/referral" exact component={Referral} />
          <Route path="/earn" exact component={Earn} />
          <Route path="/trade" exact component={Trade} />
        </Switch>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>
            <div className='d-flex justify-content-between'>
              <h5 className='text-white my-auto'>Connect Wallet</h5>
              <h4 className='text-white cursor-pointer' onClick={() => setModalIsOpen(false)}>x</h4>
            </div>
            <hr className='text-gray my-2'/>
            <div>
              <div className='d-flex wallet-item justify-content-between'>
                  <div className='ml-4 align-self-center'>
                      <h5 className='text-white text-left'>Suiet</h5>
                  </div>
                  <img src={Suiet} width={35} />
              </div>
              <div className='d-flex wallet-item justify-content-between'>
                  <div className='ml-4 align-self-center'>
                      <h5 className='text-white text-left'>Martian</h5>
                  </div>
                  <img src={Martian} width={35} />
              </div>
              <div className='d-flex wallet-item justify-content-between'>
                  <div className='ml-4 align-self-center'>
                      <h5 className='text-white text-left'>SUI wallet</h5>
                  </div>
                  <img src={SUI} width={35} />
              </div>
            </div>
          </div>
          <div></div>
        </Modal>
      </React.Fragment>
    </StoreContext.Provider>
  );
}

export default App;
