/* eslint @typescript-eslint/no-var-requires: "off" */
import React, { useState, useEffect, useContext } from "react";
import { GradientBtn, ProjectCard } from "components/index";
import parse from "html-react-parser";
// import { Select, setOptions } from '@mobiscroll/react';
import { components } from "react-select";
import GridData from "../../assets/js/GridData";
// import ProjectList from '../../assets/js/ProjectList';
import styles from "./index.module.scss";
import { routeNames } from "routes";
import { Link } from "react-router-dom";
import { useGetLoginInfo } from '@elrondnetwork/dapp-core/hooks';
import { useGetPendingTransactions } from '@elrondnetwork/dapp-core/hooks/transactions/useGetPendingTransactions';
import { useGetNetworkConfig } from '@elrondnetwork/dapp-core/hooks/useGetNetworkConfig';
import { Address, AddressValue } from "@elrondnetwork/erdjs";

import { ContractContext } from "../../ContextWrapper";

import { convertWeiToEgld } from "../../utils/convert";

import { TIMEOUT } from "../../utils/const";

import { sendQuery } from "../../utils/transaction";
import { ProxyNetworkProvider } from "@elrondnetwork/erdjs-network-providers/out";

export default function MyMoneyPots() {
  // setOptions({
  //   theme: 'ios',
  //   themeVariant: 'light'
  // });
  // const categoryProps = {
  //   inputStyle: 'box',
  //   labelStyle: 'stacked',
  //   placeholder: 'Select Category'
  // };
  // const typeProps = {
  //   inputStyle: 'box',
  //   labelStyle: 'stacked',
  //   placeholder: 'Select Type'
  // };
  const category_list = [];
  GridData.map((i) => {
    i.items.map((item) => {
      category_list.push({
        label: item.title,
        value: item.key,
        img: item.img,
      });
    });
  });
  const { Option } = components;
  const IconOption = (props) => (
    <Option {...props}>
      <img
        src={
          require("../../assets/img/category_static/" + props.data.img + ".png")
            .default
        }
        style={{ width: 30, "padding-right": "10px" }}
        alt={props.data.label}
      />
      {props.data.label}
    </Option>
  );
  // const renderCustomItem = (item) => {
  //   const img_src = require('../../assets/img/category_static/' +
  //     item.data.img +
  //     '.png').default;
  //   return (
  //     <div className={styles.md_image_text_item}>
  //       <img className={styles.md_image_text_avatar} src={img_src} />
  //       <div className={styles.md_image_text_name}>{item.display}</div>
  //     </div>
  //   );
  // };
  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 100;
  // const offset = currentPage * PER_PAGE;
  // const pageCount = Math.ceil(ProjectList.length / PER_PAGE);

  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const proxy = new ProxyNetworkProvider("https://gateway.elrond.com", {
    timeout: TIMEOUT,
  });

  const contract = useContext(ContractContext);

  const [projects, setProjects] = useState([]);
  const [projectDatas, setProjectDatas] = useState();
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    (async () => {
      if (!contract) return;

      const args = [new AddressValue(new Address(address))];

      const interaction = contract.methodsExplicit.getOwnerProjects(args);
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
    })();
  }, [contract, hasPendingTransactions]);

  useEffect(() => {
    const count = Math.ceil(projects.length / PER_PAGE);
    setPageCount(count);

    const offset = currentPage * PER_PAGE;

    var projectComponent = projects
      .slice(offset, offset + PER_PAGE)
      .map((item) => (
        <ProjectCard
          name={item.projectName}
          category={item.projectCategory}
          key={item.projectId}
          project_id={item.projectId}
          project_unqiue_id={item.projectUniqueId}
          amount={item.projectCollectedAmount}
          goal={item.projectGoal}
          photo={item.projectPhoto}
          description={parse(item.projectDescription)}
          participants={item.projectParticipationNumber}
        />
      ));
    setProjectDatas(projectComponent);
  }, [projects, currentPage]);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };
  return (
    <div className={styles.projects}>
      <div className={styles.projects_wrap}>
        <span className={styles.projects_head}>My money pots</span>
        <div className={styles.projects_wrap_container}>
          <div className={styles.projects_content_wrap}>
            <div className={styles.projects_wrap_container_projects}>
              {projects.length == "0" ? (
                <Link to={routeNames.home}>
                  <GradientBtn text="Create my first money pot" />
                </Link>
              ) : (
                projectDatas
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
