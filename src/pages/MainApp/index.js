import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Header } from '../../component'
import Footer from '../../component/molekul/Footer'
import DetailClass from '../DetailClass'
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyClass from '../MyClass'
import './mainapp.css'
import {useHistory} from 'react-router-dom'
const MainApp = () => {
    const history = useHistory();
    return (
        <div className="main-app-wrapper">
            <div className="header-wrapper">
                <Header/>
            </div>
            <div className="content-wrapper">
                <Router>
                    <Switch>
                        <Route path="/my-class">
                            <MyClass/>
                        </Route>
                        <Route path="/my-account">
                            <MyAccount/>
                        </Route>
                        <Route path="/detail-class/:id">
                            <DetailClass/>
                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>
                        
                    </Switch>
                </Router>
            </div>
            <div className="footer-wrapper">
            <Footer/>
            </div>
        </div>
    )
}

export default MainApp
