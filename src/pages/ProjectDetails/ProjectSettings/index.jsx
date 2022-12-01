/* eslint @typescript-eslint/no-var-requires: "off" */
import React, { useState, useEffect, useContext, useRef } from "react";
import { convertFromHTML, EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
import GradientBtn from "components/Buttons/GradientButton/GradientBtn";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import '@mobiscroll/react/dist/css/mobiscroll.min.css';
// import { Select, setOptions } from '@mobiscroll/react';
import { components } from "react-select";
import GridData from "../../../assets/js/GridData";
import LoadSpinner from "components/LoadSpinner";
import styles from "./ProjectSettings.module.scss";
import { useTranslation, Trans } from "react-i18next";
import BigNumber from "bignumber.js/bignumber.js";
import FormData from "form-data";
import axios from "axios";
import { sendTransactions } from '@elrondnetwork/dapp-core/services';
import { refreshAccount } from '@elrondnetwork/dapp-core/utils';
import { useGetPendingTransactions } from '@elrondnetwork/dapp-core/hooks/transactions/useGetPendingTransactions';
import { useGetNetworkConfig } from '@elrondnetwork/dapp-core/hooks/useGetNetworkConfig';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import { U32Value, ArgSerializer, BigUIntValue, BytesValue, TransactionPayload } from "@elrondnetwork/erdjs";

import { ContractContext } from "../../../ContextWrapper";

import { convertWeiToEgld } from "../../../utils/convert";

import { TIMEOUT } from "../../../utils/const";

import { sendQuery } from "../../../utils/transaction";

import { CONTRACT_ADDRESS, REACT_APP_API_KEY, REACT_APP_API_SECRET, PINATA_URL, PINATA_GETWAY } from "../../../config";

import UploadImage from "../../../assets/img/upload.png";
import { ProxyNetworkProvider } from "@elrondnetwork/erdjs-network-providers/out";

// setOptions({
//   theme: 'ios',
//   themeVariant: 'light'
// });

const { Option } = components;
const IconOption = (props) => (
  <Option {...props}>
    <img src={require("../../../assets/img/category_static/" + props.data.img + ".png").default} style={{ width: 30, "padding-right": "10px" }} alt={props.data.label} />
    {props.data.label}
  </Option>
);

export default function ProjectSettings(props) {
  const { t, i18n } = useTranslation();
  const [activeAction, setActiveAction] = React.useState("General");

  const { network } = useGetNetworkConfig();

  const { address } = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const proxy = new ProxyNetworkProvider("https://gateway.elrond.com", {
    timeout: TIMEOUT,
  });

  const isLoggedIn = Boolean(address);
  const [isLoading, setIsLoading] = useState(false);

  const contract = useContext(ContractContext);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [projectName, setProjectName] = useState("");
  const [projectPhoto, setProjectPhoto] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [projectCategoryIndex, setProjectCategoryIndex] = useState(0);
  const [projectDescription, setProjectDescription] = useState("");
  const [projectEventDate, setProjectEventDate] = useState(Date.now());
  const [projectDeadline, setProjectDeadline] = useState(Date.now());
  const [projectGoal, setProjectGoal] = useState(0);

  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const list = [];
    GridData.map((i) => {
      i.items.map((item) => {
        list.push({
          label: item.title,
          value: item.key,
          img: item.img,
        });
      });
    });
    setCategoryList(list);
  }, []);

  // const [project, setProject] = useState({
  //   projectId: 0,
  //   projectName: '',
  //   projectCategory: '',
  //   projectPhoto: '',
  //   projectDescription: '',
  //   projectOwnerName: '',
  //   projectOnwerAddress: '',
  //   projectGoal: 0,
  //   projectParticipationNumber: 0,
  //   projectCollectedAmount: 0,
  //   projectStatus: true,
  // });
  useEffect(() => {
    (async () => {
      if (!contract || !props.projectId) return;

      const args = [new U32Value(props.projectId)];
      const interaction = contract.methodsExplicit.getProject(args);
      const res = await sendQuery(contract, proxy, interaction);
      if (!res || !res.returnCode.isSuccess()) return;
      const value = res.firstValue.valueOf();

      const data = {
        projectId: value.project_id.toNumber(),
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
        projectStatus: value.project_status,
      };

      console.log("data: ", data);

      console.log("editorState: ", editorState);

      if (data.projectCategory == "") {
        setProjectCategoryIndex(0);
      } else {
        categoryList.map((item) => {
          if (item.label === data.projectCategory) {
            setProjectCategoryIndex(item.value - 1);
            console.log("index: ", item.value - 1);
          }
        });
      }

      // setProject(data);
      setProjectName(data.projectName);
      setProjectPhoto(data.projectPhoto);
      setProjectCategory(data.projectCategory);
      setProjectDescription(data.projectDescription);

      // var EditorState = Draft.EditorState;
      // var ContentState = Draft.ContentState;
      setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(data.projectDescription))));

      setProjectEventDate(data.projectEventDate);
      setProjectDeadline(data.projectDeadline);
      setProjectGoal(data.projectGoal);
    })();
  }, [contract, props.projectId, hasPendingTransactions]);

  const handelChangeProjectName = (e) => {
    setProjectName(e.target.value);
  };

  const handleChangeProjectCategory = (category) => {
    console.log("category: ", category);
    setProjectCategory(category.label);
  };

  const handleChangeDescription = (editorState) => {
    // console.log('editorState: ', stateToHTML(editorState.getCurrentContent()));
    // const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    // blocks.map((block) => {
    //   console.log(block);
    // });
    // console.log('block: ', blocks.toString());
    // const txt = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    // console.log('txt: ', txt);
    setProjectDescription(stateToHTML(editorState.getCurrentContent()));
    setEditorState(editorState);
  };

  const handleChangeEventDate = (e) => {
    console.log("event", e.target.value);
    setProjectEventDate(e.target.value);
  };

  const handleChangeDeadline = (e) => {
    console.log("deadline", e.target.value);
    setProjectDeadline(e.target.value);
  };

  const handelChangeProjectGoal = (e) => {
    setProjectGoal(e.target.value);
  };

  const inputFile = useRef(null);
  // const [selectedFile, setSelectedFile] = useState();

  const handleChange = (event) => {
    const file = event.target.files[0];
    // setSelectedFile(file);
    handleFile(file);
  };

  const selectFile = () => {
    inputFile.current.click();
  };

  const handleFile = async (fileToHandle) => {
    if (fileToHandle) {
      try {
        console.log("starting");

        setIsLoading(true);

        // if (projectPhoto !== '') {
        //   // remove image
        //   const removeUrl = 'https://api.pinata.cloud/pinning/unpin/' + projectPhoto;
        //   console.log(removeUrl);
        //   const response = await axios.delete(
        //     removeUrl,
        //     {
        //       headers: {
        //         'pinata_api_key': REACT_APP_API_KEY,
        //         'pinata_secret_api_key': REACT_APP_API_SECRET
        //       }
        //     }
        //   );
        //   console.log("remove: ", response);
        // }

        // initialize the form data
        const formData = new FormData();

        // append the file form data to
        // formData.append('file', fs.createReadStream(fileUrl));
        formData.append("file", fileToHandle);

        const API_KEY = REACT_APP_API_KEY;
        const API_SECRET = REACT_APP_API_SECRET;

        // the endpoint needed to upload the file
        const url = PINATA_URL;

        const response = await axios.post(url, formData, {
          maxContentLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
            pinata_api_key: API_KEY,
            pinata_secret_api_key: API_SECRET,
          },
        });

        console.log(response);

        // get the hash
        setProjectPhoto(response.data.IpfsHash);
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }

    setIsLoading(false);
  };

  const handleValidate = async () => {
    console.log(projectName, projectPhoto, projectCategory, projectDescription, projectEventDate, projectDeadline, projectGoal);

    if (props.projectId < 1) return;

    // const projectPhoto = '';
    const amount = new BigNumber(projectGoal).multipliedBy(1000000);

    const args = [new U32Value(props.projectId), BytesValue.fromUTF8(projectName), BytesValue.fromUTF8(projectPhoto), BytesValue.fromUTF8(projectCategory), BytesValue.fromUTF8(projectDescription), BytesValue.fromUTF8(projectEventDate), BytesValue.fromUTF8(projectDeadline), new BigUIntValue(amount)];
    const { argumentsString } = new ArgSerializer().valuesToString(args);

    // const data = 'modifyProject@' + argumentsString + '@' + new Buffer(projectName).toString('hex') + '@' + new Buffer(projectPhoto).toString('hex') + '@' + new Buffer(projectDescription).toString('hex') + '@' + (new ArgSerializer()).valuesToString(new BigUIntValue(Balance.fromString(amount.valueOf()).valueOf()));
    const data = new TransactionPayload(`modifyProject@${argumentsString}`);
    // console.log(data);

    const tx = {
      value: 0,
      receiver: CONTRACT_ADDRESS,
      data: data.toString(),
      gasLimit: 100000000,
    };
    await refreshAccount();
    await sendTransactions({
      transactions: tx,
    });
  };

  return (
    <>
      {isLoading ? (
        <div style={{ height: "300px" }}>
          <LoadSpinner />
        </div>
      ) : (
        <div className={styles.main_wrap}>
          <div className={styles.overlay_head}>
            <span>{t("setting_modal.title")}</span>
          </div>
          <div className={styles.settings_wrapper}>
            <div className={styles.left_side}>
              <div className={styles.action_btn_container}>
                <button className={`${styles.action_btn} ${activeAction === "General" && styles.active}`} onClick={() => setActiveAction("General")}>
                  {t("setting_modal.menu_1")}
                </button>
                <button className={`${styles.action_btn} ${activeAction === "Cover picture" && styles.active}`} onClick={() => setActiveAction("Cover picture")}>
                  {t("setting_modal.cover_picture")}
                </button>
                <button className={`${styles.action_btn} ${activeAction === "Goal" && styles.active}`} onClick={() => setActiveAction("Goal")}>
                  {t("setting_modal.menu_2")}
                </button>
              </div>
            </div>
            {activeAction === "General" ? (
              <div className={styles.right_side}>
                <div className={styles.field_container}>
                  <div className={styles.field_title}>{t("setting_modal.label_name")} </div>
                  <div className={styles.field_input}>
                    <input type="text" value={projectName} onChange={handelChangeProjectName} />
                  </div>
                </div>

                <div className={styles.field_container}>
                  <div className={styles.field_title}>{t("setting_modal.label_description")}</div>
                  <Editor
                    editorState={editorState}
                    toolbarClassName={styles.editorToolbarClassName}
                    wrapperClassName={styles.editorWrapperClassName}
                    editorClassName={styles.editorClassName}
                    defaultEditorState={projectDescription}
                    onEditorStateChange={handleChangeDescription}
                    toolbar={{
                      options: ["inline", 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', "image", "link", "emoji",],
                      inline: {
                        options: ["bold", "italic", "underline"],
                      },
                      blockType: {
                        inDropdown: true,
                        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                      },
                      fontSize: {
                        options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36],
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                      },
                      fontFamily: {
                        options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                      },
                    }}
                  />
                </div>
              </div>
            ) : activeAction === "Goal" ? (
              <div className={styles.right_side}>
                <div className={styles.field_container}>
                  <div className={styles.field_title}>{t("setting_modal.label_goal")}</div>
                  <div className={`${styles.field_input} ${styles.number_input}`}>
                    <span className={styles.currency}>$</span>
                    <input type="text" value={projectGoal ? projectGoal : null} maxLength="7" onChange={handelChangeProjectGoal} />
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.right_side}>
                <div className={styles.field_container}>
                  <div className={styles.field_title}>{t("setting_modal.cover_picture")}</div>
                  <div className={styles.file_upload}>
                    <div>
                      <img src={UploadImage} className={styles.file_upload_image} />
                    </div>
                    <input type="file" id="file" ref={inputFile} style={{ display: "none" }} onChange={handleChange} />
                    <button className={styles.file_upload_button} onClick={selectFile}>
                      {t("setting_modal.select_file")}
                    </button>
                    <p className={styles.file_upload_text}>{t("setting_modal.cover_text1")}</p>
                  </div>
                  {projectPhoto === "" ? (
                    <section className="mt-4">
                      <img src={props.coverImage} alt="Cover image" className={styles.cover_image} />
                    </section>
                  ) : (
                    <section className="mt-4">
                      <img src={PINATA_GETWAY + projectPhoto} alt="Cover image" className={styles.cover_image} />
                    </section>
                  )}
                </div>
              </div>
            )}
            {/* {activeAction === 'General' && <GeneralContent projectName={projectName} handelChangeProjectName={handelChangeProjectName} />}
          {activeAction === 'Goal' && <GoalContent projectGoal={projectGoal} handelChangeProjectGoal={handelChangeProjectGoal}/>} */}
          </div>
          <div className={styles.btn_wrap}>
            <GradientBtn style={styles.GradientBtn} text={t("setting_modal.validate_button")} clickAction={handleValidate} />
          </div>
        </div>
      )}
    </>
  );
}
