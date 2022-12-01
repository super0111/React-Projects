import React, { useEffect } from "react";
import {
  Address,
  //   AddressValue,
  AbiRegistry,
  SmartContractAbi,
  SmartContract,
  //   Interaction,
  //   QueryResponseBundle,
  //   ProxyProvider,
} from "@elrondnetwork/erdjs";
import { Route, Routes } from "react-router-dom";
import Navbar from "components/Navbar";
import routes from "routes";

// import {
//   refreshAccount,
//   sendTransactions,
//   useGetAccountInfo,
//   useGetNetworkConfig,
//   useGetPendingTransactions,
// } from '@elrondnetwork/dapp-core';
import jsonAbi from "./assets/dapp-sc.abi.json";
import { CONTRACT_ADDRESS, CONTRACT_ABI_URL, CONTRACT_NAME } from "./config";
// import { TIMEOUT } from './utils/const';

import { TransactionsToastList, SignTransactionsModals, NotificationModal } from "@elrondnetwork/dapp-core/UI";

export const ContractContext = React.createContext<any>(undefined);

const ContextWrapper = () => {
  //   const { network } = useGetNetworkConfig();
  //   const { hasPendingTransactions } = useGetPendingTransactions();
  //   const { account } = useGetAccountInfo();
  //   const proxy = new ProxyProvider(network.apiAddress, { timeout: TIMEOUT });

  // load smart contract abi and parse it to SmartContract object for tx
  const [contract, setContract] = React.useState<any>(undefined);
  useEffect(() => {
    (async () => {
      const json = JSON.parse(JSON.stringify(jsonAbi));
      const abiRegistry = await AbiRegistry.create(json);
      const con = new SmartContract({
        address: new Address(CONTRACT_ADDRESS),
        abi: new SmartContractAbi(abiRegistry, [CONTRACT_NAME]),
      });
      setContract(con);
    })();
  }, []); // [] makes useEffect run once

  return (
    <ContractContext.Provider value={contract}>
      <Navbar>
        <TransactionsToastList />
        <NotificationModal />
        <SignTransactionsModals className="custom-class-for-modals" />
        <Routes>
          {routes.map((route: any, index: number) => (
            <Route path={route.path} key={"route-key-" + index} element={<route.component />} />
          ))}
          {/* <Route path='*' element={<PageNotFound />} /> */}
        </Routes>
      </Navbar>
    </ContractContext.Provider>
  );
};

export default ContextWrapper;
