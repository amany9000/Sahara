import React, { Component } from 'react';
import '../../../App.css';
import { Form, Input, Button} from 'antd';
import Web3 from 'web3';
import hdWalletProvider from '@truffle/hdwallet-provider';
import { Row, Col, Divider } from 'antd';
import { Switch } from 'antd';
import {
    Link
  } from 'react-router-dom';

const FormItem = Form.Item;

class Account extends Component {
    constructor() {
        super();
        this.state = {
          formLayout: 'horizontal',
          id: ''
        };
      }
  

  getWeb3 = (pass) => {
    const provider = new hdWalletProvider(
      pass,
      "https://rinkeby.infura.io/v3/e8bccfbf91864d7ea8797b0ae8b2d30a"  // This address will be generated through infura 
    );

    const web3 = new Web3(provider);
    this.props.handleWeb3(web3);	
  }     

  componentDidMount = () => {
    if (window.ethereum){
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      this.props.handleWeb3(window.web3);
    }
    else{
      alert("Metamask not present, you would have to login using account Mnemomic")
    }
  }

  render() {
    const { TextArea } = Input;
    const { formLayout } = this.state;

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }} >
            <Row type="flex" justify="center">
                <Col>
                    <br></br>
                    <h1 style={{display: "flex", justifyContent: "center"}}>Or load account with Mnemonic</h1>
                    <Form layout={formLayout}>
                        <FormItem
                        >
                            <Input placeholder="Your Ethereum mnemonic text" value={this.state.id} onChange={(event) => this.setState({id: event.target.value})} />
                        </FormItem>
                        <FormItem
                        >
                        
                                <Button type="primary" onClick={() => this.getWeb3(this.state.id)}>Add</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </div>
    );
  }
}


export default Account;
