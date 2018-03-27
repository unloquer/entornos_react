import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Input, Modal, Table, Button } from 'antd';
import { Route,Link, Switch } from 'react-router-dom';
import DeviceConfig from './DeviceConfig';

const {TextArea} = Input

export class DevicesList extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  columns = [


    { title: 'name', dataIndex: 'name', key: 'name', render: (t,r) => (<Link to={`/devices/${r.name}`} >{t}</Link>)},
    { title: 'description', dataIndex: 'description', key: 'description' },
    { title: 'Action', dataIndex: '', key: 'x', render: () => <a href="#">Delete</a> },

  ]

  state = {
    loading: false,
    visible: false,
  }

  newDevice = {
    name: null, 
    description: null 
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({ loading: true });
    const {name, description} = this.newDevice
    this.props.actions.addDevice(name, description)
    console.log(name, description)
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleOnChange = (field) => (e, value) => {

    this.newDevice[field] = e.target.value
  }

  componentWillMount (props) {
    console.log(props)
    this.props.actions.fetchDevices()

  }

  render() {

    const {visible, loading} = this.state
    return (

      <div className="home-devices-list">
        <div className="table-operations">
          <Button onClick={this.showModal}>Agrega dispositivo</Button>
          <DeviceConfig />
        </div>

        <Modal

          visible={visible}
          title="Nuevo dispositivo"
          onOk={this.handleOk}
          onCancel={this.handleCancel}

          footer={[
            <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <div className="modal-add-input">
            <Input onChange= {this.handleOnChange('name')} size="large" placeholder="nombre" />
            <TextArea  onChange= {this.handleOnChange('description')} size="large" placeholder="descripcion" autosize/>
          </div>
        </Modal>

        <Table rowKey='_id'
          columns={this.columns}
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.descripcion}</p>}
          dataSource={this.props.home.devices}
        />

      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
    devices : state.devices
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
)(DevicesList);
