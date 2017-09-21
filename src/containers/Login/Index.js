import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  localLogin
} from "../../actions";
import Container from 'muicss/lib/react/container';
import Form from 'muicss/lib/react/form';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Divider from 'muicss/lib/react/divider';
import Button from 'muicss/lib/react/button';
import LocalLogin from '../../components/Login/LocalLogin';
import FacebookLogin from '../../components/Login/FacebookLogin';
import GoogleLogin from '../../components/Login/GoogleLogin';
import TwitterLogin from '../../components/Login/TwitterLogin';
import InstagramLogin from '../../components/Login/InstagramLogin';
import LinkedInLogin from '../../components/Login/LinkedInLogin';
import GitHubLogin from '../../components/Login/GitHubLogin';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleLocalLogin = this.handleLocalLogin.bind(this);
  }
  handleLocalLogin(data) {
    this.props.dispatch(localLogin(data));
  }
  render() {
    const {
      handleLocalLogin
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
                <Divider className="line" />
                <Col md="12">
                  <Button
                    className="button"
                    color="primary"
                    size="large"
                    variant="raised"
                  >
                    Register
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

const mapStateToProps = (state) => {  
  return {
    localLogin: state.localLogin
  }
}

export default connect(
  mapStateToProps
)(Login);