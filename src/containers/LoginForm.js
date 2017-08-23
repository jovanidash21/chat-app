import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'muicss/lib/react/container';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import FontAwesome from 'react-fontawesome';
require('../styles/LoginForm.scss');

class LoginForm extends Component {
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
                  <Form>
                    <Input label="Email" name="email" id="email" type="email" floatingLabel={true}  required={true} />
                    <Input label="Password" name="password" id="password" type="password" floatingLabel={true} />
                      <Button
                        className="button button-login"
                        color="primary" 
                        size="large" 
                        type="submit" 
                        variant="raised"
                      >
                        Login
                      </Button>
                  </Form>
                </Col>  
                <Col md="12">
                  <Button
                    className="button button-facebook"
                    size="large"
                    variant="raised"
                  >
                    <div className="icon">
                      <FontAwesome
                        name="facebook"
                        size="2x"
                      />
                    </div>  
                    Login with Facebook
                  </Button>
                </Col>  
                <Col md="12">
                  <Button
                    className="button button-google"
                    size="large"
                    variant="raised"
                  >
                    <div className="icon">
                      <FontAwesome
                        name="google"
                        size="2x"
                      />
                    </div>
                    Login with Google
                  </Button>
                </Col>  
                <Col md="12">
                  <Button
                    className="button button-twitter"
                    size="large"
                    variant="raised"
                  >
                    <div className="icon">
                      <FontAwesome
                        name="twitter"
                        size="2x"
                      />
                    </div>
                    Login with Twitter
                  </Button>
                </Col>
                <Col md="12">
                  <Button
                    className="button button-instagram"
                    size="large"
                    variant="raised"
                  >
                    <div className="icon">
                      <FontAwesome
                        name="instagram"
                        size="2x"
                      />
                    </div>
                    Login with Instagram
                  </Button>
                </Col>
                <Col md="12">
                  <Button
                    className="button button-linkedin"
                    size="large"
                    variant="raised"
                  >
                    <div className="icon">
                      <FontAwesome
                        name="linkedin"
                        size="2x"
                      />
                    </div> 
                    Login with LinkedIn
                  </Button>
                </Col>
                <Col md="12">
                  <Button
                    className="button button-github"
                    size="large"
                    variant="raised"
                  >
                    <div className="icon">
                      <FontAwesome
                        name="github"
                        size="2x"
                      />
                    </div>
                    Login with Github
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>  
    ) 
  }
}

export default connect()(LoginForm);