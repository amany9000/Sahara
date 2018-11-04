import React, { Component } from 'react';
import '../../../App.css';
import { List, Avatar, Button, Spin, Menu, Icon, Divider } from 'antd';
import { Row, Col } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import reqwest from 'reqwest';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

class RequestList extends Component {
  state = {
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    data: [],
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
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
    });

  
  }
  render() {
    console.log(this.props.mnemonic);
    const { loading, loadingMore, showLoadingMore, data } = this.state;
    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
      </div>
    ) : null;
    return (
      <div>
        <Row type="flex" justify="center">
        <Col xs={20} sm={16} md={12} lg={18} xl={12}>
        <div>
          <br />
        <h2>Present Requirements
        <Button style={{float: "right", display: "flex"}}><Link to="/newrequest">New Request</Link></Button>
        </h2>
        <Divider ></Divider>
          <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={data}
            renderItem={item => (
              <List.Item
              // actions={[<a>edit</a>, <a>more</a>]}
              >
                <List.Item.Meta
                  // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  // title={<a href="https://ant.design">{item.name.last}</a>}
                  // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  description={<Link to={"/requests/" + "id_of_request" }>description</Link>}
                />
                <div>Value : $ 1000</div>
              </List.Item>
            )}
          />
      </div>
        </Col>
      </Row>
      </div>
    );
  }
}


export default RequestList;
