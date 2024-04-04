import React from 'react';
import { Formik } from 'formik';
// import * as EmailValidator from 'email-validator';
import * as Yup from 'yup';
import loginImg from '../../login.svg';
// import { async } from 'q';
// import API from './API';
// import { Link } from 'react-router-dom';
// import { async } from 'q';
import { login } from '../repository';

export class ValidatedLoginForms extends React.Component {
	render() {
		return (
			<div>
				<Formik
					initialValues={{ email: '', password: '', token: '' }}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							// console.log('Logging in', values);
							setSubmitting(true);
						}, 500);
						login(values).then((response) =>
							this.setState({
								token: response.token,
								coba: localStorage.setItem('auth', response.token)
							})
						);
						// console.log(this.state.token);

						// console.log(this.token);
					}}
					validationSchema={Yup.object().shape({
						email: Yup.string().email().required('Please enter email!'),
						password: Yup.string()
							.required('No password provided.')
							.min(8, 'Password is too short - should be 8 chars minimum.')
							.matches(/(?=.*[0-9])/, 'Password must contain a number.')
					})}
				>
					{(props) => {
						const { values, touched, errors, isSubmitting, handleBlur, handleChange, handleSubmit } = props;
						return (
							<form onSubmit={handleSubmit}>
								<div className="base-container">
									<div className="header">Login</div>
									<div className="content">
										<div className="image">
											<img src={loginImg} alt="logo" />
										</div>
										<div className="form">
											<div className="form-group">
												{/* <label htmlFor="email">Email</label> */}
												<input
													name="email"
													type="text"
													placeholder="Enter your email"
													value={values.email}
													onChange={handleChange}
													onBlur={handleBlur}
													className={errors.email && touched.email && 'error'}
												/>
											</div>
											{errors.email &&
											touched.email && <div className="input-feedback">{errors.email}</div>}
											<div className="form-group">
												{/* <label htmlFor="password">Password</label> */}
												<input
													name="password"
													type="password"
													placeholder="Enter your password"
													value={values.password}
													onChange={handleChange}
													onBlur={handleBlur}
													className={errors.password && touched.password && 'error'}
												/>
											</div>
											{errors.password &&
											touched.password && <div className="input-feedback">{errors.password}</div>}
											<button type="submit" className="btn" disabled={isSubmitting}>
												Login
											</button>
										</div>
									</div>
								</div>
							</form>
						);
					}}
				</Formik>
			</div>
		);
	}
}

export default ValidatedLoginForms;
