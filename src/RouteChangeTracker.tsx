import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";

const RouteChangeTracker = ({ history }: { history: any }) => {
  ReactGA.pageview(window.location.pathname);

  history.listen((location: any) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });

  return <></>;
};

export default withRouter(RouteChangeTracker);
