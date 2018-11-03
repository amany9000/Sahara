import React, { Component } from 'react';
import '../../../App.css';
import { Form, Input, Button} from 'antd';
import { Row, Col, Divider } from 'antd';
import { Switch } from 'antd';
import { Card, InputNumber } from 'antd';
import reqwest from 'reqwest';
import { List, Avatar, Spin, Menu, Icon } from 'antd';
import {
  Link
} from 'react-router-dom'

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

const FormItem = Form.Item;


function onChange(value) {
    console.log('changed', value);
  }
  

class About extends Component {
    state = {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        data: [],
        request: null
      }
      componentDidMount() {
        this.getData((res) => {
          this.setState({
            loading: false,
            data: res.results,
          });
        });

      }

      getData = (callback) => {
        reqwest({
          url: fakeDataUrl,
          type: 'json',
          method: 'get',
          contentType: 'application/json',
          success: (res) => {
            callback(res);
          },
        });
      }
      onLoadMore = () => {
        this.setState({
          loadingMore: true,
        });
        this.getData((res) => {
          const data = this.state.data.concat(res.results);
          this.setState({
            data,
            loadingMore: false,
          }, () => {
            window.dispatchEvent(new Event('resize'));
          });
        });
      }
    constructor() {
        super();
        this.state = {
          formLayout: 'horizontal',
        };
      }
      
  render() {
    const { loading, loadingMore, showLoadingMore, data, request } = this.state;
    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
      </div>
    ) : null;
    const { TextArea } = Input;
    const { formLayout } = this.state;
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    } : null;
    const buttonItemLayout = formLayout === 'horizontal' ? {
      wrapperCol: { span: 14, offset: 6 },
    } : null;
    return (
        <div>
            <h1 style={{display: "flex", justifyContent: "center", fontSize: "50px"}}>Request Details</h1>
            <div style={{ background: '#ECECEC', padding: '30px' }}>

            <Row type="flex" justify="center">
                <Col span={6} push={18}>
                    <Form layout={formLayout}>
                        <FormItem {...buttonItemLayout}>
                            <Switch checkedChildren="Approve" unCheckedChildren="Decline"/>

                        </FormItem>

                        <FormItem {...buttonItemLayout}>
                            <Button type="primary">Submit</Button>
                        </FormItem>                        <FormItem {...buttonItemLayout}>
                            <Button type="danger">Finalize</Button>
                        </FormItem>
                    </Form>
                </Col>
                <Col span={16} pull={4}>
                        {request?
                        <div>
                    <h2>{request.description}</h2>
                    <p>Contact: {request.contact}</p>
                    <p>Reciepient: {request.recipient}</p>
                    <p>Approves : {request.approvalCount}</p>
                    <p>Is Complete: {request.complete?"Yes":"No"}</p>
                    <p>Value: {request.value}</p>
                    </div>
                        :
                        null}
                </Col>
            </Row>
        </div>
        </div>
    );
  }
}


export default About;
