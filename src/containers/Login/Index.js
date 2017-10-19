import React, { Component } from 'react';
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
} from "../../actions/auth";
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
  handleLocalLogin(data) {
    this.props.dispatch(localLogin(data));
  }
  handleFacebookLogin() {
    this.props.dispatch(facebookLogin());
  }
  handleGoogleLogin() {
    this.props.dispatch(googleLogin());
  }
  handleTwitterLogin() {
    this.props.dispatch(twitterLogin());
  }
  handleInstagramLogin() {
    this.props.dispatch(instagramLogin());
  }
  handleLinkedInLogin() {
    this.props.dispatch(linkedinLogin());
  }
  handleGitHubLogin() {
    this.props.dispatch(githubLogin());
  }
  render() {
    const { auth } = this.props;

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
                        <p className="mui--text-center mui--text-danger">Invalid username or password!</p>
                      </Col> 
                      : ''
                  }
                  <Col md="12">
                    <LocalLogin 
                      handleLocalLogin={::this.handleLocalLogin}
                      isLoading={auth.isLoading}
                    />
                  </Col>
                  <Col md="12">
                    <FacebookLogin 
                      handleFacebookLogin={::this.handleFacebookLogin}
                      isLoading={auth.isLoading}
                    />
                  </Col>  
                  <Col md="12">
                    <GoogleLogin 
                      handleGoogleLogin={::this.handleGoogleLogin}
                      isLoading={auth.isLoading}
                    />
                  </Col>  
                  <Col md="12">
                    <TwitterLogin
                      handleTwitterLogin={::this.handleTwitterLogin}
                      isLoading={auth.isLoading}
                    /> 
                  </Col>
                  <Col md="12">
                    <InstagramLogin 
                      handleInstagramLogin={::this.handleInstagramLogin}
                      isLoading={auth.isLoading}
                    />
                  </Col>
                  <Col md="12">
                    <LinkedInLogin 
                      handleLinkedInLogin={::this.handleLinkedInLogin}
                      isLoading={auth.isLoading}
                    />
                  </Col>
                  <Col md="12">
                    <GitHubLogin 
                      handleGitHubLogin={::this.handleGitHubLogin}
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

export default connect(
  mapStateToProps
)(Login);