import React from "react";
import { Route } from "react-router-dom";
import Firstpage from "../pages/FirstPage/FirstPage";
import SecondPage from "../pages/SecondPage/SecondPage";
import ThirdPage from "../pages/ThirdPage/ThirdPage";




export default function AppRouter() {

  return (
    <div>
      <>
        <div>
          {/** First intro page route */}
          <Route exact path="/" component={Firstpage} />
          {/** list of user page route */}
          <Route exact path="/users" component={SecondPage} />
          {/** add and edit page route */}
          <Route exact path="/add-user" component={ThirdPage} />
        </div>
      </>
    </div>
  );
}
