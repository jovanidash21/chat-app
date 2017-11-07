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
  Divider,
  Button
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
import LocalLoginForm from '../../components/Login/LocalLoginForm';
import FacebookLoginForm from '../../components/Login/FacebookLoginForm';
import GoogleLoginForm from '../../components/Login/GoogleLoginForm';
import TwitterLoginForm from '../../components/Login/TwitterLoginForm';
import InstagramLoginForm from '../../components/Login/InstagramLoginForm';
import LinkedInLoginForm from '../../components/Login/LinkedInLoginForm';
import GitHubLoginForm from '../../components/Login/GitHubLoginForm';


class Login extends Component {
  constructor(props) {
    super(props);
  }
  handleHeadData(headTitle) {
    const title = `Chat App | ${headTitle}`;

    return (
      <Head title={title} />
    )
  }
  render() {
    const { 
      localLogin,
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
        {::this.handleHeadData('Login')}
        <Panel className="form-card">
          <Row>
            <Col md="12">
              <h1 className="mui--text-center">Chat App</h1>
            </Col>
            {
              auth.isLoginError
                ?
                <Col md="12">
                  <Panel className="error-card mui--bg-danger">
                    <p className="mui--text-center">Invalid username or password!</p>
                  </Panel>
                </Col>
                : ''
            }
            <Col md="12">
              <LocalLoginForm
                handleLocalLogin={localLogin}
                isLoading={auth.isLoading}
              />
            </Col>
            <Col md="12">
              <FacebookLoginForm
                handleFacebookLogin={facebookLogin}
                isLoading={auth.isLoading}
              />
            </Col>
            <Col md="12">
              <GoogleLoginForm
                handleGoogleLogin={googleLogin}
                isLoading={auth.isLoading}
              />
            </Col>
            <Col md="12">
              <TwitterLoginForm
                handleTwitterLogin={twitterLogin}
                isLoading={auth.isLoading}
              />
            </Col>
            <Col md="12">
              <InstagramLoginForm
                handleInstagramLogin={instagramLogin}
                isLoading={auth.isLoading}
              />
            </Col>
            <Col md="12">
              <LinkedInLoginForm
                handleLinkedInLogin={linkedinLogin}
                isLoading={auth.isLoading}
              />
            </Col>
            <Col md="12">
              <GitHubLoginForm
                handleGitHubLogin={githubLogin}
                isLoading={auth.isLoading}
              />
            </Col>
            <Col md="12">
              <Divider className="line" />
            </Col>
            <Col md="12">
              <Link to="/register">
                <Button
                  className="button button-register"
                  size="large"
                  variant="raised"
                  disabled={auth.isLoading}
                >
                  Register
                </Button>
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