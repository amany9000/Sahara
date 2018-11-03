import React, { Component } from 'react';
import '../../../App.css';
import { Form, Input, Button} from 'antd';
import { Row, Col, Divider } from 'antd';
import { Switch } from 'antd';


const FormItem = Form.Item;


class NewRequest extends Component {
    constructor() {
        super();
        this.state = {
          formLayout: 'horizontal',
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
                            label="Description"
                            {...formItemLayout}
                        >
                            <TextArea rows={4} />
                        </FormItem>
                        <FormItem
                            label="Project"
                            {...formItemLayout}
                        >
                            {/* <Input placeholder="Name of founder" /> */}
                            <p>0x987F619229903cf59fB9a79De1875A12f5409Bbf</p>
                        </FormItem>
                        <FormItem
                            label="Value (Wei)"
                            {...formItemLayout}
                        >
                            <Input placeholder="Value of the request (in Wei)" />
                        </FormItem>
                        <FormItem
                            label="Vendor"
                            {...formItemLayout}
                        >
                            <Input placeholder="Contact details" />
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </div>
    );
  }
}

export default NewRequest;
