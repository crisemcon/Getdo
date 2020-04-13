import {
	ADD_TAG,
	VALIDATE_TAG,
	DELETE_TAG,
	UPDATE_TAG,
	/*FOCUS_ITEM,
	ITEM_STATE,
	CURRENT_ITEM,
	UPDATE_ITEM,*/
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
				tags: state.tags.filter((tag) => tag.id !== action.payload),
			};
		case UPDATE_TAG:
			return {
				...state,
				tags: state.tags.map(tag => tag.id === action.payload.id ? action.payload : tag),
				errortag: false,
			}
		default:
			return state;
	}
};
