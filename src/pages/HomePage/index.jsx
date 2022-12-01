import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Modal } from "react-responsive-modal";
import parse from "html-react-parser";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { routeNames } from "routes";
import "react-notifications/lib/notifications.css";
import {
  hero_text,
  how_1_mobile,
  how_2_mobile,
  how_3_mobile,
  step1_notebook,
  step2_share,
  step3_collect,
  step4_give,
  step_1_base,
  party_charity,
  step_2_base,
  step_3_base,
  step_4_base,
} from "../../assets/img";
import Charity from "../../assets/img/charity.svg";
import Play from "../../assets/img/play.svg";
import { useGetLoginInfo } from '@elrondnetwork/dapp-core/hooks';
import {
  AdvanceCard,
  BasicCard,
  HomeCarousel,
  GradientBtn,
  Ocassion,
  Overlay,
  WalletConnect,
} from "../../components";
import styles from "./HomePage.module.scss";

import IMGBIM from "../../assets/img/cover_mobile.png";

import { useGetPendingTransactions } from '@elrondnetwork/dapp-core/hooks/transactions/useGetPendingTransactions';
import { useGetNetworkConfig } from '@elrondnetwork/dapp-core/hooks/useGetNetworkConfig';
import { BytesValue } from "@elrondnetwork/erdjs";

import { ContractContext } from "../../ContextWrapper";

import { convertWeiToEgld } from "../../utils/convert";

import { TIMEOUT } from "../../utils/const";

import { sendQuery } from "../../utils/transaction";
import { ProxyNetworkProvider } from "@elrondnetwork/erdjs-network-providers/out";

const HomePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const { isLoggedIn } = useGetLoginInfo();

  const [uniqueId, setUniqueId] = useState("");
  const btnClick = () => {
    if (isLoggedIn) {
      const unique_id = uuid();
      const small_id = unique_id.slice(0, 8);
      setUniqueId(small_id);
      onOpenModal();
    } else {
      setOpenWalletModal(true);
    }
  };

  const onCloseWalletModal = () => setOpenWalletModal(false);
  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

  const { network } = useGetNetworkConfig();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const proxy = new ProxyNetworkProvider("https://gateway.elrond.com");

  const contract = useContext(ContractContext);

  const [projects, setProjects] = useState([]);
  const [projectNumbers, setProjectNumbers] = useState(0);

  useEffect(() => {
    (async () => {
      if (!contract) return;
      const interaction = contract.methods.getProjects();
      const res = await sendQuery(contract, proxy, interaction);
      if (!res || !res.returnCode.isSuccess()) return;
      const value = res.firstValue.valueOf();

      const datas = [];
      value.map((item) => {
        let description = item.project_description
          .toString()
          .replace(/<[^>]+>/g, "");
        if (description.length > 50) {
          description = description.substr(0, 50);
        }

        const data = {
          projectId: item.project_id.toNumber(),
          projectUniqueId: item.project_unique_id.toString(),
          projectName: item.project_name.toString(),
          projectCategory: item.project_category.toString(),
          projectPhoto: item.project_photo.toString(),
          projectDescription: description,
          projectOwnerName: item.project_owner_name.toString(),
          projectOnwerAddress: item.project_owner_address.toString(),
          projectEventDate: item.project_event_date.toString(),
          projectDeadline: item.project_deadline.toString(),
          projectGoal: convertWeiToEgld(item.project_goal.toNumber(), 6),
          projectParticipationNumber:
            item.project_participation_numbers.toNumber(),
          projectCollectedAmount: convertWeiToEgld(
            item.project_collected_amount.toNumber(),
            6
          ),
          projectStatus: item.project_status,
        };

        if (data.projectStatus) {
          datas.push(data);
        }
      });

      setProjects(datas);

      if (datas.length > projectNumbers) {
        // close create modal when the transaction is done
        onCloseModal();
        if (uniqueId !== "") {
          const existFlag = await checkExistProject();
          if (existFlag) {
            const ids = uniqueId;
            setUniqueId("");
            // navigate(`/p/${ids}`);
            window.location.href = `/p/${ids}`;
          }
        }
      }
      setProjectNumbers(datas.length);
    })();
  }, [contract, hasPendingTransactions]);

  const checkExistProject = async () => {
    if (uniqueId === "") return false;

    if (!contract) return false;

    const args = [BytesValue.fromUTF8(uniqueId)];
    const interaction = contract.methodsExplicit.checkExistProject(args);
    const res = await sendQuery(contract, proxy, interaction);
    if (!res || !res.returnCode.isSuccess()) return false;
    const value = res.firstValue.valueOf();

    return value;
  };

  const { t, i18n } = useTranslation();
  return (
    <div className="home">
      <main>
        {/* HERO SECTION */}
        <section className={[styles.hero_section, styles.mobile].join(" ")}>
          <div className={styles.hero_section_content}>
            <div className={styles.card_wrapper}>
              <BasicCard>
                <span className="mb-2">
                  <button className={styles.button_create} onClick={btnClick}>
                    {t("homepage.create_button")}
                  </button>
                </span>
              </BasicCard>
            </div>
          </div>
        </section>
        <img className={styles.imgbim} src={IMGBIM} />

        <section className={[styles.hero_section, styles.desktop].join(" ")}>
          <div className={styles.hero_section_content}>
            <div className={styles.hero_section_left}>
              <div className={styles.card_wrapper}>
                <BasicCard>
                  <div className={styles.gradient_btn_wrapper}>
                    <span className="mb-2">
                      <button
                        className={styles.button_create}
                        onClick={btnClick}
                      >
                        {t("homepage.create_button")}
                      </button>
                    </span>
                  </div>
                </BasicCard>
              </div>
            </div>
          </div>
        </section>
        {/* HERO SECTION END */}

        {/* About Section Begins */}
        <section className={[styles.main_about, styles.mobile].join(" ")}>
          <h2 className={styles.main_head}>{t("homepage.about_us.title")}</h2>
          <p className={styles.main_text}>
            {t("homepage.about_us.description")}
          </p>

          <div className={styles.main_btn}>
            <Link to={routeNames.howitwork}>
              <GradientBtn text={t("homepage.about_us.button")} />
            </Link>
          </div>
        </section>

        <section className={[styles.main_about, styles.desktop].join(" ")}>
          <div className={styles.main_about_left}>
            <div className={styles.main_about_left_content}>
              <h2 className={styles.main_head}>
                {t("homepage.about_us.title")}
              </h2>
              <p className={styles.main_text}>
                {t("homepage.about_us.description")}
              </p>

              <div className={styles.main_btn_wrapper}>
                <Link to={routeNames.howitwork}>
                  <GradientBtn text={t("homepage.about_us.button")} />
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* About Section Ends */}

        {/* Popular Projects Begin */}
        <section className={[styles.main_carousel, styles.desktop].join(" ")}>
          <h2 className={styles.carousel_head}>
            {t("homepage.popular_projects.title")}
          </h2>
          <div className="container">
            <div className="row">
              <HomeCarousel />
            </div>
          </div>
        </section>

        {/* Popular Projects End */}

        {/* How Section Begins*/}
        <section className={[styles.how_section, styles.mobile].join(" ")}>
          <div className={styles.how_section_content}>
            <div className={styles.how_section_heading}>
              <span>{t("homepage.how_it_work.title")}</span>
            </div>
            <div className={styles.how_steps_wrapper}>
              <div className={styles.how_step1}>
                <div className={styles.how_step_bg}>
                  <img src={how_1_mobile} alt="step1" />
                  <div className={styles.step_content}>
                    <img
                      src={step1_notebook}
                      className={styles.step_illustration}
                      alt="create"
                    />
                    <span className={styles.step_title}>
                      {t("homepage.how_it_work.step1.title")}
                    </span>
                    <span>{t("homepage.how_it_work.step1.description")}</span>
                  </div>
                </div>
              </div>
              <div className={styles.how_step2}>
                <div className={styles.how_step_bg}>
                  <img src={how_2_mobile} alt="step2" />
                  <div className={styles.step_content}>
                    <img
                      src={step2_share}
                      className={styles.step_illustration}
                      alt="share"
                    />
                    <span className={styles.step_title}>
                      {t("homepage.how_it_work.step2.title")}
                    </span>
                    <span>{t("homepage.how_it_work.step2.description")}</span>
                  </div>
                </div>
              </div>
              <div className={styles.how_step3}>
                <div className={styles.how_step_bg}>
                  <img src={how_3_mobile} alt="step3" />
                  <div className={styles.step_content}>
                    <img
                      src={step3_collect}
                      className={styles.step_illustration}
                      alt="collect"
                    />
                    <span className={styles.step_title}>
                      {t("homepage.how_it_work.step3.title")}
                    </span>
                    <span>{t("homepage.how_it_work.step3.description")}</span>
                  </div>
                </div>
              </div>
              <div className={styles.how_step4}>
                <div className={styles.how_step_bg}>
                  <div className={styles.step_content}>
                    <img
                      src={step4_give}
                      className={styles.step_illustration}
                      alt="step4"
                    />
                    <span className={styles.step_title}>
                      {t("homepage.how_it_work.step4.title")}
                    </span>
                    <span className={styles.give_text}>
                      {t("homepage.how_it_work.step4.description")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* DESKTOP HOW SECTION */}
        <section className={[styles.how_section, styles.desktop].join(" ")}>
          <span className={styles.hero_section_head}>
            {t("homepage.how_it_work.title")}
          </span>

          <div className={styles.steps_wrap}>
            <div className={styles.step_1}>
              <img src={step_1_base} alt="step_1_base" />
              <div className={styles.step_1_content_wrap}>
                <div className={styles.step_illustration}>
                  <img src={step1_notebook} alt="notebook" />
                </div>
                <span className={styles.step_head}>
                  {t("homepage.how_it_work.step1.title")}
                </span>
                <p para="p-one" className={styles.step_info}>
                  {t("homepage.how_it_work.step1.description")}
                </p>
              </div>
            </div>
            <div className={styles.step_2}>
              <img src={step_2_base} alt="step_2_base" />
              <div className={styles.step_2_content_wrap}>
                <div className={styles.step_illustration}>
                  <img src={step2_share} alt="share" />
                </div>
                <span className={styles.step_head}>
                  {t("homepage.how_it_work.step2.title")}
                </span>
                <p para="p-two" className={styles.step_info}>
                  {t("homepage.how_it_work.step2.description")}
                </p>
              </div>
            </div>
            <div className={styles.step_3}>
              <img src={step_3_base} alt="step_3_base" />
              <div className={styles.step_3_content_wrap}>
                <div className={styles.step_illustration}>
                  <img src={step3_collect} alt="collect" />
                </div>
                <span className={styles.step_head}>
                  {t("homepage.how_it_work.step3.title")}
                </span>
                <p para="p-three" className={styles.step_info}>
                  {t("homepage.how_it_work.step3.description")}
                </p>
              </div>
            </div>
            <div className={styles.step_4}>
              <img src={step_4_base} alt="step_4_base" />
              <div className={styles.step_4_content_wrap}>
                <div className={styles.step_illustration}>
                  <img src={step4_give} alt="give" />
                </div>
                <span className={styles.step_head}>
                  {t("homepage.how_it_work.step4.title")}
                </span>
                <p para="p-four" className={styles.step_info}>
                  {t("homepage.how_it_work.step4.description")}
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* How Section ends */}

        {/* Curved Image Section */}

        <section className={styles.main_advance_cards}>
          <img src={party_charity} className={styles.hidden_img} />
          <div className={styles.card_wrap_div}>
            <div className={styles.advance_card_container}>
              <AdvanceCard
                id={1}
                btn="party"
                title={t("homepage.personnal_project.title")}
                img={Play}
                description_first={t("homepage.personnal_project.description")}
              />
            </div>
            <div
              className={[styles.advance_card_container, styles.right].join(
                " "
              )}
            >
              <AdvanceCard
                id={2}
                btn="charity"
                title={t("homepage.charitable_project.title")}
                img={Charity}
                card_direction="right"
                description_first={t("homepage.charitable_project.description")}
              />
            </div>
          </div>
        </section>
        {/* Curved Image SEction Ends */}

        <section className={styles.main_ocassion}>
          <Ocassion />
        </section>
      </main>
      <Modal
        classNames={{ root: "modal_root", modal: "vital_modal" }}
        open={openModal}
        onClose={onCloseModal}
        center
      >
        <Overlay uniqueId={uniqueId}></Overlay>
        <div className={styles.modal_content}></div>
      </Modal>
      <Modal
        classNames={{ root: "modal_root", modal: "vital_modal" }}
        open={openWalletModal}
        onClose={onCloseWalletModal}
        center
      >
        <WalletConnect />
      </Modal>
    </div>
  );
};

export default HomePage;
