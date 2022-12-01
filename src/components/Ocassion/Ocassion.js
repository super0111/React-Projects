import React from "react";
import { useTranslation } from "react-i18next";
import BirthdayWedding from "../../assets/img/birthday_wedding.svg";
import styles from "./Ocassion.module.scss";
import OcassionBoxes from "./Ocassion_boxes/Ocassion_boxes";

const Ocassion = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className={styles.ocassion_desktop}>
      <span className={styles.main_ocassion_name}>{t("homepage.last_section.title")}</span>
      <div className={styles.ocassion_desktop_top}>
        <OcassionBoxes title={t("homepage.last_section.wedding.title")} content={t("homepage.last_section.wedding.description")} />
        <OcassionBoxes title={t("homepage.last_section.community.title")} content={t("homepage.last_section.community.description")} />
        <OcassionBoxes title={t("homepage.last_section.health.title")} content={t("homepage.last_section.health.description")} />
        <OcassionBoxes title={t("homepage.last_section.common_expense.title")} content={t("homepage.last_section.common_expense.description")} />
      </div>
      <div className={styles.ocassion_desktop_center}>
        <img src={BirthdayWedding} alt="BirthdayWedding" />
      </div>
      <div className={styles.ocassion_desktop_bottom}>
        <OcassionBoxes title={t("homepage.last_section.birthday.title")} content={t("homepage.last_section.birthday.description")} />
        <OcassionBoxes title={t("homepage.last_section.baby_shower.title")} content={t("homepage.last_section.baby_shower.description")} />
        <OcassionBoxes title={t("homepage.last_section.animal.title")} content={t("homepage.last_section.animal.description")} />
        <OcassionBoxes title={t("homepage.last_section.weekend.title")} content={t("homepage.last_section.weekend.description")} />
      </div>
    </div>
  );
};
export default Ocassion;
