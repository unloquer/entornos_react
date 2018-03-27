import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Input, Modal, Table, Button } from 'antd';

const {TextArea} = Input

export class Entorno extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  columns = [

    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Descripcion', dataIndex: 'description', key: 'description' },
    { title: 'Action', dataIndex: '', key: 'x', render: () => <a href="#">Delete</a> },
  ]

  state = {
    loading: false,
    visible: false,
  }


  newSensor= {

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
    const {name, description} = this.newSensor 

    console.log('name', this.props)
    this.props.actions.addSensor(this.props.entorno._id, {name, description})
    console.log(name, description)
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleOnChange = (field) => (e, value) => {

    this.newSensor[field] = e.target.value   


  }

  componentWillMount() {
    this.props.actions.fetchSensors(this.props.entornoId)
//   console.log('sasa', state); 

  }

  render() {
console.log('stateRender', this.state)
    const {visible, loading} = this.state

    return (

      <div className="home-entorno">
        <div className="table-operations">

          <Button onClick={this.showModal}>Agrega sensor</Button>

        </div>

        <Modal

          visible={visible}
          title="Nuevo Sensor"
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
          dataSource={this.props.home.sensors}
        />

      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state, props) {
  
  const name = props.match.params.name
  console.log('stateMap', state)
  console.log('propsMap', props)
  return {
    home: state.home,
    entornoId: state.home.activeEntornoId,
    sensors : state.home.sensors,

    entorno: state.home.entornos.find(e => e.name === name) || {}
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
)(Entorno);
