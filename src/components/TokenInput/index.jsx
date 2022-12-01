import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import axiosRetry from "axios-retry";
import "./index.css";

import { useGetPendingTransactions } from '@elrondnetwork/dapp-core/hooks/transactions/useGetPendingTransactions';
import { useGetNetworkConfig } from '@elrondnetwork/dapp-core/hooks/useGetNetworkConfig';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import { CONTRACT_ADDRESS, GATEWAY } from "config";

import { TOKENS } from "data";
import { convertWeiToEgld } from "utils/convert";

const hex_to_ascii = (str1) => {
  var hex = str1.toString();
  var str = "";
  for (var n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
};

axiosRetry(axios, {
  retries: 1000,
  retryCondition: (e) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(e) || e.response.status === 429;
  },
  retryDelay: axiosRetry.exponentialDelay,
});

const TokenInput = (props) => {
  const { address, account } = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { network } = useGetNetworkConfig();
  const isLoggedIn = Boolean(address);

  let infos = TOKENS;
  if (isLoggedIn) {
    infos[0].balance = convertWeiToEgld(account.balance);
  }
  const [tokens, setTokens] = useState(infos);
  useEffect(() => {
    (async () => {
      const tokenPrice = {};
      let response = await axios.get(`${GATEWAY}/mex/tokens?from=0&size=10000`);
      for (let i = 0; i < response.data.length; i++) {
        const price = {
          price: response.data[i].price
        };
        tokenPrice[response.data[i].id] = price;
      }

      let datas = TOKENS;
      response = await axios.get(`${GATEWAY}/accounts/${address}/tokens/count`);
      const count = response.data;
      const res = await axios.get(`${GATEWAY}/accounts/${address}/tokens?from=0&size=${count}`);
      for(let i = 0; i < res.data.length; i ++) {
        for( let j = 0; j < datas.length; j ++) {
          if (res.data[i].identifier === datas[j].identifier) {
            const balance = res.data[i].balance / Math.pow(10, res.data[i].decimals);
            datas[j].balance = balance;
          }
          if (datas[j].identifier === "EGLD") {
            datas[j].balance = convertWeiToEgld(account.balance);
          }
        }
      }

      const newData = await Promise.all(
        datas.map(async (data) => {
          if (data["identifier"] === "EGLD") {
            if (tokenPrice["WEGLD-bd4d79"]) {
              data.price = tokenPrice["WEGLD-bd4d79"]?.price;
            }
          } else {
            if (tokenPrice[data.identifier]) {
              data.price = tokenPrice[data.identifier]?.price;
            }
          }

          return data;
        })
      );

      setTokens(newData);
    })();
  }, [hasPendingTransactions]);

  const [selectedToken, setSelectedToken] = useState(0);

  useEffect(() => {
    handelAmount(price);
  }, [hasPendingTransactions, selectedToken]);

  const [expectedPrice, setExpectedPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const handleChangePrice = (e) => {
    handelAmount(e.target.value);
  };

  const handelAmount = (value) => {
    const price = tokens[selectedToken].price * value;
    setExpectedPrice(price);
    setPrice(value);
    props.handleParticipationAmount(selectedToken, value);
  };

  return (
    <div>
      <div className="InputToken-container">
        <div className="row">
          <div className="col-4 col-lg-8">
            <input type="number" className="InputToken-input" placeholder="0" onChange={handleChangePrice}></input>
          </div>
          <div className="col-8 col-lg-4">
            <Dropdown>
              <Dropdown.Toggle bsPrefix="InputToken" id="dropdown-basic">
                <div className="row">
                  <div className="col-6">
                    <img src={tokens[selectedToken].url} alt={tokens[selectedToken].identifier} className="token-symbol-first" />
                  </div>
                  <div className="col-6 token-name-first">
                    <span>{tokens[selectedToken]?.ticker}</span>
                    <span>${tokens[selectedToken]?.price.toFixed(2)}</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu renderOnMount>
                {tokens.map((token, index) => {
                  return (
                    <>
                      <Dropdown.Item onClick={() => setSelectedToken(index)}>
                        <div className="row">
                          <div className="col-6">
                            <img src={token.url} alt={token.identifier} className="token-symbol" />
                          </div>
                          <div className="col-6 token-name">
                            <span>{token.ticker}</span>
                            <span>${token.price.toFixed(2)}</span>
                          </div>
                        </div>
                      </Dropdown.Item>
                      {tokens.length === index + 1 ? <></> : <Dropdown.Divider />}
                    </>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="row mt-1">
        <div className="col-6">
          <span className="dollars-value">≈ ${expectedPrice.toLocaleString(localStorage.getItem("i18nextLng"))}</span>
        </div>
        <div className="col-6">
          <span className="balance">
            <strong>Balance:</strong> {tokens[selectedToken].balance.toLocaleString(localStorage.getItem("i18nextLng"))}
          </span>
        </div>
      </div>
    </div>
  );
};
export default TokenInput;
