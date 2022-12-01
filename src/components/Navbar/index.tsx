import React, { useState, useEffect } from "react";
import { useGetLoginInfo } from '@elrondnetwork/dapp-core/hooks';
import { logout } from '@elrondnetwork/dapp-core/utils';
import { AuthenticatedRoutesWrapper } from '@elrondnetwork/dapp-core/wrappers';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaEllipsisV, FaTimesCircle, FaBars } from "react-icons/fa";
import { Modal } from "react-responsive-modal";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { logo } from "assets/img";
import "./index.css";
import { Footer, GradientBtn, WalletConnect } from "components";
import { DAPP_URL } from "config";
import routes, { routeNames } from "routes";
import "bootstrap/dist/css/bootstrap.min.css";

import 'antd/dist/antd.css';
import { Input } from 'antd';

const { Search } = Input;

// React.ReactNode
function Navbar({ children }: { children: React.ReactNode }) {
  const { search } = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [isHidden, setHidden] = useState("hide");
  const connect = () => {
    setHidden("hide");
    onOpenModal();
  };
  const disconnect = () => {
    logout(DAPP_URL);
    setHidden("hide");
  };

  const { isLoggedIn } = useGetLoginInfo();
  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);
  const showNavBar = () => {
    setHidden("show");
  };
  const hideNavBar = () => {
    setHidden("hide");
  };
  const { t, i18n } = useTranslation();
  const { address } = useGetAccountInfo();

  const [linkActive, setLinkActive] = useState(0);

  useEffect(() => {
    if (isLoggedIn) {
      onCloseModal();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (location.pathname === routeNames.home) {
      setLinkActive(0);
    }
    else if (location.pathname === routeNames.howitwork) {
      setLinkActive(1);
    }
    else if (location.pathname === routeNames.projects) {
      setLinkActive(2);
    }
    else if (location.pathname === routeNames.contact) {
      setLinkActive(3);
    }
    else if (location.pathname.includes("p/") === true) {
      setLinkActive(2);
    }
  });

  return (
    <div className="bg-light d-flex flex-column flex-fill wrapper">
      <header className="App-header">
        <nav>
          <div className="nav_mobile">
            <div className="brand_logo_wrapper_mob">
              <Link to={routeNames.home}>
                <img src={logo} alt="brand logo" />
                <span className="brand_name">VITAL</span>
              </Link>
            </div>
            <div className="nav_icon_div" onClick={showNavBar}>
              <FaBars />
            </div>
          </div>
          <div className="nav_desktop">
            <div className="logo_links">
              <div className="brand_logo_wrapper">
                <Link to={routeNames.home}>
                  <img src={logo} alt="brand logo" />
                  <span className="brand_name">VITAL</span>
                </Link>
              </div>
              <div className="nav_links">
                <div className="links_wrapper">
                  <Link className={linkActive === 0 ? "active" : ""} to={routeNames.home} >{t("project_search.home")}</Link>
                  <Link className={linkActive === 1 ? "active" : ""} to={routeNames.howitwork}>{t("project_search.aboutus")}</Link>
                  <Link className={linkActive === 2 ? "active" : ""} to={routeNames.projects}>{t("project_search.project")}</Link>
                  {/* <div className="nav_links_buttons"><Link to={routeNames.projects}>{t("project_search.title")}</Link></div>
                <div className="nav_links_buttons"><Link to={routeNames.howitwork}>{t("how_it_work.how_it_work")}</Link></div> */}
                </div>
              </div>
            </div>
            <div className="search_connect">
              <div className="search_box">
                <Search size="large" placeholder={t("project_search.research")} />
              </div>
              <div className="connect_wrapper">
                {isLoggedIn ? (
                  <Dropdown>
                    <Dropdown.Toggle bsPrefix="bim" id="dropdown-basic">
                      {address.slice(0, 3) + "..." + address.slice(address.length - 3) + " ▼"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link to={routeNames.mymoneypots} style={{ textDecoration: "none", padding: "0" }}>
                          {t("navbar.my_money_pot")}
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={disconnect}>{t("navbar.disconnect")}</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <GradientBtn text={t("navbar.connect")} clickAction={connect} />
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main className="d-flex flex-column flex-grow-1">
        <AuthenticatedRoutesWrapper routes={routes} unlockRoute={`${routeNames.home}${search}`}>
          {children}
        </AuthenticatedRoutesWrapper>
      </main>
      <Footer />
      <Modal classNames={{ root: "modal_root", modal: "vital_modal" }} open={openModal} onClose={onCloseModal} center>
        <WalletConnect />
      </Modal>
      <div className={["mobile-navbar", isHidden].join(" ")}>
        <div className="nav_cancel_div" onClick={hideNavBar}>
          <FaTimesCircle size={25} />
        </div>

        <Link to={routeNames.home} onClick={hideNavBar}>{t("project_search.home")}</Link>
        <Link to={routeNames.howitwork} onClick={hideNavBar}>{t("project_search.aboutus")}</Link>
        <Link to={routeNames.projects} onClick={hideNavBar}>{t("project_search.project")}</Link>

        {isLoggedIn ? (
          <Dropdown>
            <Dropdown.Toggle bsPrefix="bim" id="dropdown-basic">
              {address.slice(0, 3) + "..." + address.slice(address.length - 3) + " ▼"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to={routeNames.mymoneypots} style={{ textDecoration: "none", padding: "0" }} onClick={hideNavBar}>
                  {t("navbar.my_money_pot")}
                </Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={disconnect}>{t("navbar.disconnect")}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <GradientBtn text={t("navbar.connect")} clickAction={connect} />
        )}
      </div>
    </div>
  );
}

export default Navbar;
