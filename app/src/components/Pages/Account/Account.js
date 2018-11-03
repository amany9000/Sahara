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
                            <Input placeholder="Your Ethereum mnemonic text" />
                        </FormItem>
                        <FormItem
                        >
                            <Link to="/projects">
                                <Button type="primary">Add</Button>
                            </Link>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </div>
    );
  }
}


export default Account;
