import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { sendTransactions } from '@elrondnetwork/dapp-core/services';
import { refreshAccount } from '@elrondnetwork/dapp-core/utils';
import { useGetPendingTransactions } from '@elrondnetwork/dapp-core/hooks/transactions/useGetPendingTransactions';
import { useGetNetworkConfig } from '@elrondnetwork/dapp-core/hooks/useGetNetworkConfig';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import {
  TokenPayment,
  U32Value,
  ArgSerializer,
  BytesValue,
  BooleanValue,
  BigUIntValue,
  TransactionPayload,
} from "@elrondnetwork/erdjs/out";
import axios from "axios";
import axiosRetry from 'axios-retry';
import BigNumber from "bignumber.js/bignumber.js";

import { useTranslation, Trans } from "react-i18next";
import GradientBtn from "components/Buttons/GradientButton/GradientBtn";
import { TOKENS } from "data";
import TokenInput from "../../../components/TokenInput";
import { CONTRACT_ADDRESS, GATEWAY } from "../../../config";
import styles from "./Participation.module.scss";

const PRICE_QUERY = gql`
  {
    tokens {
      identifier
      price
    }
  }
`;

axiosRetry(axios, {
  retries: 1000,
  retryCondition: (e) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(e) ||
      e.response.status === 429
    );
  },
  retryDelay: axiosRetry.exponentialDelay,
});

export default function Participation(props) {

  const { address, account } = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { network } = useGetNetworkConfig();
  const isLoggedIn = Boolean(address);

  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [comment, setComment] = useState("");
  const [tokenPrice, setTokenPrice] = useState([]);
  const [participationDollarsValue, setparticipationDollarsValue] = useState(0);
  const [hiddenStatus, setHiddenStatus] = useState(false);
  const [selectedTokenId, setSelectedTokenId] = useState(0);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleParticipationAmount = (selectedTokenId, amount) => {
    // console.log(selectedTokenId, amount);
    setAmount(amount);
    setSelectedTokenId(selectedTokenId);
  };

  const handleComment = (e) => {
    setComment(e.target.value);
    // console.log(e.target.value);
  };

  const handleParticipate = async () => {
    console.log(name, amount, hiddenStatus, comment);
    console.log(TOKENS[selectedTokenId]);
    if (props.projectId < 1) return;
    if (amount <= 0) return;

    if (TOKENS[selectedTokenId].identifier === "EGLD") {
      console.log(TOKENS[selectedTokenId].identifier);
      const args = [
        new U32Value(props.projectId),
        new BooleanValue(hiddenStatus),
        BytesValue.fromUTF8(name),
        BytesValue.fromUTF8(comment),
      ];
      const { argumentsString } = new ArgSerializer().valuesToString(args);

      // let data = '';
      // if (name !== '') {
      //   data = 'participateProject@' + argumentsString + '@' + new Buffer(name).toString('hex');
      // } else {
      //   data = 'participateProject@' + argumentsString;
      // }
      const data = new TransactionPayload(
        `participateProject@${argumentsString}`
      );

      const tx = {
        receiver: CONTRACT_ADDRESS,
        data: data.toString(),
        gasLimit: 60000000,
        value: TokenPayment.egldFromAmount(amount),
      };
      await refreshAccount();
      await sendTransactions({
        transactions: tx,
      });
    } else {
      console.log(TOKENS[selectedTokenId].identifier);
      const value = new BigNumber(amount).multipliedBy(
        Math.pow(10, TOKENS[selectedTokenId].decimals)
      );
      const args = [
        BytesValue.fromUTF8(TOKENS[selectedTokenId].identifier),
        new BigUIntValue(
          TokenPayment.fungibleFromBigInteger(
            TOKENS[selectedTokenId].identifier,
            value,
            TOKENS[selectedTokenId].decimals
          ).valueOf()
        ),
        BytesValue.fromUTF8("participateProjectWithEsdt"),
        new U32Value(props.projectId),
        new BooleanValue(hiddenStatus),
        BytesValue.fromUTF8(name),
        BytesValue.fromUTF8(comment),
      ];
      const { argumentsString } = new ArgSerializer().valuesToString(args);
      const data = new TransactionPayload(`ESDTTransfer@${argumentsString}`);
      const tx = {
        receiver: CONTRACT_ADDRESS,
        data: data.toString(),
        gasLimit: 60000000,
        value: 0,
      };
      await refreshAccount();
      await sendTransactions({
        transactions: tx,
      });
    }
  };

  useEffect(() => {
    // (async () => {
    //   const prices = {};
    //   let response = await axios.get(`${GATEWAY}/mex/tokens?from=0&size=10000`);
    //   response.data.map((item) => {
    //     const price = {
    //       price: item.price
    //     };
    //     prices[item.id] = price;
    //   });
    //   setTokenPrice(prices);
    // })();
    // axios
    //   .get(`${GATEWAY}/mex/tokens?from=0&size=10000`)
    //   .then((res) => {
    //     const prices = {};
    //     res.data.map((item) => {
    //       const price = {
    //         price: item.price
    //       };
    //       prices[item.id] = price;
    //     });
    //     setTokenPrice(prices);
    //   });
  }, [hasPendingTransactions, isLoggedIn]);

  const handelCheckBox = () => {
    setHiddenStatus(!hiddenStatus);
  };

  // const { data, loading, error } = useQuery(PRICE_QUERY);
  // if (loading) return "Loading...";
  // if (error) return <pre>{error.message}</pre>

  return (
    <div className={styles.overlay_wrap}>
      <div className={styles.overlay_head}>
        <span>{t("participate_modal.title")}</span>
      </div>
      <p>{t("participate_modal.label_firstname")}</p>
      <input
        className={styles.input}
        placeholder={t("participate_modal.placeholder_firstname")}
        onChange={handleName}
      ></input>
      <p>{t("participate_modal.label_amount")}</p>
      <TokenInput handleParticipationAmount={handleParticipationAmount} tokenPrice={tokenPrice} />
      <p>{t("participate_modal.comment_label")}</p>
      <textarea
        className={styles.input_comment}
        placeholder={t("participate_modal.comment_placeholder")}
        onChange={handleComment}
        maxLength="150"
      ></textarea>
      <div className="d-flex">
        <div className={styles.inputGroup}>
          <input
            id="option1"
            name="option1"
            type="checkbox"
            onClick={handelCheckBox}
          />
          <label htmlFor="option1">
            {t("participate_modal.identity_hide")}
          </label>
        </div>
      </div>
      <p className={styles.participationDollarsValue}>
        {t("participate_modal.text_info1")}
        <br />
        {t("participate_modal.text_info2")}
      </p>
      <div className={styles.btn_wrap}>
        {(amount*TOKENS[selectedTokenId].price>=1 && name) || (amount*TOKENS[selectedTokenId].price>=1 && hiddenStatus) ? (
          <GradientBtn
            text={t("participate_modal.validate_button")}
            clickAction={handleParticipate}
          />
        ) : (
          <GradientBtn
            style={styles.black_gradient}
            text={t("participate_modal.validate_button")}
          />
        )}
      </div>
    </div>
  );
}
