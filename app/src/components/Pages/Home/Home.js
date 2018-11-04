import React, { Component } from 'react';
import '../../../App.css';
import { List, Avatar, Button, Spin, Menu, Icon } from 'antd';
import { Row, Col } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div className="start">
        <div style={{
            color:'white',
            marginLeft:'50px',
            paddingTop: '200px',
            fontSize:'20px'
          }}>
          <h1 style={{
            color:'black',
          }}>
            A transparent platform for supporting the less fortunate
          </h1>
          <Link to="/contribute">
            <Button type="primary">
              Contribute<Icon type="right" />
            </Button>
          </Link>
          </div>
      </div>
    );
  }
}


export default Home;
