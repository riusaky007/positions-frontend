// import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPositionPage from "./pages/AddPositionPage";
import EditPositionPage from "./pages/EditPositionPage";
import PositionDetailPage from "./pages/PositionDetailPage";

const RouterMain = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/add">
        <AddPositionPage />
      </Route>
      <Route path="/positions/:id">
        <PositionDetailPage />
      </Route>
      <Route path="/positions/:id/edit">
        <EditPositionPage />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default RouterMain;
