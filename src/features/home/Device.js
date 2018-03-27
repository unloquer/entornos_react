import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Input, Modal, Table, Button, Menu, Dropdown, Icon, Badge } from 'antd';

export class Device extends Component {

  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props){
    super(props)


    for (let i = 0; i < 3; ++i) {
      this.data.push({
        key: i,
        name: 'Screem',
        platform: 'iOS',
        version: '10.3.4.5654',
        upgradeNum: 500,
        creator: 'Jack',
        createdAt: '2014-12-24 23:12:00',
      })

    }
  }
  net_menu = (
    <Menu>
    <Menu.Item>
    Action 1
    </Menu.Item>
    <Menu.Item>
    Action 2
    </Menu.Item>
    </Menu>
  )

  columns = [

    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Platform', dataIndex: 'platform', key: 'platform' },
    { title: 'Version', dataIndex: 'version', key: 'version' },
    { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action', key: 'operation', render: () => <a href="#">Publish</a> },
  ]

  data = [];

  expandedRowRender = () => {

      const   columns = [

      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Status', key: 'state', render: () => <span><Badge status="success" />Finished</span> },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <span className="table-operation">
            <a href="#">Pause</a>
            <a href="#">Stop</a>
            <Dropdown overlay={this.net_menu}>
              <a href="#">
                More <Icon type="down" />
              </a>
            </Dropdown>
          </span>
        ),
      },
    ]

    const data = [];
    
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    );
  }

  render() {
    return (
      <div className="home-device">
        <Table className="components-table-demo-nested"
          columns={this.columns}
          expandedRowRender={this.expandedRowRender}
          dataSource={this.data}
        />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Device);
