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
                    <Menu.Item key="newspaper"><Link to="/daily/newspaper">新闻</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="pushTask" title={<span onClick={()=>this.setState({openKeys : ["pushTask"]})}><Icon type="appstore" /><span>推送管理</span></span>}>
                    <Menu.Item key="list"><Link to="/pushTask/list">推送管理</Link></Menu.Item>
                    <Menu.Item key="subReplyList"><Link to="/pushTask/subReplyList">关注自动回复</Link></Menu.Item>
                    <Menu.Item key="wordReplyList"><Link to="/pushTask/wordReplyList">关键字自动回复</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="system" title={<span onClick={()=>this.setState({openKeys : ["system"]})}><Icon type="setting" /><span>系统设置</span></span>}>
                    <Menu.Item key="userList"><Link to="/system/userList">用户管理</Link></Menu.Item>
                    <Menu.Item key="groupList"><Link to="/system/groupList">群组管理</Link></Menu.Item>
                    <Menu.Item key="appSetting"><Link to="/system/appSetting">公众号配置</Link></Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}
Sider.propTypes = {
    location: PropTypes.any,
};
export default Sider;
