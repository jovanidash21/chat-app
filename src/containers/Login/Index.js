import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  localLogin,
  facebookLogin
} from "../../actions";
import { Link } from 'react-router-dom';
import Container from 'muicss/lib/react/container';
import Form from 'muicss/lib/react/form';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Divider from 'muicss/lib/react/divider';
import Button from 'muicss/lib/react/button';
import {
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

    this.handleLocalLogin = this.handleLocalLogin.bind(this);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
  }
  handleLocalLogin(data) {
    this.props.dispatch(localLogin(data));
  }
  handleFacebookLogin() {
    this.props.dispatch(facebookLogin());
  }
  render() {
    const {
      handleLocalLogin,
      handleFacebookLogin
    } = this;

    return (
      <div className="login-form">
        <Container fluid={true}>
          <Row>
            <Col md="4" md-offset="4" sm="8" sm-offset="2">
              <Row>
                <Col md="12">
                  <h1 className="mui--text-center">Chat App</h1>
                </Col>
                <Col md="12">  
                  <LocalLogin handleLocalLogin={handleLocalLogin} />
                </Col>  
                <Col md="12">
                  <FacebookLogin handleFacebookLogin={handleFacebookLogin} />
                </Col>  
                <Col md="12">
                  <GoogleLogin />
                </Col>  
                <Col md="12">
                  <TwitterLogin /> 
                </Col>
                <Col md="12">
                  <InstagramLogin />
                </Col>
                <Col md="12">
                  <LinkedInLogin />
                </Col>
                <Col md="12">
                  <GitHubLogin />
                </Col>
                <Col md="12">
                  <Divider className="line" />
                </Col>
                <Col md="12">
                  <Link to="/register">
                    <Button
                      className="button button-register"
                      color="primary"
                      size="large"
                      variant="raised"
                    >
                      Register
                    </Button>
                  </Link>  
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>  
    ) 
  }
}

const mapStateToProps = (state) => {  
  return {
    localLogin: state.localLogin,
    facebookLogin: state.facebookLogin
  }
}

export default connect(
  mapStateToProps
)(Login);