import React, { useState, useEffect, useContext } from "react";
import { useGetPendingTransactions } from '@elrondnetwork/dapp-core/hooks/transactions/useGetPendingTransactions';
import { useGetNetworkConfig } from '@elrondnetwork/dapp-core/hooks/useGetNetworkConfig';
import { Interaction, QueryResponseBundle, GasLimit, ContractFunction, U32Value, ArgSerializer, BytesValue } from "@elrondnetwork/erdjs";
import { ProxyNetworkProvider } from "@elrondnetwork/erdjs-network-providers/out";
import parse from "html-react-parser";
import { Tabs, Tab, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useTranslation, Trans } from "react-i18next";
import LoadSpinner from "components/LoadSpinner";

import COMMENTICON from "../../assets/img/comment_icon.png";
import { CONTRACT_ADDRESS, DAPP_URL } from "../../config";
import { ContractContext } from "../../ContextWrapper";

import { TIMEOUT } from "../../utils/const";
import { convertWeiToEgld, getTxTimes, convertTimestampToDate } from "../../utils/convert";

import { sendQuery } from "../../utils/transaction";

export default function ProjectDetailsTab(props) {
  const { network } = useGetNetworkConfig();

  const { hasPendingTransactions } = useGetPendingTransactions();
  const proxy = new ProxyNetworkProvider("https://gateway.elrond.com", {
    timeout: TIMEOUT,
  });

  const contract = useContext(ContractContext);

  const datas = props.datas;

  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [projectTxDatas, setProjectTxDatas] = useState([]);
  const [projectComments, setProjectComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  const [txDatas, setTxDatas] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (!contract || props.datas.projectId < 1) return;

        const args = [new U32Value(props.datas.projectId)];
        const interaction = contract.methodsExplicit.getProjectTransactions(args);
        const res = await sendQuery(contract, proxy, interaction);
        if (!res || !res.returnCode.isSuccess()) return;

        const value = res.firstValue.valueOf();

        const datas = [];
        value.map((item) => {
          const data = {
            id: item.transaction_id.toNumber(),
            name: item.name.toString(),
            comment: item.comment.toString(),
            action: item.action.toNumber(),
            date: new Date(item.datetime * 1000).toLocaleString("default"),
            address: item.address.toString(),
            amount: convertWeiToEgld(item.amount_in_usdc.toNumber(), 6),
            projectFees: convertWeiToEgld(item.withdrawn_fee_for_project.toNumber(), 6),
            burnFees: convertWeiToEgld(item.withdrawn_fee_for_burn.toNumber(), 6),
            nftFees: convertWeiToEgld(item.withdrawn_fee_for_nft.toNumber(), 6),
            vitalFees: convertWeiToEgld(item.withdrawn_fee_for_vital.toNumber(), 6),
            hash: Buffer.from(item.transaction_hash).toString("hex"),
            hidden: item.identify_hide,
            comment: item.comment.toString(),
            datetime: (new Date(item.datetime * 1000).getTime() - new Date().getTime()) / (1000 * 3600 * 24),
            eventtime: getTxTimes(item.datetime * 1000),
          };

          datas.push(data);
        });
        // console.log(datas);

        datas.sort((a, b) => b.id - a.id);

        // const sortedDatas = datas.sort((a, b) => {
        //   if (a.date < b.date) {
        //     return 1;
        //   }
        //   if (a.date > b.date) {
        //     return -1;
        //   }

        //   // they are equal
        //   return 0;
        // });
        setTxDatas(datas);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [contract, hasPendingTransactions]);

  useEffect(() => {
    const projectTX = txDatas.map((item) =>
      item.projectFees ? (
        <OverlayTrigger
          key="top"
          placement="top"
          overlay={
            <Tooltip id="tooltip-top">
              <div className="text-justify">
                {t("project_detail.tab.fees")}:<br />- VITAL burn : ${item.burnFees}
                <br />- VITAL staking : ${item.vitalFees}
                <br />- NFT staking : ${item.nftFees}
                <br />- Growth : ${item.projectFees}
              </div>
            </Tooltip>
          }
        >
          <tr>
            <td>{item.date}</td>
            <td>{item.action == 0 ? t("project_detail.tab.participate") : t("project_detail.tab.withdrawn")}</td>
            <td>{t("project_detail.tab.owner")}</td>
            <td>${item.amount}</td>
            <td>
              <a href={`https://explorer.elrond.com/transactions/${item.hash}`} target="_blank" rel="noreferrer">
                {t("project_detail.tab.see")}
              </a>
            </td>
          </tr>
        </OverlayTrigger>
      ) : (
        <tr>
          <td>{item.date}</td>
          <td>{item.action == 0 ? t("project_detail.tab.participate") : t("project_detail.tab.withdrawn")}</td>
          <td>{item.hidden ? t("project_detail.tab.anonymous") : item.name}</td>
          <td>${item.amount}</td>
          <td>
            <a href={`https://explorer.elrond.com/transactions/${item.hash}`} target="_blank" rel="noreferrer">
              {t("project_detail.tab.see")}
            </a>
          </td>
        </tr>
      )
    );

    setProjectTxDatas(projectTX);
  }, [txDatas]);

  useEffect(() => {
    let count = 0;
    const projectComments = txDatas.map(
      (item) =>
        item.comment !== "" && (
          <div className={props.styles.commentsContainer} key={(count = count + 1)}>
            <div className="row">
              <div className="col-lg-1 col-2">
                <img src={COMMENTICON} className={props.styles.iconComment} />
              </div>
              <div className="col-10">
                <div className={props.styles.commentsName}>{item.hidden ? t("project_detail.tab.anonymous") : item.name}</div>
                <div className={props.styles.commentsDatas}>
                  <span className={props.styles.commentsPrice}>${item.amount} • {item.eventtime}</span>
                </div>
                {item.comment}
              </div>
            </div>
          </div>
        )
    );
    setCommentCount(count);
    setProjectComments(projectComments);
  }, [txDatas]);

  return (
    <div>
      {isLoading ? (
        <LoadSpinner />
      ) : (
        <section className={props.styles.details}>
          <Tabs defaultActiveKey="about" id="uncontrolled-tab-example" className="mb-2">
            <Tab eventKey="about" title={t("project_detail.about.title")}>
              {datas.projectDescription == "" ? (
                <div className={props.styles.detail_content}>
                  <p className={props.styles.text}>
                    <span className={props.styles.about} style={{ fontWeight: 'bold' }}> {t("project_detail.aboutproject")}</span> <br />
                    <br/>
                    <Trans>{t("project_detail.about.content")}</Trans>
                    <br />
                    <a href="https://wallet.elrond.com/create">&rarr; {t("project_detail.create_elrond_wallet")}</a>
                    <br />
                    <a href="https://get.maiar.com/referral/xkcr46kqg0">&rarr; {t("project_detail.download_maiar")}</a>
                  </p>
                </div>
              ) : (
                <div className={props.styles.detail_content}>
                  <span className={props.styles.about} style={{ fontWeight: 'bold' }}> {t("project_detail.aboutproject")}</span> <br />
                  <p className={props.styles.text}>{parse(datas.projectDescription)}</p>
                </div>
              )}

              {datas.projectDescription == "" ? (<p></p>
              ) : (
                <div className={props.styles.detail_content}>
                  <span className={props.styles.about} style={{ fontWeight: 'bold' }}> {t("project_detail.used_for.title")}</span> <br />
                  <p className={props.styles.text}>{parse(datas.projectDescription)}</p>
                </div>
              )}
              
              {datas.projectDescription == "" ? (<p></p>
              ) : (
                <div className={props.styles.detail_content}>
                  <span className={props.styles.about} style={{ fontWeight: 'bold' }}> {t("project_detail.about_us.title")}</span> <br />
                  <p className={props.styles.text}>{parse(datas.projectDescription)}</p>
                </div>
              )}
            </Tab>
            {commentCount > 0 ? (
              <Tab eventKey="comments" title={t("project_detail.tab.comment") + " (" + commentCount + ")"} >
                {projectComments}
              </Tab>
            ) : (
              <Tab className="text-center" eventKey="comments" title={t("project_detail.tab.comment") + " (" + commentCount + ")"}>
                <div className="mt-5 mb-5">
                  <a href="#" onClick={props.participation}>
                    {t("project_detail.tab.beFirst")}
                  </a>
                </div>
              </Tab>
            )}
            {projectTxDatas.length > 0 && (
              <Tab eventKey="trx" title="Transactions">
                <Table responsive borderless>
                  <thead>
                    <tr>
                      <th>{t("project_detail.tab.date")}</th>
                      <th>{t("project_detail.tab.action")}</th>
                      <th>{t("project_detail.tab.name")}</th>
                      <th>{t("project_detail.tab.amount")}</th>
                      <th>Tx</th>
                    </tr>
                  </thead>
                  <tbody>{projectTxDatas}</tbody>
                </Table>
              </Tab>
            )}
          </Tabs>
        </section>
      )}
    </div>
  );
}
