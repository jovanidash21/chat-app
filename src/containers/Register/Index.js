import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  register
} from "../../actions";
import Container from 'muicss/lib/react/container';
import Form from 'muicss/lib/react/form';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Register from '../../components/Register';

class RegisterContainer extends Component {
  constructor(props) {
    super(props);

    this.handleRegister = this.handleRegister.bind(this);
  }
  handleRegister(data) {
    this.props.dispatch(register(data));
  }
  render() {
    const {
      handleRegister
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
                  <Register handleRegister={handleRegister} />
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
    register: state.register
  }
}

export default connect(
  mapStateToProps
)(RegisterContainer);