import React from "react";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { person, money } from "../../../assets/img";
import { ANNIVERSARY, BIRTHBAPTISM, HOUSEWARMING, OTHERCOMMONGIFTS, RETIREMENTPOT, WEDDING, ANIMALS, ENTREPRENEURSHIP, HUMANITRAIAN, MEDICAL, OTHERPROJECTS, STUDIES, BACHELORPARTY, EVENING, FUNREAL, HOLIDAYS, OTHEREXPENSES, PURCHASEREPAIR } from "../../../assets/img/index";

import VERIFIED from "../../../assets/img/verified.png";
import { PINATA_GETWAY } from "../../../config";
import styles from "./ProjectCard.module.scss";

export default function ProjectCard(props) {
  const { t, i18n } = useTranslation();
  const pro = (props.amount / props.goal).toFixed(1) * 100;
  var pro_class = styles.w0;
  switch (pro) {
    case 10:
      pro_class = styles.w10;
      break;
    case 20:
      pro_class = styles.w20;
      break;
    case 30:
      pro_class = styles.w30;
      break;
    case 40:
      pro_class = styles.w40;
      break;
    case 50:
      pro_class = styles.w50;
      break;
    case 60:
      pro_class = styles.w60;
      break;
    case 70:
      pro_class = styles.w70;
      break;
    case 80:
      pro_class = styles.w80;
      break;
    case 90:
      pro_class = styles.w90;
      break;
    case 100:
      pro_class = styles.w100;
      break;
    default:
      break;
  }

  if (props.amount > props.goal) {
    pro_class = styles.w100;
  }

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/p/${props.project_unqiue_id}`);
  };

  let CoverImage = OTHERCOMMONGIFTS;
  switch (props.category) {
    case "A common gift":
      CoverImage = ANNIVERSARY;
      break;
    case "Wedding":
      CoverImage = WEDDING;
      break;
    case "Retirement pot":
      CoverImage = RETIREMENTPOT;
      break;
    case "House-warming":
      CoverImage = HOUSEWARMING;
      break;
    case "Birth/Baptism":
      CoverImage = BIRTHBAPTISM;
      break;
    case "Other common gift":
      CoverImage = OTHERCOMMONGIFTS;
      break;
    case "Medical":
      CoverImage = MEDICAL;
      break;
    case "Animals":
      CoverImage = ANIMALS;
      break;
    case "Humanitarian":
      CoverImage = HUMANITRAIAN;
      break;
    case "Studies":
      CoverImage = STUDIES;
      break;
    case "Entrepreneurship":
      CoverImage = ENTREPRENEURSHIP;
      break;
    case "Other project":
      CoverImage = OTHERPROJECTS;
      break;
    case "Evening":
      CoverImage = EVENING;
      break;
    case "Holidays":
      CoverImage = HOLIDAYS;
      break;
    case "Funeral":
      CoverImage = FUNREAL;
      break;
    case "Bachelor party":
      CoverImage = BACHELORPARTY;
      break;
    case "Purchase/Repair":
      CoverImage = PURCHASEREPAIR;
      break;
    case "Other expense":
      CoverImage = OTHEREXPENSES;
      break;
    case "No category":
      CoverImage = OTHERCOMMONGIFTS;
      break;
    default:
      break;
  }
  return (
    // ADVANCE CAROUSEL:
    <div className={styles.projectCard} onClick={handleClick}>
      {/* CAROUSEL WRAP */}
      <div className={styles.projectCard_wrap}>
        {props.verifiedStatus && (
          <OverlayTrigger
            key="top"
            placement="top"
            overlay={
              <Tooltip id="tooltip-top">
                <div className="text-justify">{t("project_detail.verified_tooltip")}</div>
              </Tooltip>
            }
          >
            <img src={VERIFIED} className={styles.verified_img} />
          </OverlayTrigger>
        )}

        {/* CAROUSEL IMAGE */}
        {props.photo === "" ? <img className={styles.carousel_img} src={CoverImage} alt={props.category} /> : <img className={styles.carousel_img} src={PINATA_GETWAY + props.photo} alt={props.category} />}

        {/* CAROUSEL CONTENT WRAP */}
        <div className={styles.projectCard_body_wrap}>
          <div className={styles.projectCard_text_additional}>
            {/* CAROUSEL TEXT WRAP */}
            <div className={styles.projectCard_textWrap}>
              <span className={styles.projectCard_title}>{props.name}</span>
              <p className={styles.projectCard_info}>{props.description.length !== 0 ? props.description : "Welcome to this common pot! Here you can directly and in one click, participate in this common pot. Everyone contributes the amount they want."}</p>
            </div>
            {/* ADDITIONAL */}
            <div className={styles.projectCard_additional}>
              {/* HEART */}
              {/* <div className={styles.projectCard_additional_heart}>
                <img src={heart} alt='heart' />
                <span>30</span>
              </div> */}
              {/* PERSON */}
              <div className={styles.projectCard_additional_person}>
                <span><strong>${props.amount.toLocaleString(localStorage.getItem("i18nextLng"))}</strong> raised</span><br/>
                <span><strong>{props.participants}</strong> participants</span>
              </div>
              {/* MONEY */}
              <div className={styles.projectCard_additional_money}>
              <br/><span><strong>18</strong> days</span>
              </div>
            </div>
          </div>
          {/* CAROUSEL BAR */}
          {props.goal ? (
            <div className={styles.projectCard_barWrap}>
              <div className={styles.projectCard_barContainer}>
                <div className={[styles.projectCard_bar, pro_class].join(" ")}>
                  <span className={styles.projectCard_current}></span>
                  <span className={styles.projectCard_total}>
                    {props.goal !== 0 ? (
                      <span>
                        <span className={styles.target}></span>
                      </span>
                    ) : null}
                  </span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
