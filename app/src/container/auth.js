import React, { Component } from 'react';
import Account from '../components/Pages/Account/Account';
import Project from '../components/Pages/Projects/Projects';

class Auth extends Component {
    constructor(props) {
        super();
        this.state = {
            web3: '',
          };
          this.handleWeb3 = this.handleWeb3.bind(this);
    }

    handleWeb3(value) {
        this.setState({
            web3: value
        });
    }
  render() {
    if(this.state.web3 === '') {
        return(
            <Account handleWeb3={this.handleWeb3} />
        );
    }
    else {
        return(
            <Project web3={this.state.web3} />
        );
    }
  }
}

export default Auth;
