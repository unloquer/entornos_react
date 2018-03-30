import _ from 'underscore'
import React, { Component } from 'react';
import { Form, Select, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class DeviceConfig extends Component {
  static propTypes = {

  };

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
    console.log(this.props.networks);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  renderOptions = () => {
    return _.map(this.props.networks, n => <Option key={n.bssid} value={n.essid}>{n.essid}</Option>)
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const deviceNameError = isFieldTouched('deviceName') && getFieldError('deviceName');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <div className="home-device-config">
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <span className="ant-row ant-form-item text"><Icon type="wifi" style={{ fontSize: 16, color: '#0F0' }} /></span>
          <span className="ant-row ant-form-item text">Nombre de red</span>
          <FormItem>
            {getFieldDecorator('network', {
               rules: [{ required: true, message: 'Nombre de red!' }],
            })(
               <Select
                 placeholder="Select a option and change input text above"
                 onChange={this.handleSelectChange}
                 >
                 {this.renderOptions()}
               </Select>
             )}
          </FormItem>
          <FormItem
            validateStatus={deviceNameError ? 'error' : ''}
            help={deviceNameError || ''}
          >
            {getFieldDecorator('deviceName', {
               rules: [{ required: true, message: 'Nombre del dispositivo!' }],
            })(
               <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nombre dispositivo" />
             )}
          </FormItem>
          <FormItem
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
               rules: [{ required: true, message: 'La contraseña del dispositivo!' }],
            })(
               <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña del dispositivo" />
             )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Conectar
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(DeviceConfig);
