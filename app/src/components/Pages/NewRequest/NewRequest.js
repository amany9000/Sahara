import React, { Component } from 'react';
import '../../../App.css';
import { Form, Input, Button} from 'antd';
import { Row, Col, Divider } from 'antd';
import { Switch } from 'antd';
import { createRequest } from "../../../ethereum/initiative";

const FormItem = Form.Item;


class NewRequest extends Component {
    constructor() {
        super();
        this.state = {
          formLayout: 'horizontal',
          address: '',
          description: '',
          contact: '',
          value: '',
          recipient: '',
          min: '',
          pass: ''
        };
      }
      
  render() {
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
            <Row type="flex" justify="center">
                <Col span={12}>
                    <br></br>
                    <h1 style={{display: "flex", justifyContent: "center"}}>Add new Request</h1>
                    <Form layout={formLayout}>
                        <FormItem
                            label="Address"
                            {...formItemLayout}
                        >
                            <Input placeholder="Address" value={this.state.address} onChange={(event)=> this.setState({address: event.target.value})} />
                        </FormItem>
                        <FormItem
                            label="Description"
                            {...formItemLayout}
                        >
                            <TextArea rows={4} value={this.state.description} onChange={(event)=> this.setState({description: event.target.value})}/>
                        </FormItem>
                        <FormItem
                            label="Contact"
                            {...formItemLayout}
                        >
                            <Input placeholder="Contact" value={this.state.contact} onChange={(event)=> this.setState({contact: event.target.value})}/>
                        </FormItem>
                        <FormItem
                            label="Value (Wei)"
                            {...formItemLayout}
                        >
                            <Input placeholder="Value of the request (in Wei)" value={this.state.value} onChange={(event)=> this.setState({value: event.target.value})} />
                        </FormItem>
                        <FormItem
                            label="Vendor"
                            {...formItemLayout}
                        >
                            <Input placeholder="Vendor details" value={this.state.recipient} onChange={(event)=> this.setState({recipient: event.target.value})} />
                        </FormItem>
                        <FormItem
                            label="Minimum"
                            {...formItemLayout}
                        >
                             <Input placeholder="Minimum" value={this.state.min} onChange={(event)=> this.setState({min: event.target.value})} />
                        </FormItem>
                        <FormItem
                            label="Mnemonic"
                            {...formItemLayout}
                        >
                             <Input placeholder="Mnemonic" value={this.state.pass} onChange={(event)=> this.setState({pass: event.target.value})}/>
                        </FormItem>
                        <FormItem {...buttonItemLayout}>
                            <Button type="primary" onClick={()=> createRequest(this.state.address, this.state.description, this.state.contact, this.state.value, this.state.recipient ,this.state.min, this.state.pass)}>Submit</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </div>
    );
  }
}

export default NewRequest;
