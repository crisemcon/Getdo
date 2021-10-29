import {CURRENT_CATEGORY} from '../../types';

const sidebarReducer = (state, action) => {
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

export default sidebarReducer;