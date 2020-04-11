import {CURRENT_CATEGORY} from '../../types';

export default (state, action) => {
	switch(action.type) {
		case CURRENT_CATEGORY:
			return {
                ...state,
                category: action.payload
            }

		default:
			return state;
	}
}