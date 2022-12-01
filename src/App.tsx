import React, { Suspense } from "react";
import { DappProvider } from "@elrondnetwork/dapp-core/wrappers";
import { BrowserRouter as Router } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { ENVIRONMENT } from "config";
import LoadSpinner from "./components/LoadSpinner";
import ScrollToTop from "./components/ScrollToTop";
import ContextWrapper from "./ContextWrapper";
import { walletConnectV2ProjectId } from "config";
import { TransactionsToastList, SignTransactionsModals, NotificationModal } from "@elrondnetwork/dapp-core/UI";
localStorage.setItem("lastPath", window.location.pathname);

const App = () => {
  return (
    <Router>
      <ScrollToTop>
        <Suspense fallback={<LoadSpinner />}>
          <DappProvider
            environment={ENVIRONMENT}
            customNetworkConfig={{
              name: "customConfig",
              apiTimeout: 6000,
              walletConnectV2ProjectId,
            }}
          >
            <ContextWrapper />
          </DappProvider>
        </Suspense>
      </ScrollToTop>
    </Router>
  );
};

export default App;
