import {
	ADD_TAG,
	VALIDATE_TAG,
	DELETE_TAG,
	UPDATE_TAG,
} from "../../types";

export default (state, action) => {
	switch (action.type) {
		case ADD_TAG:
			return {
				...state,
				tags: [...state.tags, action.payload],
				errortag: false,
			};
		case VALIDATE_TAG:
			return {
				...state,
				errortag: true,
			};
		case DELETE_TAG:
			return {
				...state,
				tags: state.tags.filter((tag) => tag._id !== action.payload),
			};
		case UPDATE_TAG:
			return {
				...state,
				tags: state.tags.map(tag => tag._id === action.payload._id ? action.payload : tag),
				errortag: false,
			}
		default:
			return state;
	}
};
