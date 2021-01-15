import React from 'react'
import SignUp from "./components/sugnup/SignUp";
import {Container} from "react-bootstrap";
import {AuthProvider} from './context/AuthContext'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import PrivateRout from './components/private-rout/PrivetRout'
import ForgotPassword from "./components/forgot-password/ForgotPassword";
import UpdateProfile from "./components/update-profile/UpdateProfile";
import Home from "./components/home/Home";


function App() {
    return (

        <Container>
            <Router>
                <AuthProvider>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Container className="d-flex align-items-center justify-content-center"
                                   style={{minHeight: "100vh"}}>
                            <div className="w-100" style={{maxWidth: "400px"}}>
                                <PrivateRout exact path="/dashboard" component={Dashboard}/>
                                <PrivateRout path="/update-profile" component={UpdateProfile}/>
                                <Route path="/signup" component={SignUp}/>
                                <Route path="/login" component={Login}/>
                                <Route path="/forgot-password" component={ForgotPassword}/>
                            </div>
                        </Container>
                    </Switch>
                </AuthProvider>
            </Router>
        </Container>

    );
}

export default App;
