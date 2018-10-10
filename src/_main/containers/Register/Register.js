import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Row,
  Col,
  Panel,
  Divider
} from 'muicss/react';
import mapDispatchToProps from '../../actions';
import { Input } from '../../../components/Form';
import {
  RegisterButton,
  LoginButton
} from '../../components/Form';
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
  onInputChange(event) {
    event.preventDefault();

    this.setState({[event.target.name]: event.target.value});
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
      <Panel className="form-card">
        <Row>
          <Col md="12">
            <h1 className="form-title mui--text-center">Create an Account</h1>
          </Col>
          {
            auth.register.error &&
            <Col md="12">
              <Alert label={auth.register.message} center />
            </Col>
          }
          <Col md="12">
            <Form onSubmit={::this.handleRegister}>
              <Input
                value={email}
                label="Email"
                type="email"
                name="email"
                onChange={::this.onInputChange}
                disabled={auth.register.loading}
              />
              <Input
                value={name}
                label="Name"
                name="name"
                onChange={::this.onInputChange}
                disabled={auth.register.loading}
              />
              <Input
                value={username}
                label="Username"
                name="username"
                onChange={::this.onInputChange}
                disabled={auth.register.loading}
              />
              <Input
                value={password}
                label="Password"
                type="password"
                name="password"
                onChange={::this.onInputChange}
                disabled={auth.register.loading}
              />
              <RegisterButton disabled={auth.register.loading} />
            </Form>
          </Col>
          <Col md="12">
            <Divider className="line" />
          </Col>
          <Col md="12">
            <LoginButton link="/" disabled={auth.register.loading} />
          </Col>
        </Row>
      </Panel>
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
