import React, {useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/token';
import {REGISTER_SUCCESS, REGISTER_ERROR, GET_USER, LOGIN_SUCCESS, LOGIN_ERROR, SIGN_OUT} from '../../types';

const AuthState = props => {

	const initialState = {
		token: localStorage.getItem('token'),
		authenticated: null,
		user: null,
		message: null,
		loading: true,
	}

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	const registerUser = async data => {
		try {
			const response = await axiosClient.post('/api/users', data);

			dispatch({
				type:REGISTER_SUCCESS,
				payload: response.data
			})

			//get the user
			userAuthenticated();
		} catch (error) {
			console.log(error);
			const alert = {
				message: error.response.data.message,
				category: 'alert-error'
			}

			dispatch({
				type:REGISTER_ERROR,
				payload: alert
			})
		}
	}

	//returns authenticated user
	const userAuthenticated = async () => {
		const token = localStorage.getItem('token');
		if(token) {
			tokenAuth(token);
		}
		try {
			const response = await axiosClient.get('/api/auth');
			//console.log(response);
			dispatch({
				type:GET_USER,
				payload: response.data.user
			})
		} catch (error) {
			console.log(error);
			dispatch({
				type: LOGIN_ERROR
			})
		}
	}

	//when user signs in
	const signIn = async data => {
		try {
			const response = await axiosClient.post('/api/auth', data);
			
			dispatch({
				type:LOGIN_SUCCESS,
				payload: response.data
			});

			//obtener el user
			userAuthenticated();

		} catch (error) {
			console.log(error.response.data.message);
			const alert = {
				message: error.response.data.message,
				category: 'alert-error'
			}

			dispatch({
				type:LOGIN_ERROR,
				payload: alert
			})
		}
	}

	//log out user
	const signOut = () => {
		dispatch({
			type: SIGN_OUT
		})
	}

	return(
		<AuthContext.Provider
			value={{
				token: state.token,
				authenticated: state.authenticated,
				user: state.user,
				message: state.message,
				loading: state.loading,
				registerUser,
				signIn,
				userAuthenticated,
				signOut
			}}
		>
		{props.children}
		</AuthContext.Provider>
	)
}

export default AuthState;