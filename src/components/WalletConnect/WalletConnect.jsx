import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import styles from "./WalletConnect.module.scss";
import { defi_wallet } from "../../assets/img/index.js";
import { app_wallet } from "../../assets/img/index.js";
import { ledger } from "../../assets/img/index.js";
import { web_wallet } from "../../assets/img/index.js";
import { useTranslation, Trans } from "react-i18next";
import { walletConnectV2ProjectId } from 'config';
import { useGetLoginInfo } from '@elrondnetwork/dapp-core/hooks';
import {
  ExtensionLoginButton,
  WebWalletLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton,
} from '@elrondnetwork/dapp-core/UI';

export default function WalletConnect(props) {
  const { isLoggedIn } = useGetLoginInfo();
  const { t, i18n } = useTranslation();

  const webWalletCallback = localStorage.getItem("lastPath");

  React.useEffect(() => {
    if (isLoggedIn) {
      // if (props.projectId.length > 0) {
      //   window.location.href = `/p/${props.projectId}`;
      // } else {
      //   window.location.href = routeNames.home;
      // }
    }
  }, [isLoggedIn]);
  return (
    <div className={styles.overlay_wrap}>
      <div className={styles.overlay_head}>
        <span>{t("connect_modal.title")}</span>
      </div>
      <div className={styles.btn_connect}>
        <div className={styles.flex_div}>
          <img src={defi_wallet} alt="Maiar Defi Wallet" />
          <span>Maiar Defi Wallet</span>
          <FaLongArrowAltRight size={28} />
        </div>
        <ExtensionLoginButton
          // callbackRoute={props.projectId?.length > 0 ? `/p/${props.projectId}` : routeNames.home}
          loginButtonText={"Extension"}
          redirectAfterLogin={true}
        />
      </div>
      <div className={styles.btn_connect}>
        <div className={styles.flex_div}>
          <img src={app_wallet} alt="Maiar App" />
          <span>Maiar App</span>
          <FaLongArrowAltRight size={28} />
        </div>
        <WalletConnectLoginButton
          // callbackRoute={props.projectId?.length > 0 ? `/p/${props.projectId}` : routeNames.home}
          loginButtonText={"Maiar"}
          redirectAfterLogin={true}
        />
      </div>
      <div className={styles.btn_connect}>
        <div className={styles.flex_div}>
          <img src={ledger} alt="Ledger" />
          <span>Ledger</span>
          <FaLongArrowAltRight size={28} />
        </div>
        <LedgerLoginButton
          loginButtonText={"Ledger"}
          // callbackRoute={props.projectId?.length > 0 ? `/p/${props.projectId}` : routeNames.home}
          redirectAfterLogin={true}
          // className={"test-class_name"}
        />
      </div>
      <div className={styles.btn_connect}>
        <div className={styles.flex_div}>
          <img src={web_wallet} alt="Elrond Web Wallet" />
          <span>Elrond web Wallet</span>
          <FaLongArrowAltRight size={28} />
        </div>
        <WebWalletLoginButton
          callbackRoute={webWalletCallback}
          loginButtonText={"Web wallet"}
          redirectAfterLogin={true}
          token={props.projectId}
        />
      </div>
      <div className={styles.bottom_div}>
        <span>{t("connect_modal.elrond_push")}</span>
        <a
          href="https://wallet.elrond.com/create"
          rel="noreferrer"
          target="_blank"
        >
          {t("connect_modal.learn")}
        </a>
      </div>
    </div>
  );
}
