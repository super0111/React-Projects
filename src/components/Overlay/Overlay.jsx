import React from "react";
import { useState } from "react";
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import { refreshAccount } from '@elrondnetwork/dapp-core/utils';
import { sendTransactions } from '@elrondnetwork/dapp-core/services';
import { ArgSerializer, BigUIntValue, BytesValue, TransactionPayload } from "@elrondnetwork/erdjs";
import BigNumber from "bignumber.js/bignumber.js";
import ReCAPTCHA from "react-google-recaptcha";

import { useTranslation, Trans } from "react-i18next";
import GradientBtn from "components/Buttons/GradientButton/GradientBtn";
import { common, solidarity, expense } from "../../assets/img/index.js";
import GridData from "../../assets/js/GridData";
import { CONTRACT_ADDRESS, GoogleRecaptchaPublicKey } from "../../config";
import Grid from "../../pages/HomePage/Grid/Grid";
import CategoryBtn from "./CategoryBtn/CategoryBtn";
import styles from "./Overlay.module.scss";

export default function Overlay(props) {
  const { address } = useGetAccountInfo();
  const isLoggedIn = Boolean(address);

  const { t, i18n } = useTranslation();

  const [heading, setHeading] = useState(t("multistep_form.step1.title"));
  const [page_index, setPageIndex] = useState(1);
  const [c_index, setCategoryIndex] = useState(0);
  const [nameIsFilled, setNameIsFilled] = useState(false);
  const [goalIsFilled, setGoalIsFilled] = useState(false);
  const [isNotARobot, setIsNotARobot] = useState(false);
  const [progress_step, setProgressStep] = useState(styles.step1);
  const [isSelected, setSelected] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectGoal, setProjectGoal] = useState("");
  const [btnText, setBtnText] = useState(t("multistep_form.next"));
  const [btnVisibility, setBtnVisibility] = useState(styles.invisible);
  const [values, setValues] = useState({});
  const [categoryName, setCategoryName] = useState("");
  const handleSelectChange = (fieldId, value, title) => {
    setValues({ [fieldId]: value });
    setSelected(value);
    if (value === true) {
      setCategoryName(title);
    }
  };

  const category_icons = [common, solidarity, expense];
  const placeholderName = t("multistep_form.step3.placeholderName");
  const placeholderGoal = t("multistep_form.step3.placeholderGoal");
  const nextPage = () => {
    setPageIndex(page_index + 1 > 4 ? 4 : page_index + 1);
    if (page_index === 1) {
      setHeading(t("multistep_form.step2_gift.title"));
      setProgressStep(styles.step2);
      setBtnVisibility(styles.visible);
    } else if (page_index === 2) {
      setHeading(t("multistep_form.step3.title"));
      setProgressStep(styles.step3);
      setBtnVisibility(styles.visible);
    } else if (page_index === 3) {
      setHeading(t("multistep_form.step4.robot"));
      setProgressStep(styles.step4);
      setBtnText(t("multistep_form.step4.button_create"));
    }
  };
  const setCategory = (index) => {
    setSelected(false);
    setCategoryIndex(index);
    nextPage();
  };
  const main_categories = GridData.map((item, index) => {
    let v = "";
    switch (item.category) {
      case "A common gift":
        v = t("multistep_form.step1.gift");
        break;
      case "A solidarity project":
        v = t("multistep_form.step1.solidarity");
        break;
      case "One expense for many":
        v = t("multistep_form.step1.expense");
        break;
      default:
    }
    return <CategoryBtn key={item.key} clickAction={setCategory} img={category_icons[index]} name={v} index={index}></CategoryBtn>;
  });
  const createProject = async () => {
    // create project
    if (isLoggedIn) {
      const amount = projectGoal;
      const value = new BigNumber(amount).multipliedBy(1000000);
      const organizerName = "";

      const args = [BytesValue.fromUTF8(projectName), BytesValue.fromUTF8(categoryName), BytesValue.fromUTF8(organizerName), new BigUIntValue(value), BytesValue.fromUTF8(props.uniqueId)];
      const { argumentsString } = new ArgSerializer().valuesToString(args);
      const data = new TransactionPayload(`createProject@${argumentsString}`);
      // const data = 'createProject@' + new Buffer(projectName).toString('hex') + '@' + new Buffer(categoryName).toString('hex') + '@' + new Buffer(organizerName).toString('hex') + '@' + argumentsString;

      const tx = {
        value: 0,
        receiver: CONTRACT_ADDRESS,
        data: data.toString(),
        gasLimit: 20000000,
      };
      await refreshAccount();
      await sendTransactions({
        transactions: tx,
      });
    }
  };
  const previousPage = () => {
    setPageIndex(page_index - 1 < 1 ? 1 : page_index - 1);
    if (page_index === 2) {
      setHeading(t("multistep_form.step2_gift.title"));
      setBtnVisibility(styles.invisible);
      setProgressStep(styles.step1);
    } else if (page_index === 3) {
      setHeading(t("multistep_form.step3.title"));
      setProgressStep(styles.step2);
    } else if (page_index === 4) {
      setHeading(t("multistep_form.step3.title"));
      setProgressStep(styles.step3);
      setBtnText(t("multistep_form.next"));
    }
  };
  const onChangeName = (event) => {
    const text = event.target.value;
    setProjectName(text);
    setNameIsFilled(text === "" ? false : true);
  };
  const onChangeGoal = (event) => {
    const num = event.target.value;
    setProjectGoal(num);
    setGoalIsFilled(num === "" ? false : true);
  };
  const onChangeCaptcha = (captchaToken) => {
    if (captchaToken.length > 300) {
      setIsNotARobot(true);
      console.log("success");
    } else {
      console.log("Its a bot");
    }
  };
  const nonCategory = () => {
    setPageIndex(3);
    setHeading(t("multistep_form.step3.title"));
    setProgressStep(styles.step3);
    setBtnVisibility(styles.visible);
    setCategoryName("No category");
  };
  const renderBtn = () => {
    if (page_index === 1) {
      return (
        <div onClick={nextPage}>
          <GradientBtn text={btnText} />
        </div>
      );
    } else if (page_index === 2) {
      if (isSelected === true) {
        return (
          <div onClick={nextPage}>
            <GradientBtn text={btnText} />
          </div>
        );
      } else {
        return (
          <div>
            <GradientBtn style={styles.black_gradient} text={btnText} />
          </div>
        );
      }
    } else if (page_index === 3) {
      if (nameIsFilled === true && goalIsFilled === true) {
        return (
          <div onClick={nextPage}>
            <GradientBtn text={btnText} />
          </div>
        );
      } else {
        return (
          <div>
            <GradientBtn style={styles.black_gradient} text={btnText} />
          </div>
        );
      }
    } else {
      if (isNotARobot === true) {
        return (
          <div onClick={createProject}>
            <GradientBtn text={btnText} />
          </div>
        );
      } else {
        return (
          <div>
            <GradientBtn style={styles.black_gradient} text={btnText} />
          </div>
        );
      }
    }
  };
  return (
    <div className={styles.overlay_wrap}>
      <div className={styles.overlay_head}>
        <span>{heading}</span>
      </div>
      <div className={styles.progress_wrap}>
        <div className={[styles.progress, progress_step].join(" ")}></div>
      </div>
      <div className={styles.content_wrap}>
        <div className={styles.main_category} style={{ display: page_index === 1 ? "inherit" : "none" }}>
          {main_categories}
          <button onClick={nonCategory}>{t("multistep_form.step1.none_of_these")}</button>
        </div>
        <div className={styles.overlay_body} style={{ display: page_index === 2 ? "inherit" : "none" }}>
          <Grid selectAction={handleSelectChange} active={values[GridData[c_index].key]} key={GridData[c_index].key} field_id={GridData[c_index].key} category={GridData[c_index].category} items={GridData[c_index].items} />
        </div>
        <label style={{ display: page_index === 3 ? "inherit" : "none" }}>{placeholderName}</label>
        <input placeholder={placeholderName} className={styles.input_name} maxLength="30" style={{ display: page_index === 3 ? "inherit" : "none" }} onChange={onChangeName}></input>
        <label style={{ display: page_index === 3 ? "inherit" : "none" }}>{placeholderGoal}</label>
        <div className={styles.input_goal_container} style={{ display: page_index === 3 ? "inherit" : "none" }}>
          <input type="number" placeholder="100" className={styles.input_goal} maxLength="10" style={{ display: page_index === 3 ? "inherit" : "none" }} onChange={onChangeGoal}></input>
        </div>
        <div className={styles.rcaptcha} style={{ display: page_index === 4 ? "inherit" : "none" }}>
          <ReCAPTCHA sitekey={GoogleRecaptchaPublicKey} onChange={onChangeCaptcha} />
        </div>
      </div>
      <div className={styles.btn_wrap}>
        <div onClick={previousPage} className={btnVisibility}>
          <GradientBtn text={t("multistep_form.previous")} />
        </div>
        {renderBtn()}
      </div>
    </div>
  );
}
