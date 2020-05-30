import React, { Component } from 'react';
import '../../../App.css';
import { Form, Input, Button} from 'antd';
import { Row, Col, Divider } from 'antd';
import { Switch } from 'antd';
import { Card, InputNumber } from 'antd';
import reqwest from 'reqwest';
import { List, Avatar, Spin, Menu, Icon } from 'antd';

import {
  Link,
  withRouter
} from 'react-router-dom'

import {getReqDetails, contribute, finalizeRequest} from "../../../ethereum/initiative";

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
        request: null,
        value: ''
      }
      componentDidMount() {
        this.getData((res) => {
          this.setState({
            data: res.results,
          });
        });
        getReqDetails(this.props.match.params.requestId, this.props.location.web3).then((some) => {
          this.setState({
            request: some,
            loading: false
          });
        })
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
                            <Switch checkedChildren="Approver" unCheckedChildren="Not Approver"/>
                        </FormItem>
                        <FormItem
                            label="Value"
                            {...formItemLayout}
                        >
                            <Input placeholder="Value (in Finney)" value={this.state.value} onChange={(event) => this.setState({value: event.target.value})}/>
                        </FormItem>

                        <FormItem {...buttonItemLayout}>
                            <Button type="primary" onClick={()=> contribute(this.props.match.params.requestId, this.state.value, this.props.location.web3).then(() => alert("Contribution Made, thank you!!!!"))}>Contribute</Button>
                        </FormItem>                        
                        <FormItem {...buttonItemLayout}>
                            <Button type="danger" onClick={()=> finalizeRequest(this.props.match.params.requestId, this.props.location.web3)}>Finalize</Button>
                        </FormItem>
                    </Form>
                </Col>
                <Col span={16} pull={4}>
                        {request?
                        <div>
                    <h2><strong>{request.description}</strong></h2>
                    <p><strong>Contact:</strong> {request.contact}</p>
                    <p><strong>Reciepient:</strong> {request.recipient}</p>
                    <p><strong>Is Complete:</strong> {request.complete?"Yes":"No"}</p>
                    <p><strong>Value:</strong> {request.value}</p>
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


export default withRouter(About);
