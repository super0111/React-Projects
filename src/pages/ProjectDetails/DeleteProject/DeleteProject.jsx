import React, { useState } from "react";
import styles from "./DeleteProject.module.scss";
import GradientBtn from "components/Buttons/GradientButton/GradientBtn";

import { sendTransactions } from '@elrondnetwork/dapp-core/services';
import { refreshAccount } from '@elrondnetwork/dapp-core/utils';
import { U32Value, ArgSerializer, AddressValue, Address } from "@elrondnetwork/erdjs";

import { CONTRACT_ADDRESS } from "../../../config";
import { useTranslation, Trans } from "react-i18next";

export default function DeleteProject(props) {
  const { t, i18n } = useTranslation();

  const d = props.projectDatas;

  const handleDelete = async () => {
    if (d.projectId < 1) return;

    const args = [new U32Value(d.projectId)];
    const { argumentsString } = new ArgSerializer().valuesToString(args);

    const data = "removeProject@" + argumentsString;
    const tx = {
      value: 0,
      receiver: CONTRACT_ADDRESS,
      data: data,
      gasLimit: 10000000,
    };
    await refreshAccount();
    await sendTransactions({
      transactions: tx,
    });
    await props.onClose();
  };

  return (
    <div className={styles.overlay_wrap}>
      <div className={styles.overlay_head}>
        <span>{t("delete_modal.title")}</span>
      </div>
      <p>{t("delete_modal.message")}</p>
      <div className={styles.btn_wrap} style={{ marginTop: "20px" }}>
        <GradientBtn text={t("delete_modal.delete_button")} clickAction={handleDelete} />
      </div>
    </div>
  );
}
