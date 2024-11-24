import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { useDispatch } from "react-redux";
import { setProfile } from "../../features/profile/profileSlice";
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import axios from 'axios';
import { Container, Grid, Box, Typography } from '@mui/material';

const schema = Yup.object().shape({
  username: Yup.string().max(150).required('Username is required'),
  password: Yup.string().max(255).required('Password is required'),
});

const LoginContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createResource = useMutation(({ url, values }) =>
    axios.post(url, values)
  );

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 2, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome Back
        </Typography>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={schema}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              const response = await createResource.mutateAsync({
                values,
                url: `http://13.51.168.143/api/login`,
              });

              // Store JWT and user information in sessionStorage
              sessionStorage.setItem('jwtToken', response.data.token);
              if (response.data.userType === 'admin') {
                sessionStorage.setItem('username', response.data.user.username);
              } else {
                sessionStorage.setItem('username', response.data.user.title);
              }
              sessionStorage.setItem('id', response.data.user.id);
              sessionStorage.setItem('email', response.data.user.email);
              sessionStorage.setItem('isAdmin', response.data.userType === 'admin');

              // Update the Redux state
              dispatch(setProfile({
                ...response.data.user,
                token: response.data.token
              }));

              // Redirect to home page or dashboard
              navigate('/');
            } catch (err) {
              console.error("Login failed", err);
              setFieldError("username", "Please check your username or password!");
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
            isValid,
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
                  <Button type="submit" variant="primary w-100">
                    Login
                  </Button>
                </Grid>
              </Grid>
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Don't have an account? <NavLink to={'/signup'}>Signup</NavLink>
              </Typography>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

export default LoginContent;
