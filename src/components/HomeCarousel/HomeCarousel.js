import React, { useState, useEffect, useContext } from "react";
import { useGetPendingTransactions } from '@elrondnetwork/dapp-core/hooks/transactions/useGetPendingTransactions';
import { useGetNetworkConfig } from '@elrondnetwork/dapp-core/hooks/useGetNetworkConfig';
import { ProxyNetworkProvider } from "@elrondnetwork/erdjs-network-providers/out";
import parse from "html-react-parser";
import Carousel from "react-bootstrap/Carousel";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ProjectCard } from "components/index";
import { ContractContext } from "../../ContextWrapper";
import { TIMEOUT } from "../../utils/const";
import { convertWeiToEgld } from "../../utils/convert";
import { sendQuery } from "../../utils/transaction";
import styles from "./Carousel.module.scss";

export default function HomeCarousel(props) {
  const contract = useContext(ContractContext);
  const [projects, setProjects] = useState([]);
  const [projectDatas, setProjectDatas] = useState();
  const { t, i18n } = useTranslation();
  const { network } = useGetNetworkConfig();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const proxy = new ProxyNetworkProvider("https://gateway.elrond.com", {
    timeout: TIMEOUT,
  });

  useEffect(() => {
    (async () => {
      if (!contract) return;
      const interaction = contract.methods.getProjects();
      const res = await sendQuery(contract, proxy, interaction);
      if (!res || !res.returnCode.isSuccess()) return;
      const value = res.firstValue.valueOf();

      const datas = [];
      value.map((item) => {
        let description = item.project_description.toString().replace(/<[^>]+>/g, "");
        if (description.length > 150) {
          description = description.substr(0, 150);
        }

        let v = "";
        switch (item.project_category.toString()) {
          case "Anniversary":
            v = t("multistep_form.step2_gift.anniversary");
            break;
          case "Wedding":
            v = t("multistep_form.step2_gift.wedding");
            break;
          case "Retirement pot":
            v = t("multistep_form.step2_gift.retirement");
            break;
          case "House-warming":
            v = t("multistep_form.step2_gift.house");
            break;
          case "Birth/Baptism":
            v = t("multistep_form.step2_gift.birth");
            break;
          case "Other common gift":
            v = t("multistep_form.step2_gift.other");
            break;
          case "Medical":
            v = t("multistep_form.step2_solidarity.medical");
            break;
          case "Animals":
            v = t("multistep_form.step2_solidarity.animals");
            break;
          case "Humanitarian":
            v = t("multistep_form.step2_solidarity.humanitarian");
            break;
          case "Studies":
            v = t("multistep_form.step2_solidarity.studies");
            break;
          case "Entrepreneurship":
            v = t("multistep_form.step2_solidarity.entrepreneurship");
            break;
          case "Other project":
            v = t("multistep_form.step2_solidarity.other");
            break;
          case "Evening":
            v = t("multistep_form.step2_expense.evening");
            break;
          case "Holidays":
            v = t("multistep_form.step2_expense.holidays");
            break;
          case "Funeral":
            v = t("multistep_form.step2_expense.funeral");
            break;
          case "Bachelor party":
            v = t("multistep_form.step2_expense.party");
            break;
          case "Purchase/Repair":
            v = t("multistep_form.step2_expense.purchase");
            break;
          case "Other expense":
            v = t("multistep_form.step2_expense.other");
            break;
          default:
        }

        const data = {
          projectId: item.project_id.toNumber(),
          projectUniqueId: item.project_unique_id.toString(),
          projectName: item.project_name.toString(),
          projectCategory: v,
          projectPhoto: item.project_photo.toString(),
          projectDescription: description,
          projectOwnerName: item.project_owner_name.toString(),
          projectOnwerAddress: item.project_owner_address.toString(),
          projectEventDate: item.project_event_date.toString(),
          projectDeadline: item.project_deadline.toString(),
          projectGoal: convertWeiToEgld(item.project_goal.toNumber(), 6),
          projectParticipationNumber: item.project_participation_numbers.toNumber(),
          projectCollectedAmount: convertWeiToEgld(item.project_collected_amount.toNumber(), 6),
          projectStatus: item.project_status,
          projectVerified: item.project_verified,
        };

        if (data.projectStatus) {
          datas.push(data);
        }
      });

      setProjects(datas);
    })();
  }, [contract, hasPendingTransactions]);

  const regex = /(<([^>]+)>)/gi;
  const regex1 = "&nbsp;";

  const transformTxt = t("project_detail.about.content").replace(regex, "");
  const transformTxt1 = transformTxt.replace(regex1, "").slice(0, 80) + "...";

  useEffect(() => {
    const projectComponent = projects.map((item) => (
      <div key={item.projectId} className="col-12 col-md-6 col-sm-6 col-lg-4">
        <ProjectCard name={item.projectName} category={item.projectCategory} key={item.projectId} project_id={item.projectId} project_unqiue_id={item.projectUniqueId} amount={item.projectCollectedAmount} goal={item.projectGoal} photo={item.projectPhoto} description={item.projectDescription ? parse(item.projectDescription).replace(regex1, "").slice(0, 70) + "..." : transformTxt1} participants={item.projectParticipationNumber} verifiedStatus={item.projectVerified} />
      </div>
    ));

    const sortedComponent = projectComponent.sort((a, b) => {
      if (a.props.children.props.participants < b.props.children.props.participants) {
        return 1;
      }
      if (a.props.children.props.participants > b.props.children.props.participants) {
        return -1;
      }

      // they are equal
      return 0;
    });

    setProjectDatas(sortedComponent.slice(0, 3));
  }, [projects]);

  return <>{projectDatas}</>;
}
