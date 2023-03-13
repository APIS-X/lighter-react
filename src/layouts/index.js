import React, { useState, useEffect } from 'react';
import { Breadcrumb, Layout, Menu, theme, Dropdown, Avatar, Space } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { routerList, routerMaps } from '@/routers';
import { userStore } from '@/stores';

import logo from '@/assets/logo.png';

const { Header, Content, Sider } = Layout;

const items = [
  {
    key: 'logout',
    label: '退出',
  },
];

const styleHeader = {
  background: '#FFF',
};

const LayoutPage = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(['list-table']);

  const { userInfo, getUserInfo } = userStore();

  useEffect(() => {
    getUserInfo();
  }, []);

  const styleContent = {
    padding: 24,
    margin: 0,
    background: colorBgContainer,
  };

  const onChangeMenu = ({ key, keyPath, domEvent }) => {
    const { path } = routerMaps[key];
    console.log('path', routerMaps[key], key, keyPath);
    setSelectedKeys([key]);
    navigate(path);
  };
  const onOpenChange = (openKeys) => {
    console.log('openKey', openKeys);
    setOpenKeys([openKeys.pop()]);
  };
  const onSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    console.log('abc', item, key, keyPath, selectedKeys, domEvent);
  };

  return (
    <Layout className='layout-screen'>
      <Sider
        className='layout-sider'
        collapsible
        width={200}
        collapsedWidth={60}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className={collapsed ? 'logo collapsed' : 'logo'}>
          <img src={logo} alt='' />
          <span className='title'>{collapsed ? '' : '工具平台'}</span>
        </div>
        <Menu
          mode='inline'
          theme='dark'
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          items={routerList}
          onClick={onChangeMenu}
          onOpenChange={onOpenChange}
          onSelect={onSelect}
        />
      </Sider>
      <Layout className='layout-right'>
        <Header className='layout-header' style={styleHeader}>
          <Dropdown menu={{ items }}>
            <Space>
              <Avatar icon={<UserOutlined />} />
              超级管理员
              <DownOutlined />
            </Space>
          </Dropdown>
        </Header>
        <Layout className='layout-content'>
          <Breadcrumb />
          <Content style={styleContent}>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default LayoutPage;
