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

	const registrarUsuario = async datos => {
		try {
			const respuesta = await axiosClient.post('/api/users', datos);

			dispatch({
				type:REGISTER_SUCCESS,
				payload: respuesta.data
			})

			//obtener el user
			usuarioAutenticado();
		} catch (error) {
			console.log(error);
			const alerta = {
				msg: error.response.data.msg,
				categoria: 'alerta-error'
			}

			dispatch({
				type:REGISTER_ERROR,
				payload: alerta
			})
		}
	}

	//retorna el user authenticated
	const usuarioAutenticado = async () => {
		const token = localStorage.getItem('token');
		if(token) {
			tokenAuth(token);
		}
		try {
			const respuesta = await axiosClient.get('/api/auth');
			//console.log(respuesta);
			dispatch({
				type:GET_USER,
				payload: respuesta.data.user
			})
		} catch (error) {
			console.log(error);
			dispatch({
				type: LOGIN_ERROR
			})
		}
	}

	//cuando el user inicia sesion
	const iniciarSesion = async datos => {
		try {
			const respuesta = await axiosClient.post('/api/auth', datos);
			
			dispatch({
				type:LOGIN_SUCCESS,
				payload: respuesta.data
			});

			//obtener el user
			usuarioAutenticado();

		} catch (error) {
			console.log(error.response.data.msg);
			const alerta = {
				msg: error.response.data.msg,
				categoria: 'alerta-error'
			}

			dispatch({
				type:LOGIN_ERROR,
				payload: alerta
			})
		}
	}

	//cierra la sesion del user
	const cerrarSesion = () => {
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
				registrarUsuario,
				iniciarSesion,
				usuarioAutenticado,
				cerrarSesion
			}}
		>
		{props.children}
		</AuthContext.Provider>
	)
}

export default AuthState;