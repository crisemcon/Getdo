import {REGISTER_SUCCESS, REGISTER_ERROR, GET_USER, LOGIN_SUCCESS, LOGIN_ERROR, SIGN_OUT} from '../../types';

const authReducer = (state, action) => {
	switch(action.type){
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return{
				...state,
				authenticated: true,
				message: null,
				loading: false,
			}
		case SIGN_OUT:
		case LOGIN_ERROR:
		case REGISTER_ERROR:
			localStorage.removeItem('token');
			return{
				...state,
				user: null,
				authenticated: null,
				token: null,
				message: action.payload,
				loading: false
			}
		case GET_USER:
			return {
				...state,
				authenticated: true,
				user: action.payload,
				loading: false
			}
		default:
			return state;
		
	}
}

export default authReducer;