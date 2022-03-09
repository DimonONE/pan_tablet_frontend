import { Switch, Route, Redirect } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { userRoutes } from "../shared/consts/url/routes";
import { Registration } from "../components/Registration";
import { BookSlider } from "../pages/BookSlider";
import { Profile } from "../pages/Profile";
import { AuthGuard } from "../components/AuthGuard";
import { Competition } from "../pages/Competition";
import { TopBooks } from "../pages/TopBooks";
import { RandomBooks } from "../pages/RandomBooks";
import { AllFolders } from "../pages/AllFolders";

export const UserLayout = () => {
  return (
    <Switch>
      <Route exact path={userRoutes.mainPage}>
        <MainPage />
      </Route>

      <Route exact path={userRoutes.works}>
        <MainPage />
      </Route>

      <Route exact path={userRoutes.registration}>
        <Registration />
      </Route>

      <Route exact path={userRoutes.book}>
        <BookSlider />
      </Route>
      <Route exact path={userRoutes.randomBook}>
        <BookSlider />
      </Route>

      <Route exact path={userRoutes.winners}>
        <Competition />
      </Route>

      <Route exact path={userRoutes.competition}>
        <TopBooks />
      </Route>

      <Route exact path={userRoutes.randomBooks}>
        <RandomBooks />
      </Route>

      <Route exact path={userRoutes.folders}>
        <AuthGuard>
          <AllFolders />
        </AuthGuard>
      </Route>

      <Route exact path={userRoutes.profile}>
        <AuthGuard>
          <Profile />
        </AuthGuard>
      </Route>

      <Redirect exact from="/" to={userRoutes.mainPage} />
    </Switch>
  );
};
