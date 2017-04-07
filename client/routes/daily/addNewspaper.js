/**
 * Created by e on 17/4/3.
 */
/**
 * Created by e on 17/3/29.
 */
import React, { PropTypes, Component } from 'react';
import Layout from '../../components/appLayout';
import { connect } from 'dva';
import {Popconfirm, Table, Button,Row ,Col, Modal, Spin, message, Form} from 'antd';
import { Link } from 'dva/router';

class addNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Layout location={this.props.location} showSider={null}>
                <p>每日一趣</p>
                <Row style={{marginTop: '20px', height: 'auto' , paddingTop: '20px'}}>
                    <Col lg={12} md={12} sm={24} style={{height: 'auto', paddingTop: '20px', textAlign: 'center', marginBottom: '30px'}}>
                        <p>哈哈</p>
                    </Col>
                    <Col lg={12} md={12} sm={24} style={{height: 'auto', paddingTop: '20px', textAlign: 'center', marginBottom: '30px'}}>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

addNews.propTypes = {
    location: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return state;
}
//建立数据联系 model和component
export default connect(mapStateToProps)(Form.create()(addNews));
