import React from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';


    return (
            <h2>Welcome Back!</h2>
            <Input label="Email" name="email" id="email" type="email" floatingLabel={true}  required={true} />
            <Input label="Password" name="password" id="password" type="password" floatingLabel={true} />
            <Row>
                <Col md="6">
                    <Button variant="raised">Cancel</Button>
                </Col>
                <Col md="6">
                    <Button variant="raised" color="primary" type="submit">Login</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default LoginForm;
