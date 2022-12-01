/* eslint @typescript-eslint/no-var-requires: "off" */
import React, { useState, useEffect, useContext } from "react";
import { GradientBtn, ProjectCard } from "components/index";
import ReactPaginate from "react-paginate";
import parse from "html-react-parser";
// import { Select, setOptions } from '@mobiscroll/react';
// import Select, { components } from "react-select";
import { Select } from 'antd';

import 'antd/dist/antd.css';

// import ProjectList from '../../assets/js/ProjectList';
import styles from "./Projects.module.scss";
import { useTranslation, Trans } from "react-i18next";
import LoadSpinner from "components/LoadSpinner";

import { sendTransactions } from '@elrondnetwork/dapp-core/services';
import { refreshAccount } from '@elrondnetwork/dapp-core/utils';
import { useGetPendingTransactions } from '@elrondnetwork/dapp-core/hooks/transactions/useGetPendingTransactions';
import { useGetNetworkConfig } from '@elrondnetwork/dapp-core/hooks/useGetNetworkConfig';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import { Interaction, QueryResponseBundle, ContractFunction, U32Value, ArgSerializer } from "@elrondnetwork/erdjs";

import { ContractContext } from "../../ContextWrapper";

import { convertWeiToEgld } from "../../utils/convert";

import { TIMEOUT } from "../../utils/const";

import { sendQuery } from "../../utils/transaction";
import { ProxyNetworkProvider } from "@elrondnetwork/erdjs-network-providers/out";

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const { Option } = Select;

// const translateCategoryTypes = [
//   t("category.anniversary"), t("category.wedding")
// ];

const Search = styled('div')(({ theme }) => ({

  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.05),
  },
  marginTop: 20,
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const GridData = [
  {
    key: "1",
    category: "A common gift",
    items: [
      {
        key: "Anniversary",
        img: "01",
        title: "anniversary",
      },
      {
        key: "Wedding",
        img: "02",
        title: "wedding",
      },
      {
        key: "Retirement pot",
        img: "03",
        title: "retirement",
      },
      {
        key: "House-warming",
        img: "04",
        title: "house",
      },
      {
        key: "Birth/Baptism",
        img: "05",
        title: "birth",
      },
      {
        key: "Other common gift",
        img: "06",
        title: "other_gift",
      },
    ],
  },
  {
    key: "2",
    category: "A solidarity project",
    items: [
      {
        key: "Medical",
        img: "07",
        title: "medical",
      },
      {
        key: "Animals",
        img: "08",
        title: "animals",
      },
      {
        key: "Humanitarian",
        img: "09",
        title: "humanitarian",
      },
      {
        key: "Studies",
        img: "10",
        title: "studies",
      },
      {
        key: "Entrepreneurship",
        img: "11",
        title: "entrepreneurship",
      },
      {
        key: "Other project",
        img: "12",
        title: "other_project",
      },
    ],
  },
  {
    key: "3",
    category: "One expense for many",
    items: [
      {
        key: "Evening",
        img: "13",
        title: "evening",
      },
      {
        key: "Holidays",
        img: "14",
        title: "holidays",
      },
      {
        key: "Funeral",
        img: "15",
        title: "funeral",
      },
      {
        key: "Bachelor party",
        img: "16",
        title: "party",
      },
      {
        key: "Purchase/Repair",
        img: "17",
        title: "purchase",
      },
      {
        key: "Other expense",
        img: "18",
        title: "other_purchase",
      },
    ],
  }
];



export default function Projects() {

  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const category_list = [];
  const sortList = [
    { value: "raised_up", label: "byraisedup" },
    { value: "raised_down", label: "byraiseddown" },
    { value: "participants_up", label: "byparticipantsup" },
    { value: "participants_down", label: "byparticipantsdown" },
    { value: "alphabeta_up", label: "byalphaup" },
    { value: "alphabeta_down", label: "byalphadown" },
  ];

  category_list.push({
    label: "all",
    value: "All",
  });

  GridData.map((i) => {
    i.items.map((item) => {
      category_list.push({
        label: item.title,
        value: item.key,
        img: item.img,
      });
    });
  });

  const { network } = useGetNetworkConfig();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const proxy = new ProxyNetworkProvider("https://gateway.elrond.com", {
    timeout: TIMEOUT,
  });

  const contract = useContext(ContractContext);
  const [postNumber, setPostNumber] = useState(20);

  const [projects, setProjects] = useState([]);
  const [projectDatas, setProjectDatas] = useState();
  // const [slicedProjectDatas, setSlicedProjectDatas] = useState();

  // const [maxLoad, setmaxLoad] = useState(200);

  const regex = /(<([^>]+)>)/gi;
  const regex1 = "&nbsp;";

  const [sortType, setSortType] = useState('raised_down');
  const [categoryType, setCategoryType] = useState('All');

  const transformTxt = t("project_detail.about.content").replace(regex, "");
  const transformTxt1 = transformTxt.replace(regex1, "").slice(0, 70) + "...";

  const handleScroll = () => {
    var isAtBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight;

    // console.log("postnumber: ", postNumber);
    // console.log("length: ", projects?.length);

    if (isAtBottom) {
      if (postNumber + 12 <= projects?.length) {
        setPostNumber(postNumber + 12);
        // console.log("setPostNumber: ", postNumber+20 );
      }
      else {
        setPostNumber(projects?.length);
      }
    }
  };

  window.addEventListener("scroll", handleScroll);

  const sortByType = (type, beforeComponent) => {

    let sortedComponent;

    if (type === "alphabeta_down") {
      sortedComponent = beforeComponent.sort((a, b) => {
        if (a.props.name.toLowerCase() < b.props.name.toLowerCase()) {
          return 1;
        }
        else if (a.props.name.toLowerCase() > b.props.name.toLowerCase()) {
          return -1;
        }

        // they are equal
        return 0;

      });
    }

    else if (type === "alphabeta_up") {
      sortedComponent = beforeComponent.sort((a, b) => {
        if (a.props.name.toLowerCase() > b.props.name.toLowerCase()) {
          return 1;
        }
        else if (a.props.name.toLowerCase() < b.props.name.toLowerCase()) {
          return -1;
        }

        // they are equal
        return 0;

      });
    }

    else if (type === "participants_down") {
      sortedComponent = beforeComponent.sort((a, b) => {
        if (a.props.participants < b.props.participants) {
          return 1;
        }
        else if (a.props.participants > b.props.participants) {
          return -1;
        }

        // they are equal
        return 0;

      });
    }

    else if (type === "participants_up") {
      sortedComponent = beforeComponent.sort((a, b) => {
        if (a.props.participants > b.props.participants) {
          return 1;
        }
        else if (a.props.participants < b.props.participants) {
          return -1;
        }

        // they are equal
        return 0;

      });
    }

    else if (type === "raised_down") {
      sortedComponent = beforeComponent.sort((a, b) => {
        if (a.props.amount < b.props.amount) {
          return 1;
        }
        else if (a.props.amount > b.props.amount) {
          return -1;
        }

        // they are equal
        return 0;

      });
    }

    else if (type === "raised_up") {
      sortedComponent = beforeComponent.sort((a, b) => {
        if (a.props.amount > b.props.amount) {
          return 1;
        }
        else if (a.props.amount < b.props.amount) {
          return -1;
        }

        // they are equal
        return 0;

      });
    }

    return sortedComponent;
  };

  const categoryFilter = (e) => {
    console.log(e);
    setCategoryType(e);

    if (e === "All") {
      const projectComponent = projects.map((item) => <ProjectCard name={item.projectName} category={item.projectCategory} key={item.projectId} project_id={item.projectId} project_unqiue_id={item.projectUniqueId} amount={item.projectCollectedAmount} goal={item.projectGoal} photo={item.projectPhoto} description={item.projectDescription ? parse(item.projectDescription).replace(regex1, "").slice(0, 70) + "..." : transformTxt1} participants={item.projectParticipationNumber} verifiedStatus={item.projectVerified} />);

      let verifiedProjectComponent = projectComponent.filter((item) => item.props.verifiedStatus === true);
      let unverifiedProjectComponent = projectComponent.filter((item) => item.props.verifiedStatus === false);

      let verifiedResult = sortByType(sortType, verifiedProjectComponent);
      let unverifiedResult = sortByType(sortType, unverifiedProjectComponent);

      let finalResult = verifiedResult.concat(unverifiedResult);

      setProjectDatas(finalResult);

      // setSlicedProjectDatas(finalResult.slice(0, 20));
      if (finalResult.length < 20)
        setPostNumber(finalResult.length);
      else
        setPostNumber(20);
    }

    else {
      const filtered = projects.filter((item) => item.projectCategory === e);
      const projectComponent = filtered.map((item) => <ProjectCard name={item.projectName} category={item.projectCategory} key={item.projectId} project_id={item.projectId} project_unqiue_id={item.projectUniqueId} amount={item.projectCollectedAmount} goal={item.projectGoal} photo={item.projectPhoto} description={item.projectDescription ? parse(item.projectDescription).replace(regex1, "").slice(0, 70) + "..." : transformTxt1} participants={item.projectParticipationNumber} verifiedStatus={item.projectVerified} />);

      let verifiedProjectComponent = projectComponent.filter((item) => item.props.verifiedStatus === true);
      let unverifiedProjectComponent = projectComponent.filter((item) => item.props.verifiedStatus === false);

      let verifiedResult = sortByType(sortType, verifiedProjectComponent);
      let unverifiedResult = sortByType(sortType, unverifiedProjectComponent);

      let finalResult = verifiedResult.concat(unverifiedResult);

      setProjectDatas(finalResult);

      if (finalResult.length < 20)
        setPostNumber(finalResult.length);
      else
        setPostNumber(20);

      // setSlicedProjectDatas(finalResult.slice(0, 20));
    }

  };

  const sortTypeChange = (e) => {

    console.log(e);
    setSortType(e);

    if (categoryType === "All") {
      const projectComponent = projects.map((item) => <ProjectCard name={item.projectName} category={item.projectCategory} key={item.projectId} project_id={item.projectId} project_unqiue_id={item.projectUniqueId} amount={item.projectCollectedAmount} goal={item.projectGoal} photo={item.projectPhoto} description={item.projectDescription ? parse(item.projectDescription).replace(regex1, "").slice(0, 70) + "..." : transformTxt1} participants={item.projectParticipationNumber} verifiedStatus={item.projectVerified} />);

      let verifiedProjectComponent = projectComponent.filter((item) => item.props.verifiedStatus === true);
      let unverifiedProjectComponent = projectComponent.filter((item) => item.props.verifiedStatus === false);

      let verifiedResult = sortByType(e, verifiedProjectComponent);
      let unverifiedResult = sortByType(e, unverifiedProjectComponent);

      let finalResult = verifiedResult.concat(unverifiedResult);

      setProjectDatas(finalResult);

      if (finalResult.length < 20)
        setPostNumber(finalResult.length);
      else
        setPostNumber(20);

      // setSlicedProjectDatas(finalResult.slice(0, 20));

    }

    else {
      const filtered = projects.filter((item) => item.projectCategory === categoryType);
      const projectComponent = filtered.map((item) => <ProjectCard name={item.projectName} category={item.projectCategory} key={item.projectId} project_id={item.projectId} project_unqiue_id={item.projectUniqueId} amount={item.projectCollectedAmount} goal={item.projectGoal} photo={item.projectPhoto} description={item.projectDescription ? parse(item.projectDescription).replace(regex1, "").slice(0, 70) + "..." : transformTxt1} participants={item.projectParticipationNumber} verifiedStatus={item.projectVerified} />);

      let verifiedProjectComponent = projectComponent.filter((item) => item.props.verifiedStatus === true);
      let unverifiedProjectComponent = projectComponent.filter((item) => item.props.verifiedStatus === false);

      let verifiedResult = sortByType(e, verifiedProjectComponent);
      let unverifiedResult = sortByType(e, unverifiedProjectComponent);

      let finalResult = verifiedResult.concat(unverifiedResult);

      setProjectDatas(finalResult);

      if (finalResult.length < 20)
        setPostNumber(finalResult.length);
      else
        setPostNumber(20);

      // setSlicedProjectDatas(finalResult.slice(0, 20));


    }
  };

  const onSearchChange = (e) => {
    if (categoryType === "All") {
      const projectComponent = projects.map((item) => <ProjectCard name={item.projectName} category={item.projectCategory} key={item.projectId} project_id={item.projectId} project_unqiue_id={item.projectUniqueId} amount={item.projectCollectedAmount} goal={item.projectGoal} photo={item.projectPhoto} description={item.projectDescription ? parse(item.projectDescription).replace(regex1, "").slice(0, 70) + "..." : transformTxt1} participants={item.projectParticipationNumber} verifiedStatus={item.projectVerified} />);

      let verifiedProjectComponent = projectComponent.filter((item) => item.props.verifiedStatus === true);
      let unverifiedProjectComponent = projectComponent.filter((item) => item.props.verifiedStatus === false);

      let verifiedResult = sortByType(sortType, verifiedProjectComponent);
      let unverifiedResult = sortByType(sortType, unverifiedProjectComponent);

      let finalResult = verifiedResult.concat(unverifiedResult);

      setProjectDatas(finalResult.filter((item) => item.props.name.toLowerCase().includes(e.target.value.toLowerCase())));

      if (finalResult.filter((item) => item.props.name.toLowerCase().includes(e.target.value.toLowerCase())).length < 20)
        setPostNumber(finalResult.length);
      else
        setPostNumber(20);

      // setSlicedProjectDatas(finalResult.slice(0, 20));

    }

    else {
      const filtered = projects.filter((item) => item.projectCategory === categoryType);
      const projectComponent = filtered.map((item) => <ProjectCard name={item.projectName} category={item.projectCategory} key={item.projectId} project_id={item.projectId} project_unqiue_id={item.projectUniqueId} amount={item.projectCollectedAmount} goal={item.projectGoal} photo={item.projectPhoto} description={item.projectDescription ? parse(item.projectDescription).replace(regex1, "").slice(0, 70) + "..." : transformTxt1} participants={item.projectParticipationNumber} verifiedStatus={item.projectVerified} />);

      let verifiedProjectComponent = projectComponent.filter((item) => item.props.verifiedStatus === true);
      let unverifiedProjectComponent = projectComponent.filter((item) => item.props.verifiedStatus === false);

      let verifiedResult = sortByType(sortType, verifiedProjectComponent);
      let unverifiedResult = sortByType(sortType, unverifiedProjectComponent);

      let finalResult = verifiedResult.concat(unverifiedResult);

      setProjectDatas(finalResult.filter((item) => item.props.name.toLowerCase().includes(e.target.value.toLowerCase())));

      if (finalResult.filter((item) => item.props.name.toLowerCase().includes(e.target.value.toLowerCase())).length < 20)
        setPostNumber(finalResult.length);
      else
        setPostNumber(20);
      // setSlicedProjectDatas(finalResult.slice(0, 20));


    }
  };


  useEffect(() => {
    (async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    })();
  }, [contract, hasPendingTransactions]);

  useEffect(() => {
    const projectComponent = projects.map((item) => <ProjectCard name={item.projectName} category={item.projectCategory} key={item.projectId} project_id={item.projectId} project_unqiue_id={item.projectUniqueId} amount={item.projectCollectedAmount} goal={item.projectGoal} photo={item.projectPhoto} description={item.projectDescription ? parse(item.projectDescription).replace(regex1, "").slice(0, 70) + "..." : transformTxt1} participants={item.projectParticipationNumber} verifiedStatus={item.projectVerified} />);

    let verifiedProjectComponent = projectComponent.filter((item) => item.props.verifiedStatus === true);
    let unverifiedProjectComponent = projectComponent.filter((item) => item.props.verifiedStatus === false);

    let verifiedResult = sortByType("raised_down", verifiedProjectComponent);
    let unverifiedResult = sortByType("raised_down", unverifiedProjectComponent);

    let finalResult = verifiedResult.concat(unverifiedResult);

    setProjectDatas(finalResult);
  }, [projects]);

  return (
    <div className={styles.projects}>
      <div className={styles.projects_wrap}>
        <span className={styles.projects_head}>{t("project_search.title")}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(e) => onSearchChange(e)}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search></span>
        <div className={styles.projects_wrap_container}>
          <div className={styles.projects_inputBox}>
            <div className={styles.projects_inputBox_wrap}>
              <div className={styles.projects_inputBox_category}>
                <div className={styles.projects_inputBox_category_text}>{t("project_search.category")}</div>
                <Select
                  value={categoryType}
                  placeholder="Select..."
                  optionFilterProp="children"
                  onChange={(e) => categoryFilter(e)}
                >
                  {
                    category_list.map((item, index) => {
                      return <Option key={index} value={item.value}>{item.value === "All" ? <></> : <img src={require("../../assets/img/category_static/" + item.img + ".png").default} style={{ width: 30, paddingRight: "10px" }} alt={item.value} />} {t(`category.${item.label}`)}</Option>;
                    })
                  }
                </Select>
              </div>
            </div>
            <div className={styles.projects_inputBox_wrap}>
              <div className={styles.projects_inputBox_sort}>
                <div className={styles.projects_inputBox_sort_text}>{t("project_search.sort")}</div>
                <Select
                  value={sortType}
                  placeholder="Select..."
                  optionFilterProp="children"
                  onChange={(e) => sortTypeChange(e)}
                >
                  {
                    sortList.map((item, index) => {
                      return <Option key={index} value={item.value}>{t(`sorttypes.${item.label}`)}</Option>;
                    })
                  }
                </Select>
              </div>
            </div>

          </div>

          <div className={styles.projects_content_wrap}>
            <div className={styles.projects_wrap_container_projects}>{isLoading ? <LoadSpinner /> : projectDatas?.slice(0, postNumber)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
