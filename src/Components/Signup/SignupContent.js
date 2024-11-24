import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useMutation } from 'react-query';
import { Container, Grid, Box, Typography, Checkbox, FormControlLabel } from '@mui/material';

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
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Account
        </Typography>
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
              const response = await createResource.mutateAsync({
                values,
                url: `http://13.51.168.143/api/signup`, // Update with your actual signup API route
              });

              // Redirect to login page after successful signup
              navigate('/login');
            } catch (err) {
              console.error("Signup failed", err);
              if (err.response?.status === 409) {
                setFieldError("username", "Username already exists.");
              } else {
                setFieldError("username", "An unexpected error occurred.");
              }
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
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                </Grid>

                <Grid item xs={12}>
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
                </Grid>

                <Grid item xs={12}>
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
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="policy"
                        checked={values.policy}
                        onChange={handleChange}
                        color="primary"
                      />
                    }
                    label="I accept the terms and conditions"
                  />
                  {errors.policy && touched.policy && (
                    <Typography variant="body2" color="error">
                      {errors.policy}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="primary w-100">
                    Signup
                  </Button>
                </Grid>
              </Grid>
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Already have an account? <NavLink to={'/login'}>Login</NavLink>
              </Typography>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default SignupContent;
