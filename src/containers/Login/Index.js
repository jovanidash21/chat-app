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
import {
  Head,
  LocalLogin,
  FacebookLogin,
  GoogleLogin,
  TwitterLogin,
  InstagramLogin,
  LinkedInLogin,
  GitHubLogin
} from '../../components';

class Login extends Component {
  constructor(props) {
    super(props);
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
      <div className="login-form">
        <Head title="Chat App | Login" />
        <Container fluid={true}>
          <Row>
            <Col md="4" md-offset="4" sm="8" sm-offset="2">
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
                    <LocalLogin 
                      handleLocalLogin={localLogin}
                      isLoading={auth.isLoading}
                    />
                  </Col>
                  <Col md="12">
                    <FacebookLogin 
                      handleFacebookLogin={facebookLogin}
                      isLoading={auth.isLoading}
                    />
                  </Col>  
                  <Col md="12">
                    <GoogleLogin 
                      handleGoogleLogin={googleLogin}
                      isLoading={auth.isLoading}
                    />
                  </Col>  
                  <Col md="12">
                    <TwitterLogin
                      handleTwitterLogin={twitterLogin}
                      isLoading={auth.isLoading}
                    /> 
                  </Col>
                  <Col md="12">
                    <InstagramLogin 
                      handleInstagramLogin={instagramLogin}
                      isLoading={auth.isLoading}
                    />
                  </Col>
                  <Col md="12">
                    <LinkedInLogin 
                      handleLinkedInLogin={linkedinLogin}
                      isLoading={auth.isLoading}
                    />
                  </Col>
                  <Col md="12">
                    <GitHubLogin 
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
            </Col>
          </Row>
        </Container>
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