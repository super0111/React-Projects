import React, { useState, useEffect, useContext } from "react";
import { useGetPendingTransactions } from '@elrondnetwork/dapp-core/hooks/transactions/useGetPendingTransactions';
import { useGetNetworkConfig } from '@elrondnetwork/dapp-core/hooks/useGetNetworkConfig';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import { Interaction, QueryResponseBundle, GasLimit, ContractFunction, U32Value, ArgSerializer, BytesValue } from "@elrondnetwork/erdjs";
import { ProxyNetworkProvider } from "@elrondnetwork/erdjs-network-providers/out";
import parse from "html-react-parser";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useTranslation, Trans } from "react-i18next";
import MetaTags from "react-meta-tags";
import { Modal, Header, Body } from "react-responsive-modal";
import { Route, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FacebookShareButton } from "react-share";
import LoadSpinner from "components/LoadSpinner";
import WHEEL from "../../assets/img/dentee.png";
import { remain, person, money, share, ANNIVERSARY, BIRTHBAPTISM, HOUSEWARMING, OTHERCOMMONGIFTS, RETIREMENTPOT, WEDDING, ANIMALS, ENTREPRENEURSHIP, HUMANITRAIAN, MEDICAL, OTHERPROJECTS, STUDIES, BACHELORPARTY, EVENING, FUNREAL, HOLIDAYS, OTHEREXPENSES, PURCHASEREPAIR } from "../../assets/img/index";
import VERIFIED from "../../assets/img/verified.png";
import GridData from "../../assets/js/GridData";
import { GradientBtn, WalletConnect, SocialShare, ProjectDetailsTab } from "../../components";
import { CONTRACT_ADDRESS, DAPP_URL, PINATA_GETWAY } from "../../config";
import { ContractContext } from "../../ContextWrapper";
import { TIMEOUT } from "../../utils/const";
import { convertWeiToEgld, convertTimestampToDate } from "../../utils/convert";
import { sendQuery } from "../../utils/transaction";
import ChangeOwner from "./ChangeOwner/ChangeOwner";
import DeleteProject from "./DeleteProject/DeleteProject";
import Harvest from "./Harvest/Harvest";
import Participation from "./Participation/Participation";
import styles from "./ProjectDetails.module.scss";
import ProjectSettings from "./ProjectSettings";
import { Link } from "react-router-dom";
import routes, { routeNames } from "routes";

export default function ProjectDetails() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [copyText, setCopyText] = useState(`${t("project_detail.copy")}`);
  const [openParticipationModal, setParticipationModal] = useState(false);
  const [openChangeOwnerModal, setChangeOwnerModal] = useState(false);
  const [openSocialShareModal, setSocialShareModal] = useState(false);
  const [openHarvestModal, setHarvestModal] = useState(false);
  const [openDeleteModal, setDeleteModal] = useState(false);

  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);
  const onParticipationCloseModal = () => setParticipationModal(false);
  const onChangeOwnerCloseModal = () => setChangeOwnerModal(false);
  const onCloseSocialShareModal = () => setSocialShareModal(false);
  const onCloseHarvestModal = () => setHarvestModal(false);
  const onCloseDeleteModal = () => setDeleteModal(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleChangeOwner = () => {
    if (isLoggedIn) {
      setChangeOwnerModal(true);
    } else {
      setOpenWalletModal(true);
    }
  };

  const openSetting = () => {
    onOpenModal();
  };
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const onCloseWalletModal = () => setOpenWalletModal(false);
  const shareSocialNetwork = () => setSocialShareModal(true);

  const location = useLocation();
  const { network } = useGetNetworkConfig();

  const { address, account } = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const proxy = new ProxyNetworkProvider("https://gateway.elrond.com", {
    timeout: TIMEOUT,
  });

  const isLoggedIn = Boolean(address);

  useEffect(() => {
    if (isLoggedIn) {
      onParticipationCloseModal();
      onCloseModal();
      onChangeOwnerCloseModal();
    }
  }, [account.balance]);

  const contract = useContext(ContractContext);

  const [link, setLink] = useState(DAPP_URL);
  const [projectUnqiueId, setProjectUnqiueId] = useState("");
  console.log('ProjectUniqueID: ', projectUnqiueId);
  const lastPath = window.location.pathname;
  const shareURL = DAPP_URL + lastPath;

  useEffect(() => {
    (async () => {
      const pathname = location.pathname;
      setLink(DAPP_URL + pathname);

      const project_unique_id = pathname.substring(pathname.lastIndexOf("/") + 1);
      setProjectUnqiueId(project_unique_id);

      if (project_unique_id == "") return;

      // if (!contract) return;

      // const args = [BytesValue.fromUTF8(project_unique_id)];
      // const interaction = contract.methodsExplicit.checkExistProject(args);
      // const res = await sendQuery(contract, proxy, interaction);
      // if (!res || !res.returnCode.isSuccess()) return;

      // const value = res.firstValue.valueOf();

      // if (!value) {
      //   navigate("/");
      // }
    })();
  }, []);

  const [percentageClassName, setPercentageClassName] = useState(styles.w0);
  const [project, setProject] = useState({
    projectId: 0,
    projectUniqueId: "",
    projectName: "",
    projectCategory: "",
    projectPhoto: "",
    projectDescription: "",
    projectOwnerName: "",
    projectOnwerAddress: "",
    projectGoal: 0,
    projectParticipationNumber: 0,
    projectCollectedAmount: 0,
    projectStatus: true,
    projectRemainsAmount: 0,
    projectVerified: false,
  });
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      if (!contract || !projectUnqiueId) return;
      const args = [BytesValue.fromUTF8(projectUnqiueId)];
      const interaction = contract.methodsExplicit.getProjectByUniqueId(args);
      const res = await sendQuery(contract, proxy, interaction);
      if (!res || !res.returnCode.isSuccess()) return;
      const value = res.firstValue.valueOf();

      const data = {
        projectId: value.project_id.toNumber(),
        projectUniqueId: value.project_unique_id.toString(),
        projectName: value.project_name.toString(),
        projectCategory: value.project_category.toString(),
        projectPhoto: value.project_photo.toString(),
        projectDescription: value.project_description.toString(),
        projectOwnerName: value.project_owner_name.toString(),
        projectOnwerAddress: value.project_owner_address.toString(),
        projectEventDate: value.project_event_date.toString(),
        projectDeadline: value.project_deadline.toString(),
        projectGoal: convertWeiToEgld(value.project_goal.toNumber(), 6),
        projectParticipationNumber: value.project_participation_numbers.toNumber(),
        projectCollectedAmount: convertWeiToEgld(value.project_collected_amount.toNumber(), 6),
        projectRemainsAmount: convertWeiToEgld(value.project_remains_amount.toNumber(), 6),
        projectStatus: value.project_status,
        projectVerified: value.project_verified,
      };
      console.log(data);

      // if (!data.projectStatus) {
      //   navigate("/");
      // }

      setProject(data);
      const pro = (data.projectCollectedAmount / data.projectGoal).toFixed(1) * 100;

      let pro_class = styles.w0;
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

      if (data.projectCollectedAmount > data.projectGoal) {
        pro_class = styles.w100;
      }

      setPercentageClassName(pro_class);
      setIsLoading(false);
    })();
  }, [contract, projectUnqiueId, hasPendingTransactions]);

  // const [userAddress, setUserAddress] = useState({
  //   address: '',
  //   amount: 0,
  //   name: '',
  // });

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       if (!contract || project.projectId < 1) return;

  //       const args = [new U32Value(project.projectId)];
  //       const interaction = contract.methods.getParticipateAddresses(args);
  //       const res = await sendQuery(contract, proxy, interaction);
  //       if (!res || !res.returnCode.isSuccess()) return;
  //       const value = res.firstValue.valueOf();

  //       const datas = [];
  //       value.map((item) => {
  //         const data = {
  //           address: item.address.toString(),
  //           amount: convertWeiToEgld(item.amount.toNumber(), 6),
  //           name: item.name.toString(),
  //         };
  //         datas.push(data);
  //       });
  //       setUserAddress(datas);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   })();
  // }, [contract, hasPendingTransactions]);

  const [categoryLists, setCategoryLists] = useState([]);
  useEffect(() => {
    let categorys = {};
    GridData.map((i) => {
      i.items.map((item) => {
        categorys[item.title] = item.img;
      });
    });
    setCategoryLists(categorys);
  }, []);

  let CoverImage = OTHERCOMMONGIFTS;
  switch (project.projectCategory) {
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

  const openParticipation = () => {
    if (isLoggedIn) {
      if (project.projectStatus) {
        setParticipationModal(true);
      }
    } else {
      setOpenWalletModal(true);
    }
  };


  return (
    <div className={styles.projectDetails}>
      {/* <MetaTags>
        <meta property="og:image" content={project.projectPhoto === "" ? CoverImage: PINATA_GETWAY + project.projectPhoto} />
      </MetaTags> */}
      <div className="container-fluid">
        {isLoading ? (
          <LoadSpinner />
        ) : (
          <div className={styles.project_details_card}>
            <>
              {project.projectPhoto === "" ? (
                <section className={styles.img_wrap}>
                  <img src={CoverImage} alt="Cover image" />
                </section>
              ) : (
                <section className={styles.img_wrap}>
                  <img src={PINATA_GETWAY + project.projectPhoto} alt="Cover image" />
                </section>
              )}
              <section className={styles.target_amount}>
                <div className={styles.project_title_inbox}>
                  <h2 style={{ fontWeight: 'bold' }}>
                    {project.projectName}
                  </h2>
                </div>

                <div className={`${styles.main_detail} row`}>
                  {project.projectPhoto === "" ? (
                    <img className={`${styles.center_cropped} col-sm-4 col-md-5 col-lg-7 `} src={CoverImage} alt="Cover image" />
                  ) : (
                    <img className={`${styles.center_cropped} col-sm-4 col-md-5 col-lg-7 `} src={PINATA_GETWAY + project.projectPhoto} alt="Cover image" />
                  )}

                  <div className={`${styles.collect_info} col-sm-8 col-md-7 col-lg-5`}>
                    <div className={styles.money_raised}>
                      <img src={money} alt="money" style={{ width: '50px' }} />
                      <div>
                        <h2 style={{ margin: '0', paddingLeft: '10px', lineHeight: '1em' }}>
                          ${project.projectCollectedAmount.toLocaleString(localStorage.getItem("i18nextLng"))}
                        </h2>
                        {/* <br/> */}
                        <span style={{ paddingLeft: '10px', fontSize: '.8em' }}>{t("project_detail.goal_amount")}${project.projectGoal.toLocaleString(localStorage.getItem("i18nextLng"))}</span>
                      </div>
                    </div>
                    <div className={`${styles.collected_properties} row`}>
                      <div className={`${styles.contributed_info} col-6`} >
                        <div>
                          <img src={person} alt="person" style={{ width: '50px' }} />
                        </div>
                        <div>
                          <h2 style={{ margin: '0', paddingLeft: '10px', lineHeight: '1em' }}>
                            {project.projectParticipationNumber}
                          </h2>
                          {/* <br/> */}
                          <span style={{ paddingLeft: '10px', fontSize: '.8em' }}>{t("project_detail.contributors")}</span>
                        </div>
                      </div>
                      <div className={`${styles.remained_info} col-6`} >
                        <div>
                          <img src={remain} alt="remain" style={{ width: '50px' }}/>
                        </div>
                        <div>
                          <h2 style={{ margin: '0', paddingLeft: '10px', lineHeight: '1em' }}>
                            {project.projectGoal}
                          </h2>
                          {/* <br/> */}
                          <span style={{ paddingLeft: '10px', fontSize: '.8em' }}>{t("project_detail.remaining")}</span>
                        </div>
                      </div>
                      {/* </div> */}
                    </div>
                    {project.projectStatus ? (
                      <>
                      <button
                      type="button"
                      className={styles.share_btn_collect}
                      // className={style ? style : styles.gradient_btn}
                      onClick={shareSocialNetwork}
                    >
                      {t("project_detail.share")}
                    </button>
                    <button
                      className={styles.participate_btn_collect}
                      type="button"
                      onClick={openParticipation}
                    >
                      <strong>{t("project_detail.participate_button")}</strong><br />
                      {t("project_detail.fromonedollar")}
                    </button>
                      </>
                    ) : (
                      <>
                      <p style={{ textAlign: 'center', marginTop: '3em' }}>
                        <strong>MONEY POT CLOSED</strong><br/>
                        Funds have been successfully withdrawn
                      </p>
                      <Link to={routeNames.projects}>
                        <button
                          className={styles.participate_btn_collect}
                          type="button"
                        >
                          DISCOVER ALL PROJECTS
                        </button>
                      </Link>
                      </>
                      
                    )}
                  </div>

                </div>


                <div className={styles.organizer}>
                  <span style={{ fontWeight: 'bold' }}>{t("project_detail.organizer")}&emsp;</span>
                  <span>{project.projectOnwerAddress}</span>
                </div>

                {/* <div className={styles.target_desktop}>
                  <h1>
                    {project.projectName}
                    {project.projectVerified && (
                      <OverlayTrigger
                        key="top"
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-top">
                            <div className="text-justify">{t("project_detail.verified_tooltip")}</div>
                          </Tooltip>
                        }
                      >
                        <img src={VERIFIED} className={styles.verified_img_title} />
                      </OverlayTrigger>
                    )}
                  </h1>
                  <div className={styles.amount_title}>
                    <span className={styles.left}>${project.projectCollectedAmount.toLocaleString(localStorage.getItem("i18nextLng"))}</span>
                    <span className={styles.right}>
                      {t("project_detail.collected_content")} ${project.projectGoal.toLocaleString(localStorage.getItem("i18nextLng"))}
                    </span>
                    {project.projectVerified && (
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
                  </div>
                  <div className={styles.amount_wrap}>
                    <div className={[styles.raised_amount, percentageClassName].join(" ")}></div>
                  </div>
                </div>
                <div className={styles.copy_wrapper}>
                  {project.projectParticipationNumber} {t("project_detail.participants_content")}
                </div>
                <GradientBtn text={project.projectStatus ? t("project_detail.participate_button") : t("project_detail.closed")} clickAction={openParticipation} /> */}
              </section>
            </>
            <section className={styles.participate}>
              <div className={styles.content}>
                <span className={styles.content_head}>
                  {project.projectName}
                  {project.projectVerified && (
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-top">
                          <div className="text-justify">{t("project_detail.verified_tooltip")}</div>
                        </Tooltip>
                      }
                    >
                      <img src={VERIFIED} className={styles.verified_img_title} />
                    </OverlayTrigger>
                  )}
                </span>
                <div className={styles.content_details}>
                  <div className={styles.properties}>
                    {/* <span className={styles.left}>{t("project_detail.amount_raised")}</span> */}
                    <div className={styles.right}>
                      <div>
                        <img src={money} alt="money" style={{ width: '2rem', height: '2rem' }} />
                      </div>
                      <div className={styles.rightspan}>
                        <h5 style={{ margin: '0', paddingLeft: '10px' }}>
                          ${project.projectCollectedAmount.toLocaleString(localStorage.getItem("i18nextLng"))}
                        </h5>
                        {/* <br/> */}
                        <span >{t("project_detail.goal_amount")}${project.projectGoal.toLocaleString(localStorage.getItem("i18nextLng"))}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.properties} row`}>
                    {/* <span className={styles.left}>{t("project_detail.participants")}</span> */}
                    {/* <div className={styles.right}> */}
                    <div className={`${styles.right} ${styles.col} col-5`}>
                      <div>
                        <img src={person} alt="person" style={{ width: '2rem', height: '2rem' }} />
                      </div>
                      <div className={styles.rightspan}>
                        <h5 style={{ margin: '0', paddingLeft: '10px' }}>
                          {project.projectParticipationNumber}
                        </h5>
                        {/* <br/> */}
                        <span>{t("project_detail.contributors")}</span>
                      </div>
                    </div>
                    <div className={`${styles.right} col-7`}>
                      <div>
                        <img src={remain} alt="remain" style={{ width: '2rem', height: '2rem' }} />
                      </div>
                      <div className={styles.rightspan}>
                        <h5 style={{ margin: '0', paddingLeft: '10px' }}>
                          {project.projectRemainsAmount}
                        </h5>
                        {/* <br/> */}
                        <span>{t("project_detail.remaining")}</span>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                  <div className={styles.MobileDisplayNone}>
                    {project.projectStatus ? (
                        <>
                        <button
                        type="button"
                        className={styles.share_btn_collect}
                        // className={style ? style : styles.gradient_btn}
                        onClick={shareSocialNetwork}
                      >
                        {t("project_detail.share")}
                      </button>
                      <button
                        className={styles.participate_btn_collect}
                        type="button"
                        onClick={openParticipation}
                      >
                        <strong>{t("project_detail.participate_button")}</strong><br />
                        {t("project_detail.fromonedollar")}
                      </button>
                        </>
                      ) : (
                        <>
                        <p style={{ textAlign: 'center', marginTop: '1em' }}>
                          <strong>MONEY POT CLOSED</strong><br/>
                          Funds have been successfully withdrawn
                        </p>
                        <Link to={routeNames.projects}>
                          <button
                            className={styles.participate_btn_collect}
                            type="button"
                          >
                            DISCOVER ALL PROJECTS
                          </button>
                        </Link>
                        </>
                        
                      )}
                    </div>
                  {isLoggedIn && address === project.projectOnwerAddress ? (
                    <div className={styles.btn}>
                      <Dropdown>
                        <Dropdown.Toggle bsPrefix="hot" id="dropdown-basic">
                          <img src={WHEEL} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={openSetting}>{t("project_detail.setting_button2")}</Dropdown.Item>
                          <Dropdown.Item onClick={handleChangeOwner}>{t("project_detail.offer_button")}</Dropdown.Item>
                          {project.projectRemainsAmount > 0 && <Dropdown.Item onClick={() => setHarvestModal(true)}>{t("project_detail.harvest_button")}</Dropdown.Item>}
                          {!project.projectRemainsAmount && <Dropdown.Item onClick={() => setDeleteModal(true)}>{t("project_detail.delete")}</Dropdown.Item>}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  ) : (
                    <></>
                  )}
                  {/* ************************************* */}
                </div>
              </div>
            </section>


            <ProjectDetailsTab styles={styles} datas={project} participation={openParticipation} />
            {/* <section className={styles.organizer_wrapper_mobile}>
              <div className={styles.category}>
                <span className={styles.left}>{t("project_detail.p_category")}:</span>
                <span className={styles.right}>{project.projectCategory == "" ? "No category" : project.projectCategory}</span>
              </div>
              <span className={styles.label}>{t("project_detail.organizer")}</span>
              <span className={styles.value}>{project.projectOnwerAddress}</span>
            </section> */}
          </div>
        )}
        <Modal classNames={{ root: "modal_root", modal: "vital_modal" }} open={openModal} onClose={onCloseModal} center>
          <ProjectSettings projectId={project.projectId} coverImage={CoverImage} />
          <div className={styles.modal_content}></div>
        </Modal>
        <Modal size="sm" open={openParticipationModal} onClose={onParticipationCloseModal} center>
          <Participation projectId={project.projectId} />
        </Modal>
        <Modal size="sm" open={openChangeOwnerModal} onClose={onChangeOwnerCloseModal} center>
          <ChangeOwner projectId={project.projectId} />
        </Modal>
        <Modal classNames={{ root: "modal_root", modal: "vital_modal" }} open={openWalletModal} onClose={onCloseWalletModal} center>
          <WalletConnect />
        </Modal>
        <Modal size="sm" open={openSocialShareModal} onClose={onCloseSocialShareModal} dappUrl={link} center>
          <SocialShare />
        </Modal>

        <Modal size="sm" open={openHarvestModal} onClose={onCloseHarvestModal} center>
          <Harvest projectDatas={project} onClose={onCloseHarvestModal} />
        </Modal>
        <Modal size="sm" open={openDeleteModal} onClose={onCloseDeleteModal} center>
          <DeleteProject projectDatas={project} onClose={onCloseDeleteModal} />
        </Modal>
        <MetaTags>
          <title>{t("cagnotte") + " - " + project.projectName}</title>
          <meta name="description" content={project.projectDescription.slice(0, 150)} />
          <meta property="og:title" content={t("cagnotte") + " - " + project.projectName} />
          <meta property="og:image" content={project.projectPhoto === "" ? CoverImage : PINATA_GETWAY + project.projectPhoto} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="https://vital-dapp.com" />
          <meta name="twitter:creator" content="@VitalNetworkDAO" />
          <meta name="twitter:title" content={t("cagnotte") + " - " + project.projectName} />
          <meta name="twitter:url" content={shareURL} />
          <meta name="twitter:description" content={project.projectDescription.slice(0, 150)} />
          <meta name="twitter:image" content={project.projectPhoto === "" ? CoverImage : PINATA_GETWAY + project.projectPhoto} />
        </MetaTags>
      </div>
    </div>
  );
}
