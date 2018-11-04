import React, { Component } from 'react';
import '../../../App.css';
import { Form, Input, Button} from 'antd';
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
      
  render() {
    const { TextArea } = Input;
    const { formLayout } = this.state;

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }} >
            <Row type="flex" justify="center">
                <Col>
                    <br></br>
                    <h1 style={{display: "flex", justifyContent: "center"}}>Add your Ethereum account</h1>
                    <Form layout={formLayout}>
                        <FormItem
                        >
                            <Input placeholder="Your Ethereum mnemonic text" value={this.state.id} onChange={(event) => this.setState({id: event.target.value})} />
                        </FormItem>
                        <FormItem
                        >
                        
                                <Button type="primary" onClick={() => this.props.handleMnemonic(this.state.id)}>Add</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </div>
    );
  }
}


export default Account;
