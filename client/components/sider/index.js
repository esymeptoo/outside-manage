/**
 * Created by e on 17/3/29.
 */
import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
/*const Sider = ({ location, otherProps }) => {
 };*/
class Sider extends React.Component {
    constructor(props) {
        super(props);
        //获得路径的名称，来定位下拉菜单
        let openKey = location.hash.split('/')[1]
        let currentmp = location.hash.split('/')[2]
        let current = currentmp.split('?')[0]
        this.state = {
            openKeys : [openKey],
            currents : [current]
        }
    }
    handleClick = (e) => {
        this.setState({
            currents: [e.key],
        });
    }
    render(){
        return (
            <Menu
                onClick={this.handleClick}
                openKeys = {this.state.openKeys}
                defaultSelectedKeys={['newspaper']}
                defaultOpenKeys={['daily']}
                selectedKeys = {this.state.currents}
                mode="inline"
            >
                <SubMenu key="daily" title={<span onClick={()=>this.setState({openKeys : ["daily"]})}><Icon type="file" /><span>每日一趣</span></span>}>
                    <Menu.Item key="newspaper"><Link to="/daily/newspaper">新闻列表</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="pushTask" title={<span onClick={()=>this.setState({openKeys : ["pushTask"]})}><Icon type="appstore" /><span>官方活动</span></span>}>
                    <Menu.Item key="list"><Link to="/activity/list">活动列表</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="system" title={<span onClick={()=>this.setState({openKeys : ["system"]})}><Icon type="setting" /><span>商品管理</span></span>}>
                    <Menu.Item key="userList"><Link to="/brand/list">商品列表</Link></Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}
Sider.propTypes = {
    location: PropTypes.any,
};
export default Sider;
