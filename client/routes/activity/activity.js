/**
 * Created by e on 17/3/29.
 */
import React, { PropTypes, Component } from 'react';
import Layout from '../../components/appLayout';
import { connect } from 'dva';
import {Popconfirm, Table, Button,Row ,Col, Modal, Spin, message} from 'antd';
import styles from './index.less';
import { Link } from 'dva/router';
import { edit1 } from '../../../server/config/development';

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
class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,
            page: 1,
        }
    }
    pageChange = (page) => {
        this.setState({
            page: page,
        });
        this.props.dispatch({
            type: 'activity/queryActivity',
            payload: {
                limit: this.state.limit,
                page: page,
            }
        });
    };
    confirmDelete = (_id) => {
        this.props.dispatch({
            type: 'activity/activityDelete',
            payload: {
                _id: _id,
                limit: this.state.limit,
                page: this.state.page,
            }
        })
    };
    render() {
        const columns = [{
            title: '截止日期',
            dataIndex: 'end_date',
            key: 'end_date',
            render: (text, record) => {
                return (
                    <p>{new Date(text).Format("yyyy-MM-dd")}</p>
                )
            }
        }, {
            title: '活动状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                const current = new Date();
                let less = current - text;
                if (status) {
                    return (
                        <p>活动已结束</p>
                    )
                } else if (less >= 0) {
                    return (
                        <p>活动进行中</p>
                    )
                } else {
                    return (
                        <p>活动未开始</p>
                    )
                }
            }
        }, {
            title: '主题',
            dataIndex: 'activity_title',
            key: 'activity_title',
        }, {
            title: '限制人数',
            dataIndex: 'limit',
            key: 'limit',
        }, {
            title: '报名人数',
            dataIndex: 'join_num',
            key: 'join_num',
            render: (text, record) => {
                return (
                    <p>{text+ 1}</p>
                )
            }
        }, {
            dataIndex: '_id',
            key: '_id',
            render: (text, record)=> {
                return (
                    <p>
                        <Popconfirm title="确定要删除?" onConfirm={() => {this.confirmDelete(text)}} okText="Yes" cancelText="No">
                            <a>删除</a>
                        </Popconfirm>&nbsp;&nbsp;
                        <a href={edit1 + 'activity/join?id=' + record.activity_id} target="_blank">预览</a>
                    </p>
                )
            }
        }];
        return (
            <Layout location={this.props.location}>
                <div className={styles.title}>官方活动
                    <a href={edit1 + 'activity/launch?type=0'} target="_blank">
                        <Button type="primary" className={styles.new}>新增活动</Button>
                    </a>
                </div>
                <Table className={styles.activity} columns={columns}
                       loading={this.props.activity.loading}
                       dataSource={this.props.activity.list}
                       rowKey={record=>record.id}
                       pagination={{showQuickJumper:true, pageSize:10, total: this.props.activity.total, onChange:(val) => {this.pageChange(val)}}}
                />
            </Layout>
        )
    }
}

Activity.propTypes = {
    location: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return state;
}
//建立数据联系 model和component
export default connect(mapStateToProps)(Activity);
