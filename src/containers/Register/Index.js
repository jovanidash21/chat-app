import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Container from 'muicss/lib/react/container';
import {
  Form,
  Row,
  Col,
  Panel,
  Divider
} from 'muicss/react'
import { register } from '../../actions/auth';
import Head from '../../components/Head';
import EmailInput from '../../components/AuthForm/Input/EmailInput';
import NameInput from '../../components/AuthForm/Input/NameInput';
import UsernameInput from '../../components/AuthForm/Input/UsernameInput';
import PasswordInput from '../../components/AuthForm/Input/PasswordInput';
import RegisterButton from '../../components/AuthForm/Button/RegisterButton';
import LoginButton from '../../components/AuthForm/Button/LoginButton';
import ErrorCard from '../../components/AuthForm/Card/ErrorCard';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      username: '',
      password: ''
    };
  }
  onEmailChange(event) {
    event.preventDefault();

    this.setState({email: event.target.value});
  }
  onNameChange(event) {
    event.preventDefault();

    this.setState({name: event.target.value});
  }
  onUsernameChange(event) {
    event.preventDefault();

    this.setState({username: event.target.value});
  }
  onPasswordChange(event) {
    event.preventDefault();

    this.setState({password: event.target.value});
  }
  handleHeadData() {
    const title = 'Chat App | Register';

    return (
      <Head title={title} />
    )
  }
  handleRegister(event) {
    event.preventDefault();

    const { register } = this.props;
    const {
      email,
      name,
      username,
      password
    } = this.state;
    let data = {email, name, username, password};

    register(data);
  }
  render() {
    const {
      auth,
      register
    } = this.props;

    return (
      <div>
        {::this.handleHeadData()}
        <Panel className="form-card">
          <Row>
            <Col md="12">
              <h1 className="mui--text-center">Create an Account</h1>
            </Col>
            {
              auth.isRegisterError &&
              <Col md="12">
                <ErrorCard label="Sorry! Username already taken." />
              </Col>
            }
            <Col md="12">
              <Form onSubmit={::this.handleRegister}>
                <EmailInput onEmailChange={::this.onEmailChange} />
                <NameInput onNameChange={::this.onNameChange} />
                <UsernameInput onUsernameChange={::this.onUsernameChange} />
                <PasswordInput onPasswordChange={::this.onPasswordChange} />
                <RegisterButton
                  type="submit"
                  isDisabled={auth.isLoading}
                />
              </Form>
            </Col>
            <Col md="12">
              <Divider className="line" />
            </Col>
            <Col md="12">
              <LoginButton isDisabled={auth.isLoading} />
            </Col>
          </Row>
        </Panel>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    register
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
