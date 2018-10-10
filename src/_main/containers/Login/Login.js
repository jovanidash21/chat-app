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
  LoginButton,
  RegisterButton,
  SocialButton
} from '../../components/Form';
import { Alert } from '../../../components/Alert';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }
  componentWillMount() {
    document.body.className = '';
    document.body.classList.add('login-page');
  }
  onInputChange(event) {
    event.preventDefault();

    this.setState({[event.target.name]: event.target.value});
  }
  handleLocalLogin(event) {
    event.preventDefault();

    const { localLogin } = this.props;
    const {
      username,
      password
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
      auth
    } = this.props;
    const {
      username,
      password
    } = this.state;

    return (
      <Panel className="form-card">
        <Row>
          <Col md="12">
            <h1 className="form-title mui--text-center">Chat App</h1>
          </Col>
          {
            auth.login.error &&
            <Col md="12">
              <Alert label={auth.login.message} center />
            </Col>
          }
          <Col md="12">
            <Form onSubmit={::this.handleLocalLogin}>
              <Input
                value={username}
                label="Username"
                name="username"
                onChange={::this.onInputChange}
                disabled={auth.login.loading}
              />
              <Input
                value={password}
                label="Password"
                type="password"
                name="password"
                onChange={::this.onInputChange}
                disabled={auth.login.loading}
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
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
