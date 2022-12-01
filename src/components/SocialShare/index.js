import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useTranslation, Trans } from "react-i18next";
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton, EmailIcon, FacebookIcon, LinkedinIcon, TelegramIcon, TwitterIcon, WhatsappIcon } from "react-share";

import { DAPP_URL } from "config";
import styles from "./SocialShare.css";

export default function SocialShare(props) {
  const { t, i18n } = useTranslation();
  const [link, setLink] = useState(props.dappUrl);
  const [copyText, setCopyText] = useState(`${t("project_detail.copy")}`);

  const lastPath = window.location.pathname;
  const shareURL = DAPP_URL + lastPath;
  return (
    <div className="social_share">
      <h2>{t("share_modal.title")}</h2>
      <p>{t("share_modal.subtitle")}</p>
      <div className="row">
        <div className="col-2">
          <FacebookShareButton url={shareURL}>
            <FacebookIcon size={48} round={true} />
          </FacebookShareButton>
        </div>
        <div className="col-2">
          <LinkedinShareButton url={shareURL}>
            <LinkedinIcon size={48} round={true} />
          </LinkedinShareButton>
        </div>
        <div className="col-2">
          <TelegramShareButton url={shareURL}>
            <TelegramIcon size={48} round={true} />
          </TelegramShareButton>
        </div>
        <div className="col-2">
          <WhatsappShareButton url={shareURL}>
            <WhatsappIcon size={48} round={true} />
          </WhatsappShareButton>
        </div>
        <div className="col-2">
          <TwitterShareButton url={shareURL}>
            <TwitterIcon size={48} round={true} />
          </TwitterShareButton>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-8 col-12">
          <input className="url_input" disabled={"disabled"} value={shareURL}></input>
        </div>
        <div className="col-lg-4 col-12">
          <CopyToClipboard text={shareURL} onCopy={() => setCopyText(`${t("project_detail.copied")}`)}>
            <button className="copy_button">{copyText}</button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}
