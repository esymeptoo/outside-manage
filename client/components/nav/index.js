/**
 * Created by e on 17/3/29.
 */
import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Menu } from 'antd';
const Nav = ({  otherProps }) => {
    function exit() {
        localStorage.removeItem('admin');
        localStorage.removeItem('isLogin');
        location.href= "/?#/user/login";
    }
    return (<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['tool']}
                  selectedKeys={[location.pathname.split('/')[1]]} {...otherProps}>
        <Menu.Item key="tool">
            <Link to="/">工具</Link>
        </Menu.Item>
        <Menu.Item key="user" style={{float: 'right'}}>
            <a href="javascript:void(0)" onClick={() => {exit()}}>{localStorage.admin}&nbsp;&nbsp;退出</a>
        </Menu.Item>
    </Menu>)
};
Nav.propTypes = {
    location: PropTypes.any,
};
export default Nav;
