import React, { useState, useEffect, useContext } from "react";
/*import { BrowserRouter as Router, Route, Switch } from "react-router-dom";*/
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import AddComment from "./components/Posts/AddComment";
import FindPosts from "./components/Posts/FindPosts";
import LostPosts from "./components/Posts/LostPosts";
import Posts from "./components/Posts/Posts";
import FindRequest from "./components/Requests/FindRequest";
import LostRequest from "./components/Requests/LostRequest";
import Summary from "./components/Requests/Summary";
import LoginCodePanel from "./components/UserComponents/LoginCodePanel";
import LoginDataPanel from "./components/UserComponents/LoginDataPanel";
import RegisterPanel from "./components/UserComponents/RegisterPanel";
import SelectLogin from "./components/UserComponents/SelectLogin";
import AdminPanel from "./components/UserPanels/AdminPanel";
import EditProfile from "./components/UserPanels/EditProfile";
import UserPanel from "./components/UserPanels/UserPanel";
import UserPosts from "./components/UserPanels/UserPosts";
import About from "./components/UserPanels/About";
import "./App.css";
import Header from "./Header";
import { Container } from "./styles/GlobalStyle";
import LostPost from "./components/Posts/LostPost";
import EditPost from "./components/Posts/EditPost";
import { NewAppInfo } from "./context/AppInfo";
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Titillium+Web&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap');
  body{
    font-family: 'Titillium Web', sans-serif
  }
`;
const App = props => {
  const userInfo = useContext(NewAppInfo);
  return (
    <div style={{ "box-sizing": "border-box" }}>
      <Router history={props.history}>
        <Header />
        <Container mobile={userInfo.mobileMenu}>
          <Switch>
            <Route exact path="/" component={SelectLogin} />
            <Route path="/selectlogin" component={SelectLogin} />
            <Route path="/about" component={About} />
            <Route path="/register" component={RegisterPanel} />
            <Route path="/addcomment" component={AddComment} />
            <Route path="/findposts" component={FindPosts} />
            <Route path="/lostposts" component={LostPosts} />
            <Route path="/posts" component={Posts} />
            <Route path="/lostpost" component={LostPost} />
            <Route path="/findrequest" component={FindRequest} />
            <Route path="/lostrequest" component={LostRequest} />
            <Route path="/requestsummary" component={Summary} />
            <Route path="/logincode" component={LoginCodePanel} />
            <Route path="/logindata" component={LoginDataPanel} />
            <Route path="/adminpanel" component={AdminPanel} />
            <Route path="/editprofile" component={EditProfile} />
            <Route path="/userpanel" component={UserPanel} />
            <Route path="/userposts/:id" component={UserPosts} />
            <Route path="/editpost" component={EditPost} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};
export default App;
