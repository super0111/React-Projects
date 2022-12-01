import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import i18n from "i18n.js";
import Facebook from "../../assets/img/facebook.svg";
import Footer_img from "../../assets/img/footer-img.svg";
import Instagram from "../../assets/img/instagram.svg";
import vitalLogo from "../../assets/img/logo.svg";
import Twitter from "../../assets/img/twitter.svg";
import GradientBtn from "../Buttons/GradientButton/GradientBtn";
import styles from "./Footer.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  const currentLanguage = localStorage.getItem("i18nextLng").slice(0, 2).toUpperCase();

  const [languageFlag, setLanguageFlag] = useState(currentLanguage);

  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);

    setLanguageFlag(lng.toUpperCase());
    window.location.reload();
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_desktop_wrap}>
        <div className={styles.footer_content_wrap}>
          <div className={styles.footer_logo}>
            <img className={styles.footer_logo_img} src={vitalLogo} alt="footer-logo" />
            <span className={styles.footer_logo_text}>vital</span>
          </div>
          <span className={styles.footer_head}>{t("footer.title")}</span>
          <p className={styles.footer_description_one}>{t("footer.content")}</p>
          <div className={styles.footer_btn_wrap}>
            <a href="https://jungledex.com/swap?firstToken=USDC-c76f1f&secondToken=VITAL-ab7917" target="_blank" rel="noreferrer">
              <GradientBtn text={t("footer.button")} />
            </a>
          </div>
        </div>
        <div className={styles.footer_img}>
          <img src={Footer_img} alt="footer-img" />
        </div>
      </div>

      <div>
        <div className={styles.footer_bottom_wrap}>
          <Dropdown>
            <Dropdown.Toggle bsPrefix={styles.flagSelect}>
              <img alt={languageFlag} className={styles.flagImg} src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${languageFlag == "EN" ? "GB" : languageFlag}.svg`} />
              {currentLanguage}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => changeLanguage("fr")}>
                <img alt="French" className={styles.flagImg} src={"http://purecatamphetamine.github.io/country-flag-icons/3x2/FR.svg"} />
                FR
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeLanguage("en")}>
                <img alt="English" className={styles.flagImg} src={"http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"} />
                EN
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeLanguage("ro")}>
                <img alt="Romania" className={styles.flagImg} src={"http://purecatamphetamine.github.io/country-flag-icons/3x2/RO.svg"} />
                RO
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className={styles.footer_social}>
            <a href="https://twitter.com/VitalNetworkDAO" target="_blank" rel="noreferrer">
              <img src={Facebook} alt="facebook" />
            </a>
            <a href="https://twitter.com/VitalNetworkDAO" target="_blank" rel="noreferrer">
              <img src={Twitter} alt="twitter" />
            </a>
            <a href="https://twitter.com/VitalNetworkDAO" target="_blank" rel="noreferrer">
              <img src={Instagram} alt="instagram" />
            </a>
          </div>
          <div className={styles.footer_copyright}>
            <p className={styles.footer_copyright_text}>
              © <span className={styles.footer_copyright_year}>2022</span> All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
