import React, { useState } from "react";
import styles from "./ChangeOwner.module.scss";
import GradientBtn from "components/Buttons/GradientButton/GradientBtn";

import { sendTransactions } from '@elrondnetwork/dapp-core/services';
import { refreshAccount } from '@elrondnetwork/dapp-core/utils';
import { U32Value, ArgSerializer, AddressValue, Address } from "@elrondnetwork/erdjs";

import { CONTRACT_ADDRESS } from "../../../config";
import { useTranslation, Trans } from "react-i18next";

export default function ChangeOwner(props) {
  const { t, i18n } = useTranslation();
  const [ownerAddress, setOwnerAddress] = useState("");

  const handleChangeOwnerAddress = (e) => {
    setOwnerAddress(e.target.value);
  };

  const handleTransfer = async () => {
    if (ownerAddress == "") return;

    if (props.projectId < 1) return;

    const args = [new U32Value(props.projectId), new AddressValue(new Address(ownerAddress))];
    const { argumentsString } = new ArgSerializer().valuesToString(args);

    const data = "transferProjectOwnership@" + argumentsString;

    const tx = {
      value: 0,
      receiver: CONTRACT_ADDRESS,
      data: data,
      gasLimit: 200000000,
    };
    await refreshAccount();
    await sendTransactions({
      transactions: tx,
    });
  };

  return (
    <div className={styles.overlay_wrap}>
      <div className={styles.overlay_head}>
        <span>{t("changeowner_modal.title")}</span>
      </div>
      <p>{t("changeowner_modal.receiver_label")}</p>
      <input className={styles.input} placeholder="erd1..." onChange={handleChangeOwnerAddress}></input>
      <div className={styles.btn_wrap} style={{ marginTop: "20px" }}>
        {ownerAddress ? <GradientBtn text={t("changeowner_modal.validate_button")} clickAction={handleTransfer} /> : <GradientBtn style={styles.black_gradient} text={t("changeowner_modal.validate_button")} />}
      </div>
    </div>
  );
}
