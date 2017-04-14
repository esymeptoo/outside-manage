import React, { PropTypes, Component } from 'react';
import { message } from 'antd';
import { connect } from 'dva';
class Login  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password:""
    };
  }
  login = () => {
    const userName = this.state.username;
    const password = this.state.password;
    if (userName == '' || password == '') {
      message.warn('账号密码不能为空');
    } else {
      if (userName == 'wosai' && password == 'wosai123') {
        location.href = '/?#/daily/newspaper?_k=97kjm2'
      } else {
        message.warn('该账户不存在,请重试');
      }
    }
  };
  render() {
    return (
      <div style={{padding: '0', margin: '0', marginTop: '100px'}}>
        <div style={{margin: '0',paddingTop: '0.6rem', paddingBottom: '0.4rem',textAlign: 'center',fontSize: '23px',fontWeight: '600', color: '#9e9fa1'}}>粉丝运营平台</div>
        <div style={{padding: '0', margin: '0'}}>
          <div style={{margin: 'auto',padding: '10px',boxSizing: 'border-box',width: '300px',height: '220px',backgroundColor: '#ffffff',borderRadius: '3px',boxShadow: '0 0 6px 3px #cacbcc'}}>
            <div style={{margin: '0',padding: '0',boxSizing: 'border-box',textAlign: 'center',fontSize: '26px',color: '#e6b243'}}>登录</div>
            <div style={{margin: 'auto',padding: '0',boxSizing: 'border-box'}}>
              <form action="" id="login_form">
                <li style={{paddingLeft: '4px',listStyle: 'none',marginTop: '10px',borderRadius: '5px',textAlign: 'left',border: '2px solid #fff1f1',height: '30px',lineHeight: '30px'}}><span>账号:</span>
                  <input value={this.state.username} onChange={(event) => { this.setState({username: event.target.value});}}
                         id="admin" type="text" style={{height: '20px', width: '230px',borderRadius: '5px',borderWidth: '0', outline: 'none', textIndent: '10px'}} />
                </li>
                <li style={{paddingLeft: '4px',listStyle: 'none',marginTop: '10px',borderRadius: '5px',textAlign: 'left',border: '2px solid #f1f1f1',height: '30px',lineHeight: '30px'}}><span>密码:</span>
                  <input value={this.state.password} onChange={(event) => { this.setState({password: event.target.value});}}
                         id="password" type="password" style={{height: '20px', width: '230px',borderRadius: '5px',borderWidth: '0', outline: 'none', textIndent: '10px'}}/>
                </li>
                <div>
                  <input type="submit" id="login"  onClick={()=> {this.login()}} style={{outline: 'none',width: '90%',display: 'block',margin: 'auto',backgroundColor: '#7168ff',color: 'white',height: '34px',borderWidth: '0',borderRadius: '5px',marginTop: '10px'}} id="login_form_btn" value="登录"/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
    return state;
}
//建立数据联系 model和component
export default connect(mapStateToProps)(Login);
