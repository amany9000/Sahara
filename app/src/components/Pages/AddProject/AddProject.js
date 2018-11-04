import React, { Component } from 'react';
import '../../../App.css';
import { Form, Input, Button} from 'antd';
import { Row, Col, Divider } from 'antd';
import { Switch } from 'antd';
import {deployInt} from '../../../ethereum/store';

const FormItem = Form.Item;

class AddProject extends Component {
    constructor() {
        super();
        this.state = {
          formLayout: 'horizontal',
          name: '',
          description: '',
          founder: '',
          contact:''
        };
      }
      

  render() {
      console.log(this.props.match.params.mnemonic);
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
                    <h1 style={{display: "flex", justifyContent: "center"}}>Add new Project</h1>
                    <Form layout={formLayout}>
                        <FormItem
                            label="Project Name"
                            {...formItemLayout}
                        >
                            <Input placeholder="Name of project" value={this.state.name} onChange={(event) => this.setState({name: event.target.value})}/>
                        </FormItem>
                        <FormItem
                            label="Description"
                            {...formItemLayout}
                        >
                            <TextArea rows={4} value={this.state.description} onChange={(event) => this.setState({description: event.target.value})}/>
                        </FormItem>
                        <FormItem
                            label="Founder"
                            {...formItemLayout}
                        >
                            <Input placeholder="Name of founder" value={this.state.founder} onChange={(event) => this.setState({founder: event.target.value})}/>
                        </FormItem>
                        <FormItem
                            label="Contact"
                            {...formItemLayout}
                        >
                            <Input placeholder="Contact details" value={this.state.contact} onChange={(event) => this.setState({contact: event.target.value})}/>
                        </FormItem>
                        <FormItem {...buttonItemLayout}>
                            <Button type="primary" onClick={()=> deployInt(this.state.name, this.state.description, this.state.founder, this.state.contact, this.props.match.params.mnemonic).then((res) => {
                                console.log("hello")})}>Submit</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </div>
    );
  }
}

export default AddProject;
