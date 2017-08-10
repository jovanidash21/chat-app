import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'muicss/lib/react/container';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

const LoginForm = ()=> {
    return (
        <Container fluid={true}>
            <Row>
                <Col md="6" md-offset="3">
                    <Form>
                        <h2>Chat App!</h2>
                        <Input label="Email" name="email" id="email" type="email" floatingLabel={true}  required={true} />
                        <Input label="Password" name="password" id="password" type="password" floatingLabel={true} />
                        <Row>
                            <Col md="12">
                                <Button variant="raised" color="primary" type="submit">Login</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>    
            </Row>
        </Container>        
    );
};

export default LoginForm;