/**
 * Created by e on 17/3/29.
 */
import React, { PropTypes, Component } from 'react';
import Layout from '../../components/appLayout';
import { connect } from 'dva';
import {Popconfirm, Table, Button,Row ,Col, Modal, Spin, message} from 'antd';
import styles from './index.less';
import { Link } from 'dva/router';

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
                        <a>编辑</a>&nbsp;&nbsp;
                        <Popconfirm title="确定要删除?" onConfirm={() => {this.confirmDelete(text)}} okText="Yes" cancelText="No">
                            <a>删除</a>
                        </Popconfirm>&nbsp;&nbsp;
                        <a href="https://www.baidu.com" target="_blank">预览</a>
                    </p>
                )
            }
        }];
        return (
            <Layout location={this.props.location}>
                <div className={styles.title}>每日一趣
                    <Button type="primary" className={styles.new}>新增趣闻</Button>
                </div>
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
