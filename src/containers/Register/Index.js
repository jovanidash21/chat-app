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
  Button,
} from 'muicss/react'
import { register } from '../../actions/auth';
import {
  Head,
  Register 
} from '../../components';

class RegisterContainer extends Component {
  constructor(props) {
    super(props);
  }
  handleRegister(data) {
    this.props.dispatch(register(data));
  }
  render() {
    const { auth  } = this.props;

    return (
      <div className="register-form">
        <Head title="Chat App | Register" />
        <Container fluid={true}>
          <Row>
            <Col md="4" md-offset="4" sm="8" sm-offset="2">
              <Panel className="form-card">
                <Row>
                  <Col md="12">
                    <h1 className="mui--text-center">Create an Account</h1>
                  </Col>
                  <Col md="12">  
                    <Register 
                      handleRegister={::this.handleRegister}
                      isLoading={auth.isLoading}
                      isError={auth.isError}
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
)(RegisterContainer);