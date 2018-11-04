import React, { Component } from 'react';
import Account from '../components/Pages/Account/Account';
import Project from '../components/Pages/Projects/Projects';

class Auth extends Component {
    constructor(props) {
        super();
        this.state = {
            mnemonic: '',
          };
          this.handleMnemonic = this.handleMnemonic.bind(this);
    }

    handleMnemonic(value) {
        this.setState({
            mnemonic: value
        });
    }
  render() {
    if(this.state.mnemonic === '') {
        return(
            <Account handleMnemonic={this.handleMnemonic} />
        );
    }
    else {
        return(
            <Project mnemonic={this.state.mnemonic} />
        );
    }
  }
}

export default Auth;
