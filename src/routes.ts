import { dAppName } from "config";
import ProjectDetails from "pages/ProjectDetails/ProjectDetails";
import Projects from "pages/Projects/Projects";
import withPageTitle from "./components/PageTitle";
import HomePage from "./pages/HomePage";
import HowItWork from "./pages/HowItWork";
import MyMoneyPots from "./pages/MyMoneyPots";

export const routeNames = {
  home: "/",
  unlock: "/unlock",
  ledger: "/ledger",
  walletconnect: "/walletconnect",
  howitwork: "/how-it-work",
  projects: "/projects",
  projectdetail: "/p/*",
  mymoneypots: "/my-money-pots",
  contact: "/contact"
};

const routes: Array<any> = [
  {
    path: routeNames.home,
    title: "Home",
    component: HomePage,
  },
  {
    path: routeNames.unlock,
    title: "Home",
    component: HomePage,
  },
  {
    path: routeNames.projects,
    title: "Projects",
    component: Projects,
  },
  {
    path: routeNames.projectdetail,
    title: "Project Detail",
    component: ProjectDetails,
  },
  {
    path: routeNames.mymoneypots,
    title: "My money pots",
    component: MyMoneyPots,
  },
  {
    path: routeNames.howitwork,
    title: "How it work ?",
    component: HowItWork,
  },
];

const mappedRoutes = routes.map((route) => {
  const title = route.title ? `${route.title} • ${dAppName} • Your fully decentralized money pot` : `${dAppName} • Your fully decentralized money pot`;

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);
  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth,
  };
});

export default mappedRoutes;
