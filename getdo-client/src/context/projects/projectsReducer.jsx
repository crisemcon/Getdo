import {
	PROJECT_CATEGORIE,
	ADD_PROJECT,
	VALIDATE_PROJECT,
	DELETE_PROJECT,
	FOCUS_PROJECT,
	UPDATE_PROJECTSTAG,
	UPDATE_PROJECTSDELETEDTAG,
} from "../../types";

export default (state, action) => {
	switch(action.type){
		case ADD_PROJECT:
			return {
				...state,
				projects: [...state.projects, action.payload],
				errorproject: false,
			};

		case VALIDATE_PROJECT:
			return {
				...state,
				errorproject: true,
			};

		case DELETE_PROJECT:
			return {
				...state,
				projects: state.projects.filter((project) => project.id !== action.payload),
			};
		case FOCUS_PROJECT:
			const focus = action.payload.focus;
			return {
				...state,
				items: [
					...state.items,
					(state.items.filter(
						(item) => item.id === action.payload.id
					)[0].focus = !focus),
				],
            };

		case UPDATE_ITEMSTAG:
			state.items.forEach((item) => {
				item.tags.forEach((tag) =>
					tag.id === action.payload.id
						? (tag.name = action.payload.name)
						: null
				);
			});
			return {
				...state,
            };
            
        case UPDATE_ITEMSDELETEDTAG:
            state.items.forEach(item => {
                const newTags = item.tags.filter(tag => tag.id !== action.payload)
                item.tags = newTags;
            })
            return {
                ...state,
            }
		default:
			return state;
	}
}