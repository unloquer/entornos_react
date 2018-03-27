import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SimpleNav from '../common/SimpleNav';
import routeConfig from '../../common/routeConfig';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {connect} from 'react-redux';
import { Route,Link, Switch } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router. The default one is a two columns layout.
  You should adjust it according to the requirement of your app.
*/
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

 class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: 'No content.',
  };

  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
//    console.log(collapsed);
    this.setState({ collapsed });
  }

  componentWillMount(props){

    this.props.actions.fetchEnvironms()
    console.log('context', this.context) 

  }

  render() {
    return (

      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu key="sub1"
             title={ <Link to="/entornos"><span><Icon type="api" />
              <span>Entornos</span></span></Link>} >
              <Menu.Item key="3">Flores</Menu.Item>
              <Menu.Item key="4">Leguminosas</Menu.Item>
              <Menu.Item key="5">Maria</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<Link to="/devices"><span><Icon type="fork" /><span>Dispositivos</span></span></Link>}
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              <Route path="/devices" component={ AppBreadCrumb('dispositivos') } />
              <Route path="/entornos" component={ AppBreadCrumb('entornos') } />
            </Switch>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
             {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Laboratorios Humedos @2018 Upayacu
          </Footer>
        </Layout>
      </Layout>
    );

  }
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}
export default connect(state => state, mapDispatchToProps)(App)

function AppBreadCrumb (text) {

  return () => (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>{text}</Breadcrumb.Item>
      <Breadcrumb.Item></Breadcrumb.Item>
    </Breadcrumb>
  )
}
