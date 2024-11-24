import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useMutation } from 'react-query';

const schema = Yup.object().shape({
  username: Yup.string().max(150).required('Username is required'),
  email: Yup.string().email('Must be a valid email').required('Email is required'),
  password: Yup.string().min(8).required('Password is required'),
  policy: Yup.boolean().oneOf([true], 'This field must be checked'),
});

const SignupContent = () => {
  const navigate = useNavigate();

  const createResource = useMutation(({ url, values }) =>
    axios.post(url, values)
  );

  return (
    <div className='signup-content pt-5 pb-5'>
      <h2 className='text-center mb-4'>Create Account</h2>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          policy: true,
        }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            await createResource.mutateAsync({
              values,
              url: `http://13.51.168.143/api/signup`, // Update with your actual signup API route
            });

            // Redirect to login page after successful signup
            navigate('/login');

          } catch (err) {
            console.error("Signup failed", err);
            setFieldError("username", "Username already exists.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group as={Col} md="12" controlId="validationFormik03">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="validationFormik03">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email Address"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="validationFormik03">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="validationFormik03">
              <Form.Check
                type='checkbox'
                name="policy"
                checked={values.policy}
                onChange={handleChange}
                isInvalid={!!errors.policy}
                label='I accept the terms and conditions'
              />
              <Form.Control.Feedback type="invalid">
                {errors.policy}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type='submit' variant='primary w-100'>
              Signup
            </Button>
            
            <p className='mt-3 text-center'>
              Already have an account? <NavLink to={'/login'}>Login</NavLink>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupContent;
