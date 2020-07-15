import {REGISTER_SUCCESS, REGISTER_ERROR, GET_USER, LOGIN_SUCCESS, LOGIN_ERROR, SIGN_OUT} from '../../types';

export default (state, action) => {
	switch(action.type){
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return{
				...state,
				autenticado: true,
				mensaje: null,
				cargando: false,
			}
		case SIGN_OUT:
		case LOGIN_ERROR:
		case REGISTER_ERROR:
			localStorage.removeItem('token');
			return{
				...state,
				usuario: null,
				autenticado: null,
				token: null,
				mensaje: action.payload,
				cargando: false
			}
		case GET_USER:
			return {
				...state,
				autenticado: true,
				usuario: action.payload,
				cargando: false
			}
		default:
			return state;
		
	}
}