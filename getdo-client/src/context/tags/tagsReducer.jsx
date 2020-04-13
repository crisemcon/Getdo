import {
	ADD_TAG,
	VALIDATE_TAG,
	/*DELETE_ITEM,
	FOCUS_ITEM,
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
                errortag: false
			}
		case VALIDATE_TAG:
            return {
                ...state,
                errortag: true
            }
		default:
			return state;
			
	}
};
