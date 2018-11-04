import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
import { List, Avatar, Button, Spin, Menu, Icon } from 'antd';

import Projects from '../Pages/Projects/Projects.js';
import AddProject from "../Pages/AddProject/AddProject.js";
import AboutProject from "../Pages/AboutProject/AboutProject.js";
import RequestList from '../Pages/RequestList/RequestList.js';
import NewRequest from '../Pages/NewRequest/NewRequest.js';
import AboutRequest from '../Pages/AboutRequest/AboutRequest.js';
import Home from '../Pages/Home/Home.js';
import AboutUs from '../Pages/AboutUs/AboutUs.js';
import ContactUs from '../Pages/Contactus/Contactus.js';
import Account from '../Pages/Account/Account.js';
import Auth from '../../container/auth';

class Linker extends Component {
  render() {
    return (
        <Router>
        <div>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                style={{ lineHeight: '64px' }}
                breakpoint="lg"
                collapsedWidth="0"
            >
                <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/contribute">Contribute</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/aboutus">About Us</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/contactus">Contact Us</Link></Menu.Item>
                <span style={{
                    marginRight: '20px',
                    float: 'right'
                }} >
                <Icon style={{ fontSize: '20px', color: 'blue', margin: '10px' }} type="facebook" theme="outlined" />
                <Icon style={{ fontSize: '20px', color: 'red', margin: '10px' }} type="youtube" theme="outlined" />
                <Icon style={{ fontSize: '20px', color: '#08c', margin: '10px' }} type="twitter" theme="outlined" />
                <Icon style={{ fontSize: '20px', color: 'pink', margin: '10px' }} type="instagram" theme="outlined" />
                </span>
            </Menu>
          <Route exact path="/" component={Home}/>
          <Route exact path="/account" component={Account}/>
          <Route exact path="/contribute" component={Auth}/>
          <Route exact path="/projects" component={Projects}/>
          <Route exact path="/addproject/:mnemonic"  component={AddProject} />
          <Route exact path="/contactus" component={ContactUs} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/projects/:projectId/:pass" component={AboutProject} />
          <Route exact path="/requests" component={RequestList} />
          <Route exact path="/newrequest"  component={NewRequest} />
          <Route exact path="/requests/:requestId/:pass/:item" component={AboutRequest} />
        </div>
    </Router>
    );
  }
}

export default Linker;
