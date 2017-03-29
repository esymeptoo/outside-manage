/**
 * Created by e on 17/3/29.
 */
import React, { PropTypes, Component } from 'react';
import Layout from '../../components/appLayout';
import { connect } from 'dva';
import {Select,Form ,Popconfirm, Table,Icon,Input, Button,Row ,Col, Modal, Spin, message} from 'antd';
const FormItem = Form.Item;

class Newspaper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Layout location={this.props.location}>
                <div>每日一趣</div>
            </Layout>
        )
    }
}

Newspaper.propTypes = {
    location: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return state;
}
//建立数据联系 model和component
export default connect(mapStateToProps)(Newspaper);
