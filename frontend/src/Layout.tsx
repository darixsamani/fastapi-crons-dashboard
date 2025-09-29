import React from 'react';
import {UserOutlined, HomeOutlined } from '@ant-design/icons';
import { SiIobroker } from "react-icons/si";
import { FaShareNodes } from "react-icons/fa6";
import { MdSubscriptions, MdPublish, MdTopic } from "react-icons/md";
import { BsPlugin } from "react-icons/bs";
import { TbRouteSquare2 } from "react-icons/tb";
import { IoStatsChart } from "react-icons/io5";
import { SiVictoriametrics } from "react-icons/si";
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';

const { Header, Content, Footer, Sider } = Layout;



const items: MenuProps['items'] = [

  {
    key: "/",
    icon: React.createElement(HomeOutlined),
    label: "Home"

  },

  {
    key: "/api",
    icon: React.createElement(SiIobroker),
    label: "API"

  },

] ;




const LayoutApp: React.FC = () => {

  const navigation = useNavigate();
  const {pathname}  = useLocation()
  console.log("pathname", pathname)

  const onClick: MenuProps['onClick'] = (e) => {
  
    navigation(e.key);
  
  };


  
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

  return (
    <Layout hasSider >
    <Sider
      style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
     >
      <div className="demo-logo-vertical" />
      <Menu onClick={onClick} theme="dark" mode="inline" defaultSelectedKeys={[pathname]} items={items} />
    </Sider>
    <Layout style={{ marginLeft: 200 }}>
              <Header style={{ padding: 0, background: colorBgContainer }} />
              
              <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div
              style={{
                padding: 24,
                textAlign: 'center',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }} >
                  <Outlet />
              </div>
              </Content>
              <Footer style={{ 
        borderTop: '1px solid #e8e8e8',
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        textAlign: 'center'}}>
              Fastapi Crons ©{new Date().getFullYear()} dashboard Created by <Link to="https://github.com/darixsamani" target="_blank" rel="noopener noreferrer" > @darixsamani </Link>
              </Footer>
      </Layout>
    </Layout>
        );
       
}

export default LayoutApp;