/**
 * Created by e on 17/3/29.
 */
import React, { PropTypes, Component } from 'react';
import Sider from '../sider';
import Nav from '../nav';
import Layout from '../layout';

class AppLayout extends Component {
    constructor (props) {
        super(props);
    }
    nav = <Nav location={this.props.location}/>;
    sider = <Sider location={this.props.location}/>;
    option = {
        nav: this.nav,
        sider: this.props.showSider ? this.sider : null,
    };
    render() {
        return (<Layout {...this.option}>{this.props.children}</Layout>)
    }
}
AppLayout.propTypes = {
    location: PropTypes.object.isRequired,
    showSider: PropTypes.bool,
    showNav: PropTypes.bool,
    children: PropTypes.node,
};
AppLayout.defaultProps = {
    showSider: true,
};
export default AppLayout;
