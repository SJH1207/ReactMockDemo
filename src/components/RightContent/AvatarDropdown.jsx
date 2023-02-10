import React, { useCallback, useEffect, useState } from 'react';
import { LogoutOutlined, MenuUnfoldOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Menu, Spin } from 'antd';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { outLogin } from '@/services/ant-design-pro/api';
import { getTodoLists } from '@/services/todo';
import { connect } from 'umi';

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await outLogin();
  const { query = {}, pathname } = history.location;
  const { redirect } = query; // Note: There may be security issues, please note

  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname,
      }),
    });
  }
};

const AvatarDropdown = (props, { menu }) => {

  // // 方法1：发送请求获得数据
  // const [data, setData] = useState(0)
  // useEffect(() => {
  //   async function getTodoData() {
  //     // 获取todolists数据
  //     const todoList = await getTodoLists()
  //     // 筛选数据
  //     const data = todoList.filter(item => item.status === 0).length
  //     // console.log(data);
  //     // 修改状态
  //     setData(data)
  //   }
  //   getTodoData();
  // }, []);
  // console.log('data', data);

  // 方法2：使用model获得数据
  // console.log('props:', props.dispatch);
  const { dispatch } = props;
  console.log(dispatch);
  useEffect(() => {
    dispatch({
      type: 'todo/getTodoList'
    }).then(() => {
      // console.log('@@', props);
      console.log('props:', props.dispatch);
    });
  }, [])
  const data = props.todo.todoList.filter(item => item.status === 0).length



  const { initialState, setInitialState } = useModel('@@initialState');
  const onMenuClick = useCallback(
    (event) => {
      const { key } = event;

      if (key === 'todo') {
        history.push('./todo')
        return
      }

      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        loginOut();
        return;
      }

      history.push(`/account/${key}`);
    },
    [setInitialState],
  );
  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="todo">
        <MenuUnfoldOutlined />
        待办事项
        <Badge count={data} offset={[10, 0]} />
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>{currentUser.name}
          <Badge count={data} dot={true} />

        </span>
      </span>
    </HeaderDropdown>
  );
};

// export default AvatarDropdown;
// export default connect(({ todo }) => {
//   return { todo }
// })(AvatarDropdown);
// 简写
export default connect(({ todo }) => ({ todo }))(AvatarDropdown)


