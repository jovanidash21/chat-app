import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'muicss/lib/react/container';
import {
  Form,
  Row,
  Col,
  Panel,
  Divider
} from 'muicss/react'
import mapDispatchToProps from '../../actions';
import Head from '../../../components/Head';
import {
  EmailInput,
  NameInput,
  UsernameInput,
  PasswordInput,
  RegisterButton,
  LoginButton
} from '../../components/AuthForm';
import { Alert } from '../../../components/Alert';

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
  componentWillMount() {
    document.body.className = '';
    document.body.classList.add('register-page');
  }
  handleChange(event) {
    event.preventDefault();

    this.setState({[event.target.name]: event.target.value});
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

    register(email, name, username, password);
  }
  render() {
    const {
      auth,
      register
    } = this.props;
    const {
      email,
      name,
      username,
      password
    } = this.state;

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
                <Alert label="Sorry! Username already taken." center />
              </Col>
            }
            <Col md="12">
              <Form onSubmit={::this.handleRegister}>
                <EmailInput
                  value={email}
                  handleChange={::this.handleChange}
                  isDisabled={auth.isLoading}
                />
                <NameInput
                  value={name}
                  handleChange={::this.handleChange}
                  isDisabled={auth.isLoading}
                />
                <UsernameInput
                  value={username}
                  handleChange={::this.handleChange}
                  isDisabled={auth.isLoading}
                />
                <PasswordInput
                  value={password}
                  handleChange={::this.handleChange}
                  isDisabled={auth.isLoading}
                />
                <RegisterButton isDisabled={auth.isLoading} />
              </Form>
            </Col>
            <Col md="12">
              <Divider className="line" />
            </Col>
            <Col md="12">
              <LoginButton
                link="/"
                isDisabled={auth.isLoading}
              />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
