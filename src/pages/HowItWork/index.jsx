import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { routeNames } from "routes";
import "./HowItWork.scss";
import { useTranslation, Trans } from "react-i18next";
import { logo } from "../../assets/img";

import { v4 as uuid } from "uuid";
import { useGetLoginInfo } from '@elrondnetwork/dapp-core/hooks';

import CreateLogo2 from "../../assets/img/landing/create2.png";
import CreateLogo3 from "../../assets/img/landing/create3.png";
import CreateLogo4 from "../../assets/img/landing/create4.png";

import SpendLogo1 from "../../assets/img/landing/pot1.png";
import SpendLogo2 from "../../assets/img/landing/pot2.png";
import SpendLogo3 from "../../assets/img/landing/pot3.png";
import SpendLogo4 from "../../assets/img/landing/pot4.png";

import { Modal } from "react-responsive-modal";
import { Overlay, WalletConnect } from "../../components";

const HowItWork = () => {
  const { t, i18n } = useTranslation();
  const [uniqueId, setUniqueId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const { isLoggedIn } = useGetLoginInfo();
  const onCloseWalletModal = () => setOpenWalletModal(false);
  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

  const createProject = () => {
    if (isLoggedIn) {
      const unique_id = uuid();
      const small_id = unique_id.slice(0, 8);
      setUniqueId(small_id);
      onOpenModal();
    } else {
      setOpenWalletModal(true);
    }
  };

  return (
    <div className="landing">
      <div className="landing-window">
        <div className="landing-banner-container">
          <div>
            <div className="landing-logo">
              <div className="landing-logo-text1">{t("how_it_work.title")}</div>
              <div className="landing-logo-text2">
                {t("how_it_work.subtitle")}
              </div>
            </div>
          </div>
        </div>
        <div className="landing-work-text1">{t("how_it_work.how_it_work")}</div>
        <div className="landing-work-text2">
          {t("how_it_work.sub_how_it_work")}
        </div>
        <div className={t("how_it_work.stepsClass")}></div>
        <div className="text-center mb-5">
          <button className="landing-create-project" onClick={createProject}>
            {t("how_it_work.create_button")}
          </button>
        </div>
        <div className="landing-project">
          <div className="justify-content-center d-flex">
            <div className="landing-project-type">
              <div className="landing-project-type-header">
                {t("how_it_work.free")}
              </div>
              <div className="landing-project-type-text">
                {t("how_it_work.sub_free")}
              </div>
              <img
                src={CreateLogo2}
                className="landing-project-free-image"
              ></img>
            </div>
            <div className="landing-project-type ml-5">
              <div className="landing-project-type-header">
                {t("how_it_work.simple")}
              </div>
              <div className="landing-project-type-text">
                {t("how_it_work.sub_simple")}
              </div>
              <img
                src={CreateLogo3}
                className="landing-project-simple-image"
              ></img>
            </div>
            <div className="landing-project-type ml-5">
              <div className="landing-project-type-header">
                {t("how_it_work.secure")}
              </div>
              <div className="landing-project-type-text">
                {t("how_it_work.sub_secure")}
              </div>
              <img
                src={CreateLogo4}
                className="landing-project-secure-image"
              ></img>
            </div>
          </div>
        </div>
        <div className="landing-price">
          <div className="landing-price-text">{t("how_it_work.prices")}</div>
          <div className="justify-content-center d-flex">
            <div className="landing-price-description mr-5">
              <FaRegCheckCircle />
              <div className="landing-price-description-header">
                {t("how_it_work.no_creation_fees")}
              </div>
              <div className="landing-price-description-text1">
                {t("how_it_work.sub_no_creation_fees")}
              </div>
            </div>
            <div className="landing-price-description ml-5 mr-5">
              <FaRegCheckCircle />
              <div className="landing-price-description-header">
                {t("how_it_work.no_participation_fees")}
              </div>
              <div className="landing-price-description-text1">
                {t("how_it_work.sub_no_participation_fees")}
              </div>
            </div>
            <div className="landing-price-description ml-5">
              <FaRegCheckCircle />
              <div className="landing-price-description-header">
                {t("how_it_work.no_volatility")}
              </div>
              <div className="landing-price-description-text2">
                {t("how_it_work.sub_no_volatility")}
              </div>
            </div>
          </div>
        </div>
        <div className="landing-spend">
          <div className="landing-spend-text">
            {t("how_it_work.how_spend_pot")}
          </div>
          <div className="justify-content-center d-flex">
            <div className="landing-spend-container pb-4">
              <img src={SpendLogo1}></img>
              <div className="landing-spend-container-text1">
                {t("how_it_work.buy_from_partners")}
              </div>
              <div className="landing-spend-container-text2">
                {t("how_it_work.free")}
              </div>
              <div className="landing-spend-container-text3-container">
                <div className="landing-spend-container-text3">
                  <span>{t("how_it_work.sub_buy_from_partners")}</span>
                </div>
              </div>

              {/* <div className='landing-spend-container-next'>
                <button className='landing-spend-container-next-icon'>
                  <FaLongArrowAltRight />
                </button>
                <div className='landing-spend-container-under'></div>
              </div> */}
            </div>
            <div className="landing-spend-container ml-3 pb-4">
              <img src={SpendLogo2}></img>
              <div className="landing-spend-container-text1">
                {t("how_it_work.recovery_in_vital")}
              </div>
              <div className="landing-spend-container-text2">1%</div>
              <div className="landing-spend-container-text3-container">
                <div className="landing-spend-container-text3">
                  <span>{t("how_it_work.sub_recovery_in_vital")}</span>
                </div>
              </div>

              {/* <div className='landing-spend-container-next'>
                <button className='landing-spend-container-next-icon'>
                  <FaLongArrowAltRight />
                </button>
                <div className='landing-spend-container-under'></div>
              </div> */}
            </div>
            <div className="landing-spend-container ml-3 pb-4">
              <img src={SpendLogo3}></img>
              <div className="landing-spend-container-text1">
                {t("how_it_work.recovery_in_usdc")}
              </div>
              <div className="landing-spend-container-text2">2% - 3%</div>
              <div className="landing-spend-container-text3-container">
                <div className="landing-spend-container-text3">
                  <span>{t("how_it_work.sub1_recovery_in_usdc")}</span>
                </div>
                <div className="landing-spend-container-text3">
                  {t("how_it_work.sub2_recovery_in_usdc")}
                </div>
                <div className="landing-spend-container-text3">
                  {t("how_it_work.sub3_recovery_in_usdc")}
                </div>
                <div className="landing-spend-container-text3">
                  {t("how_it_work.sub4_recovery_in_usdc")}
                </div>
              </div>
              {/* <div className='landing-spend-container-next'>
                <button className='landing-spend-container-next-icon'>
                  <FaLongArrowAltRight />
                </button>
                <div className='landing-spend-container-under'></div>
              </div> */}
            </div>
            <div className="landing-spend-container ml-3 pb-4">
              <img src={SpendLogo4}></img>
              <div className="landing-spend-container-text1">
                {t("how_it_work.offer_pot")}
              </div>
              <div className="landing-spend-container-text2">
                {t("how_it_work.free")}
              </div>
              <div className="landing-spend-container-text3-container">
                <div className="landing-spend-container-text3">
                  <span>{t("how_it_work.sub1_offer_pot")}</span>
                </div>
                <div className="landing-spend-container-text3">
                  <span>{t("how_it_work.sub2_offer_pot")}</span>
                </div>
              </div>

              {/* <div className='landing-spend-container-next'>
                <button className='landing-spend-container-next-icon'>
                  <FaLongArrowAltRight />
                </button>
                <div className='landing-spend-container-under'></div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="landing-money-pot">
          {t("how_it_work.anytime_withdraw")}
        </div>
      </div>
      <div className="landing-mobile">
        <div className="landing-banner-container">
          <div>
            <div className="landing-logo">
              <div className="landing-logo-text1">{t("how_it_work.title")}</div>
              <div className="landing-logo-text2">
                {t("how_it_work.subtitle")}
              </div>
            </div>
          </div>
        </div>
        <div className="landing-work-text1">{t("how_it_work.how_it_work")}</div>
        <div className="landing-work-text2">
          {t("how_it_work.sub_how_it_work")}
        </div>
        <div className={t("how_it_work.stepsClassMobile")}></div>
        <div className="text-center mb-5">
          <button className="landing-create-project" onClick={createProject}>
            {t("how_it_work.create_button")}
          </button>
        </div>
        <div className="landing-project">
          <div className="justify-content-center">
            <div className="landing-project-type">
              <div className="landing-project-type-header">
                {t("how_it_work.free")}
              </div>
              <div className="landing-project-type-text">
                {t("how_it_work.sub_free")}
              </div>
              <img
                src={CreateLogo2}
                className="landing-project-free-image"
              ></img>
            </div>
            <div className="landing-project-type mt-4">
              <div className="landing-project-type-header">
                {t("how_it_work.simple")}
              </div>
              <div className="landing-project-type-text">
                {t("how_it_work.sub_simple")}
              </div>
              <img
                src={CreateLogo3}
                className="landing-project-simple-image"
              ></img>
            </div>
            <div className="landing-project-type mt-4">
              <div className="landing-project-type-header">
                {t("how_it_work.secure")}
              </div>
              <div className="landing-project-type-text">
                {t("how_it_work.sub_secure")}
              </div>
              <img
                src={CreateLogo4}
                className="landing-project-secure-image"
              ></img>
            </div>
          </div>
        </div>
        <div className="landing-price">
          <div className="landing-price-text">{t("how_it_work.prices")}</div>
          <div className="landing-price-description-container">
            <div className="landing-price-description">
              <FaRegCheckCircle />
              <div className="landing-price-description-header">
                {t("how_it_work.no_creation_fees")}
              </div>
              <div className="landing-price-description-text1">
                {t("how_it_work.sub_no_creation_fees")}
              </div>
            </div>
            <div className="landing-price-description mt-5">
              <FaRegCheckCircle />
              <div className="landing-price-description-header">
                {t("how_it_work.no_participation_fees")}
              </div>
              <div className="landing-price-description-text1">
                {t("how_it_work.sub_no_participation_fees")}
              </div>
            </div>
            <div className="landing-price-description mt-5 mb-5">
              <FaRegCheckCircle />
              <div className="landing-price-description-header">
                {t("how_it_work.no_volatility")}
              </div>
              <div className="landing-price-description-text2">
                {t("how_it_work.sub_no_volatility")}
              </div>
            </div>
          </div>
        </div>
        <div className="landing-spend">
          <div className="landing-spend-text">
            {t("how_it_work.how_spend_pot")}
          </div>
          <div className="justify-content-center">
            <div className="landing-spend-container pb-4">
              <img src={SpendLogo1}></img>
              <div className="landing-spend-container-text1">
                {t("how_it_work.buy_from_partners")}
              </div>
              <div className="landing-spend-container-text2">
                {t("how_it_work.free")}
              </div>
              <div className="landing-spend-container-text3-container">
                <div className="landing-spend-container-text3">
                  <span>{t("how_it_work.sub_buy_from_partners")}</span>
                </div>
              </div>

              {/* <div className='landing-spend-container-next'>
                <button className='landing-spend-container-next-icon'>
                  <FaLongArrowAltRight />
                </button>
                <div className='landing-spend-container-under'></div>
              </div> */}
            </div>
            <div className="landing-spend-container mt-4 pb-4">
              <img src={SpendLogo2}></img>
              <div className="landing-spend-container-text1">
                {t("how_it_work.recovery_in_vital")}
              </div>
              <div className="landing-spend-container-text2">1%</div>
              <div className="landing-spend-container-text3-container">
                <div className="landing-spend-container-text3">
                  <span>{t("how_it_work.sub_recovery_in_vital")}</span>
                </div>
              </div>

              {/* <div className='landing-spend-container-next'>
                <button className='landing-spend-container-next-icon'>
                  <FaLongArrowAltRight />
                </button>
                <div className='landing-spend-container-under'></div>
              </div> */}
            </div>
            <div className="landing-spend-container mt-4 pb-4">
              <img src={SpendLogo3}></img>
              <div className="landing-spend-container-text1">
                {t("how_it_work.recovery_in_usdc")}
              </div>
              <div className="landing-spend-container-text2">2% - 3%</div>
              <div className="landing-spend-container-text3-container">
                <div className="landing-spend-container-text3">
                  <span>{t("how_it_work.sub1_recovery_in_usdc")}</span>
                </div>
                <div className="landing-spend-container-text3">
                  {t("how_it_work.sub2_recovery_in_usdc")}
                </div>
                <div className="landing-spend-container-text3">
                  {t("how_it_work.sub3_recovery_in_usdc")}
                </div>
                <div className="landing-spend-container-text3">
                  {t("how_it_work.sub4_recovery_in_usdc")}
                </div>
              </div>
              {/* <div className='landing-spend-container-next'>
                <button className='landing-spend-container-next-icon'>
                  <FaLongArrowAltRight />
                </button>
                <div className='landing-spend-container-under'></div>
              </div> */}
            </div>
            <div className="landing-spend-container mt-4 pb-4">
              <img src={SpendLogo4}></img>
              <div className="landing-spend-container-text1">
                {t("how_it_work.offer_pot")}
              </div>
              <div className="landing-spend-container-text2">
                {t("how_it_work.free")}
              </div>
              <div className="landing-spend-container-text3-container">
                <div className="landing-spend-container-text3">
                  <span>{t("how_it_work.sub1_offer_pot")}</span>
                </div>
                <div className="landing-spend-container-text3">
                  <span>{t("how_it_work.sub2_offer_pot")}</span>
                </div>
              </div>

              {/* <div className='landing-spend-container-next'>
                <button className='landing-spend-container-next-icon'>
                  <FaLongArrowAltRight />
                </button>
                <div className='landing-spend-container-under'></div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="landing-money-pot">
          {t("how_it_work.anytime_withdraw")}
        </div>
      </div>
      <Modal
        classNames={{ root: "modal_root", modal: "vital_modal" }}
        open={openModal}
        onClose={onCloseModal}
        center
      >
        <Overlay uniqueId={uniqueId}></Overlay>
      </Modal>
      <Modal
        classNames={{ root: "modal_root", modal: "vital_modal" }}
        open={openWalletModal}
        onClose={onCloseWalletModal}
        center
      >
        <WalletConnect />
      </Modal>
    </div>
  );
};

export default HowItWork;
