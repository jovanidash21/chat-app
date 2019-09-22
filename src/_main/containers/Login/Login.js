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
import { Input } from '../../../components/Form';
import {
  LoginButton,
  RegisterButton,
  SocialButton,
} from '../../components/Form';
import { Alert } from '../../../components/Alert';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      usernameValid: true,
      passwordValid: true,
      errorMessage: '',
    };
  }
  componentWillMount() {
    document.body.className = '';
    document.body.classList.add('login-page');
  }
  componentDidUpdate(prevProps) {
    if (prevProps.auth.login.loading && ! this.props.auth.login.loading && this.props.auth.login.error) {
      this.setState({errorMessage: this.props.auth.login.message});
    }
  }
  onInputChange(event) {
    event.preventDefault();

    this.setState({[event.target.name]: event.target.value});
  }
  handleLocalLoginValidation(event) {
    event.preventDefault();

    const {
      username,
      password,
    } = this.state;
    let usernameValid = true;
    let passwordValid = true;
    let errorMessage = '';

    if (username.trim().length === 0) {
      usernameValid = false;
    }

    if (password.trim().length === 0) {
      passwordValid = false;
    }

    if (!usernameValid && !passwordValid) {
      errorMessage = 'Username and password are required';
    } else if (!usernameValid) {
      errorMessage = 'Username is required';
    } else if (!passwordValid) {
      errorMessage = 'Password is required';
    }

    this.setState({
      usernameValid: usernameValid,
      passwordValid: passwordValid,
      errorMessage: errorMessage,
    });

    if (usernameValid && passwordValid && errorMessage.length === 0) {
      ::this.handleLocalLogin();
    }
  }
  handleLocalLogin() {
    const { localLogin } = this.props;
    const {
      username,
      password,
    } = this.state;

    localLogin(username, password);
  }
  render() {
    const {
      facebookLogin,
      googleLogin,
      twitterLogin,
      instagramLogin,
      linkedinLogin,
      githubLogin,
      auth,
    } = this.props;
    const {
      username,
      password,
      usernameValid,
      passwordValid,
      errorMessage,
    } = this.state;

    return (
      <Panel className="form-card">
        <Row>
          <Col md="12">
            <h1 className="form-title mui--text-center">Chat App</h1>
          </Col>
          {
            errorMessage.length > 0 &&
            <Col md="12">
              <Alert label={errorMessage} center />
            </Col>
          }
          <Col md="12">
            <Form onSubmit={::this.handleLocalLoginValidation}>
              <Input
                value={username}
                label="Username"
                name="username"
                onChange={::this.onInputChange}
                disabled={auth.login.loading}
                invalid={!usernameValid}
              />
              <Input
                value={password}
                label="Password"
                type="password"
                name="password"
                onChange={::this.onInputChange}
                disabled={auth.login.loading}
                invalid={!passwordValid}
              />
              <LoginButton disabled={auth.login.loading} />
            </Form>
          </Col>
          <Col md="12">
            <SocialButton
              socialMedia="facebook"
              socialMediaIcon="facebook-f"
              label="Login with Facebook"
              handleSocialLogin={facebookLogin}
              disabled={auth.login.loading}
            />
          </Col>
          <Col md="12">
            <SocialButton
              socialMedia="google"
              socialMediaIcon="google"
              label="Login with Google"
              handleSocialLogin={googleLogin}
              disabled={auth.login.loading}
            />
          </Col>
          <Col md="12">
            <SocialButton
              socialMedia="twitter"
              socialMediaIcon="twitter"
              label="Login with Twitter"
              handleSocialLogin={twitterLogin}
              disabled={auth.login.loading}
            />
          </Col>
          <Col md="12">
            <SocialButton
              socialMedia="instagram"
              socialMediaIcon="instagram"
              label="Login with Instagram"
              handleSocialLogin={instagramLogin}
              disabled={auth.login.loading}
            />
          </Col>
          <Col md="12">
            <SocialButton
              socialMedia="linkedin"
              socialMediaIcon="linkedin-in"
              label="Login with LinkedIn"
              handleSocialLogin={linkedinLogin}
              disabled={auth.login.loading}
            />
          </Col>
          <Col md="12">
            <SocialButton
              socialMedia="github"
              socialMediaIcon="github"
              label="Login with GitHub"
              handleSocialLogin={githubLogin}
              disabled={auth.login.loading}
            />
          </Col>
          <Col md="12">
            <Divider className="line" />
          </Col>
          <Col md="12">
            <RegisterButton link="/register" disabled={auth.login.loading} />
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
)(Login);
