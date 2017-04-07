/**
 * Created by e on 17/3/29.
 */
import React, { PropTypes, Component } from 'react';
import Layout from '../../components/appLayout';
import { connect } from 'dva';
import {Popconfirm, Table, Button,Row ,Col, Modal, Spin, message} from 'antd';
import styles from './index.less';
import { Link } from 'dva/router';
import { edit, edit1 } from '../../../server/config/development';

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

class Newspaper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    confirmDelete = (_id) => {
        this.props.dispatch({
            type: 'newspaper/newsDelete',
            payload: {
                _id: _id,
            }
        })
    };
    render() {
        const columns = [{
            title: '时间',
            dataIndex: 'date',
            key: 'date',
            render: (text, record) => {
                return (
                    <p>{new Date(text).Format("yyyy-MM-dd")}</p>
                )
            }
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            dataIndex: '_id',
            key: '_id',
            render: (text, record)=> {
                return (
                    <p>
                        <a href={edit + 'addNews?id=' + text} target="_blank">编辑</a>&nbsp;&nbsp;
                        <Popconfirm title="确定要删除?" onConfirm={() => {this.confirmDelete(text)}} okText="Yes" cancelText="No">
                            <a>删除</a>
                        </Popconfirm>
                    </p>
                )
            }
        }];
        return (
            <Layout location={this.props.location}>
                <Row>
                    <Col span={24}>
                        <h2>每日一趣</h2>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{textAlign: 'right'}}>
                        <a href={edit + 'addNews'} target="_blank">
                            <Button type="primary" style={{marginBottom: '10px'}}>新增趣味</Button>
                        </a>
                    </Col>
                </Row>
                <Table className={styles.daily} columns={columns}
                       loading={this.props.newspaper.loading}
                       dataSource={this.props.newspaper.list}
                       rowKey={record=>record.id}
                       pagination={{showQuickJumper:true, pageSize:10, total: this.props.newspaper.total}}
                />
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
