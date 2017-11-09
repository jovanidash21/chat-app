import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'muicss/lib/react/container';
import {
  Form,
  Row,
  Col,
  Panel,
  Divider
} from 'muicss/react';
import {
  localLogin,
  facebookLogin,
  googleLogin,
  twitterLogin,
  instagramLogin,
  linkedinLogin,
  githubLogin
} from '../../actions/auth';
import Head from '../../components/Head';
import UsernameInput from '../../components/AuthForm/Input/UsernameInput';
import PasswordInput from '../../components/AuthForm/Input/PasswordInput';
import LoginButton from '../../components/AuthForm/Button/LoginButton';
import RegisterButton from '../../components/AuthForm/Button/RegisterButton';
import SocialButton from '../../components/AuthForm/Button/SocialButton';
import ErrorCard from '../../components/AuthForm/Card/ErrorCard';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
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
    const title = 'Chat App | Login';

    return (
      <Head title={title} />
    )
  }
  handleLocalLogin(event) {
    event.preventDefault();

    const { localLogin } = this.props;
    const {
      username,
      password
    } = this.state;
    let data = {username, password};

    localLogin(data);
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

    return (
      <div>
        {::this.handleHeadData()}
        <Panel className="form-card">
          <Row>
            <Col md="12">
              <h1 className="mui--text-center">Chat App</h1>
            </Col>
            {
              auth.isLoginError
                ?
                <Col md="12">
                  <ErrorCard label="Invalid username or password!" />
                </Col>
                : ''
            }
            <Col md="12">
              <Form onSubmit={::this.handleLocalLogin}>
                <UsernameInput onUsernameChange={::this.onUsernameChange} />
                <PasswordInput onPasswordChange={::this.onPasswordChange} />
                <LoginButton
                  type="submit"
                  isDisabled={auth.isLoading}
                />
              </Form>
            </Col>
            <Col md="12">
              <SocialButton
                socialMedia="facebook"
                label="Login with Facebook"
                handleSocialLogin={facebookLogin}
                isDisabled={auth.isLoading}
              />
            </Col>
            <Col md="12">
              <SocialButton
                socialMedia="google"
                label="Login with Google"
                handleSocialLogin={googleLogin}
                isDisabled={auth.isLoading}
              />
            </Col>
            <Col md="12">
              <SocialButton
                socialMedia="twitter"
                label="Login with Twitter"
                handleSocialLogin={twitterLogin}
                isDisabled={auth.isLoading}
              />
            </Col>
            <Col md="12">
              <SocialButton
                socialMedia="instagram"
                label="Login with Instagram"
                handleSocialLogin={instagramLogin}
                isDisabled={auth.isLoading}
              />
            </Col>
            <Col md="12">
              <SocialButton
                socialMedia="linkedin"
                label="Login with LinkedIn"
                handleSocialLogin={linkedinLogin}
                isDisabled={auth.isLoading}
              />
            </Col>
            <Col md="12">
              <SocialButton
                socialMedia="github"
                label="Login with GitHub"
                handleSocialLogin={githubLogin}
                isDisabled={auth.isLoading}
              />
            </Col>
            <Col md="12">
              <Divider className="line" />
            </Col>
            <Col md="12">
              <Link to="/register">
                <RegisterButton isDisabled={auth.isLoading} />
              </Link>
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
    localLogin,
    facebookLogin,
    googleLogin,
    twitterLogin,
    instagramLogin,
    linkedinLogin,
    githubLogin
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
