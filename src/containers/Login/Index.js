import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'muicss/lib/react/container';
import Form from 'muicss/lib/react/form';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import LocalLogin from '../../components/Login/LocalLogin';
import FacebookLogin from '../../components/Login/FacebookLogin';
import GoogleLogin from '../../components/Login/GoogleLogin';
import TwitterLogin from '../../components/Login/TwitterLogin';
import InstagramLogin from '../../components/Login/InstagramLogin';
import LinkedInLogin from '../../components/Login/LinkedInLogin';
import GitHubLogin from '../../components/Login/GitHubLogin';

class Login extends Component {
  render() {
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
                  <LocalLogin />
                </Col>  
                <Col md="12">
                  <FacebookLogin />
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
              </Row>
            </Col>
          </Row>
        </Container>
      </div>  
    ) 
  }
}

export default connect()(Login);