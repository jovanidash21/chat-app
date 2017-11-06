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
  Button,
} from 'muicss/react'
import { register } from '../actions/auth';
import Head from '../components/Head';
import RegisterForm from '../components/Register/RegisterForm';

class Register extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      auth,
      register
    } = this.props;

    return (
      <div className="register-form">
        <Head title="Chat App | Register" />
        <Panel className="form-card">
          <Row>
            <Col md="12">
              <h1 className="mui--text-center">Create an Account</h1>
            </Col>
            {
              auth.isRegisterError
                ?
                <Col md="12">
                  <Panel className="error-card mui--bg-danger">
                    <p className="mui--text-center">Sorry! Username already taken.</p>
                  </Panel>
                </Col>
                : ''
            }
            <Col md="12">
              <RegisterForm
                handleRegister={register}
                isLoading={auth.isLoading}
                isError={auth.isRegisterError}
              />
            </Col>
            <Col md="12">
              <Divider className="line" />
            </Col>
            <Col md="12">
              <Link to="/">
                <Button
                  className="button button-login"
                  size="large"
                  type="submit"
                  variant="raised"
                  disabled={auth.isLoading}
                >
                  Login
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
    register
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);