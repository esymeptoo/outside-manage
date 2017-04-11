/**
 * Created by e on 17/4/10.
 */
/**
 * Created by e on 17/3/29.
 */
import React, { PropTypes, Component } from 'react';
import Layout from '../../components/appLayout';
import { connect } from 'dva';
import {Popconfirm, Table, Button,Row ,Col, Modal, Spin, message, Form, Input} from 'antd';
const FormItem = Form.Item;
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
            limit: 10,
            page: 1,
            visible: false,
            goods_id: '',
        }
    }
    /*商品列表分页器 页码点击事件*/
    pageChange = (page) => {
        this.setState({
            page: page,
        });
        this.props.dispatch({
            type: 'brandList/queryBrand',
            payload: {
                limit: this.state.limit,
                page: page,
            }
        });
    };
    /*商品列表删除*/
    confirmDelete = (goods_id) => {
        this.props.dispatch({
            type: 'brandList/goodsDelete',
            payload: {
                goods_id: goods_id,
                limit: this.state.limit,
                page: this.state.page,
            }
        })
    };
    /*show 模态框*/
    showModal = (record) => {
        this.setState({
            visible: true,
            goods_id: record.goods_id,
        });
        this.props.form.resetFields();
        this.props.dispatch({
            type: 'brandList/queryStyles',
            payload: {
                goods_id: record.goods_id,
            }
        })
    };
    /*提交表单*/
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.goods_id = this.state.goods_id,
                this.props.dispatch({
                    type: 'brandList/saveStyles',
                    payload: {
                        styles: values,
                    }
                });
                this.abandon();
            }
        });
    };
    /*点击编辑属性 将数据映射到表单*/
    stylesEdit = (record) => {
        this.props.form.setFieldsValue(record);
    };
    /*清空按钮*/
    abandon = () => {
        this.props.form.resetFields();
    };
    //删除属性
    confirmStylesDelete = (_id) => {
        this.props.dispatch({
            type: 'brandList/deleteStyles',
            payload: {
                _id: _id,
            }
        })
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const styles_child = this.props.brandList.styles.map((e) => {
            return (
                <p>
                    <span>{e.color}</span>
                    <span>{e.goods_price}</span>
                    <span>{e.goods_num}</span>
                    <span>编辑</span>
                </p>
            )
        });
        const columns = [
        {
            title: '图片',
            dataIndex: 'cover',
            key: 'cover',
            render: (text, record) => {
                return (
                    <p className={styles.img}>
                        <img src={text.split(',')[0]} alt=""/>
                    </p>
                )
            }
        },{
            title: '商品',
            dataIndex: 'goods_name',
            key: 'name',
        },{
            title: '数量',
            dataIndex: 'number',
            key: 'number',
        }, {
            title: '价格',
            dataIndex: 'lowest_price',
            key: 'lowest_price',
        }, {
            title: '操作',
            dataIndex: 'goods_id',
            key: 'goods_id',
            render: (text, record)=> {
                return (
                    <p>
                        <a href={edit + 'addGoods?id=' + text} target="_blank">编辑</a>&nbsp;&nbsp;
                        <Popconfirm title="确定要删除?" onConfirm={() => {this.confirmDelete(text)}} okText="Yes" cancelText="No">
                            <a>删除</a>
                        </Popconfirm>&nbsp;&nbsp;
                        <a onClick={() => {this.showModal(record)}}>配置属性</a>
                    </p>
                )
            }
        }];
        const styles_columns = [
            {
                title: '属性',
                dataIndex: 'color',
                key: 'color',
            },{
                title: '价格',
                dataIndex: 'goods_price',
                key: 'goods_price',
            },{
                title: '数量',
                dataIndex: 'goods_num',
                key: 'goods_num',
            }, {
                title: '操作',
                dataIndex: '_id',
                key: '_id',
                render: (text, record)=> {
                    return (
                        <p>
                            <a onClick={() => {this.stylesEdit(record)}}>编辑</a>&nbsp;&nbsp;
                            <Popconfirm title="确定要删除?" onConfirm={() => {this.confirmStylesDelete(text)}} okText="Yes" cancelText="No">
                                <a>删除</a>
                            </Popconfirm>&nbsp;&nbsp;
                        </p>
                    )
                }
            }];
        return (
            <Layout location={this.props.location}>
                <Row>
                    <Col span={24}>
                        <h2>商品列表</h2>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{textAlign: 'right'}}>
                        <a href={edit + 'addGoods'} target="_blank">
                            <Button type="primary" style={{marginBottom: '10px'}}>新增商品</Button>
                        </a>
                    </Col>
                </Row>
                <Modal title="配置一级属性" visible={this.state.visible}
                       footer={null}
                       onCancel={() => {this.setState({visible: false})}}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('_id', {

                            })(
                                <Input placeholder="Username" hidden/>
                            )}
                        </FormItem>
                        <FormItem label="属性">
                            {getFieldDecorator('color', {
                                rules: [{ required: true, message: '请添写属性!' }],
                            })(
                                <Input placeholder="属性"/>
                            )}
                        </FormItem>
                        <FormItem label="商价格">
                            {getFieldDecorator('goods_price', {
                                rules: [{ required: true, message: '请填写价格' }],
                            })(
                                <Input type="number" placeholder="价格  单位:元"/>
                            )}
                        </FormItem>
                        <FormItem label="库存">
                            {getFieldDecorator('goods_num', {
                                rules: [{ required: true, message: '请填写库存' }],
                            })(
                                <Input type="number" placeholder="库存  单位:个"/>
                            )}
                        </FormItem>
                        <FormItem style={{textAlign: 'center'}}>
                            <p style={{display: 'inline'}}>
                                <Button type="primary" size="large" htmlType="submit">保存</Button>&nbsp;&nbsp;
                                <Button type="primary" size="large" onClick={() => {this.abandon()}}>清空</Button>
                            </p>
                        </FormItem>
                    </Form>
                    <Table className={styles.styles} columns={styles_columns}
                           dataSource={this.props.brandList.styles}
                           rowKey={record=>record.id}
                           loading={this.props.brandList.loading1}
                    />
                </Modal>
                <Table className={styles.daily} columns={columns}
                       loading={this.props.brandList.loading}
                       dataSource={this.props.brandList.list}
                       rowKey={record=>record.id}
                       pagination={{showQuickJumper:true, pageSize:10, total: this.props.brandList.total, onChange:(val) => {this.pageChange(val)}}}
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
export default connect(mapStateToProps)(Form.create()(Newspaper));
