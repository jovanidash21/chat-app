import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Row,
  Col,
  Panel,
  Divider,
} from 'muicss/react';
import mapDispatchToProps from '../../actions';
import { isEmailValid } from '../../../utils/form';
import { Input } from '../../../components/Form';
import {
  RegisterButton,
  LoginButton,
} from '../../components/Form';
import { Alert } from '../../../components/Alert';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      emailValid: true,
      nameValid: true,
      usernameValid: true,
      passwordValid: true,
      confirmPasswordValid: true,
      errorMessage: '',
    };
  }
  componentWillMount() {
    document.body.className = '';
    document.body.classList.add('register-page');
  }
  componentDidUpdate(prevProps) {
    if (prevProps.auth.register.loading && !this.props.auth.register.loading && this.props.auth.register.error) {
      this.setState({errorMessage: this.props.auth.register.message});
    }
  }
  onInputChange(event) {
    event.preventDefault();

    this.setState({[event.target.name]: event.target.value});
  }
  handleRegisterValidation(event) {
    event.preventDefault();

    const {
      email,
      name,
      username,
      password,
      confirmPassword,
    } = this.state;
    let emailValid = true;
    let nameValid = true;
    let usernameValid = true;
    let passwordValid = true;
    let confirmPasswordValid = true;
    let errorMessage = '';

    if (!isEmailValid(email)) {
      emailValid = false;
    }

    if (name.trim().length === 0) {
      nameValid = false;
    }

    if (username.trim().length === 0) {
      usernameValid = false;
    }

    if (password.trim().length === 0) {
      passwordValid = false;
    }

    if (password.trim().length > 0 && password !== confirmPassword) {
      confirmPasswordValid = false;
    }

    if (!nameValid || !usernameValid || !passwordValid) {
      errorMessage = 'All fields are required. Please check and try again.';
    } else if ( ! emailValid ) {
      errorMessage = 'Please enter a valid email address';
    } else if (!confirmPasswordValid) {
      errorMessage = 'Password do not match';
    }

    this.setState({
      emailValid: emailValid,
      nameValid: nameValid,
      usernameValid: usernameValid,
      passwordValid: passwordValid,
      confirmPasswordValid: confirmPasswordValid,
      errorMessage: errorMessage,
    });

    if (emailValid && nameValid && usernameValid && passwordValid && confirmPasswordValid && errorMessage.length === 0) {
      ::this.handleRegister();
    }
  }
  handleRegister() {
    const { register } = this.props;
    const {
      email,
      name,
      username,
      password,
    } = this.state;

    register(email, name, username, password);
  }
  render() {
    const { auth } = this.props;
    const {
      email,
      name,
      username,
      password,
      confirmPassword,
      emailValid,
      nameValid,
      usernameValid,
      passwordValid,
      confirmPasswordValid,
      errorMessage,
    } = this.state;

    return (
      <Panel className="form-card">
        <Row>
          <Col md="12">
            <h1 className="form-title mui--text-center">Create an Account</h1>
          </Col>
          {
            errorMessage.length > 0 &&
            <Col md="12">
              <Alert label={errorMessage} center />
            </Col>
          }
          <Col md="12">
            <Form onSubmit={::this.handleRegisterValidation}>
              <Input
                value={email}
                label="Email"
                type="text"
                name="email"
                onChange={::this.onInputChange}
                disabled={auth.register.loading}
                invalid={!emailValid}
              />
              <Input
                value={name}
                label="Name"
                name="name"
                onChange={::this.onInputChange}
                disabled={auth.register.loading}
                invalid={!nameValid}
              />
              <Input
                value={username}
                label="Username"
                name="username"
                onChange={::this.onInputChange}
                disabled={auth.register.loading}
                invalid={!usernameValid}
              />
              <Input
                value={password}
                label="Password"
                type="password"
                name="password"
                onChange={::this.onInputChange}
                disabled={auth.register.loading}
                invalid={!passwordValid}
              />
              <Input
                value={confirmPassword}
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                onChange={::this.onInputChange}
                disabled={auth.register.loading}
                invalid={!confirmPasswordValid}
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
    auth: state.auth,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
