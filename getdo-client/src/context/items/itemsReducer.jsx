import {
	ITEM_CATEGORIE,
	ADD_ITEM,
	VALIDATE_ITEM,
	DELETE_ITEM,
	FOCUS_ITEM,
    UPDATE_ITEMSTAG,
	UPDATE_ITEMSDELETEDTAG,
	ITEM_BELONGSPROJECT,
	/*ITEM_STATE,
	CURRENT_ITEM,
	UPDATE_ITEM,*/
} from "../../types";

export default (state, action) => {
	switch (action.type) {
		case ITEM_CATEGORIE:
			if (action.payload === "focus") {
				return {
					...state,
					categoryitems: state.items.filter(
						(item) => item.focus === true
					),
				};
			} else if (action.payload === "tags") {
				return {
					...state,
					categoryitems: [],
				};
			}
			return {
				...state,
				categoryitems: state.items.filter(
					(item) => item.category === action.payload
				),
			};

		case ADD_ITEM:
			return {
				...state,
				items: [...state.items, action.payload],
				erroritem: false,
			};

		case VALIDATE_ITEM:
			return {
				...state,
				erroritem: true,
			};

		case DELETE_ITEM:
			return {
				...state,
				items: state.items.filter((item) => item.id !== action.payload.id && action.payload.items.indexOf(item.id) === -1),
			};
		case FOCUS_ITEM:
			(state.items.filter(
				(item) => item.id === action.payload.id
			)[0].focus = !action.payload.focus);
			return {
				...state,
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
			
		case ITEM_BELONGSPROJECT:
			return {
				...state,

			}
		/*case UPDATE_ITEM:
        case ITEM_STATE:
            return {
                ...state,
                tareas: state.tareas.map(tarea => tarea.id === action.payload.id ? action.payload : tarea),
                tareaseleccionada: null
            }

        case CURRENT_ITEM:
            return {
                ...state,
                tareaseleccionada: action.payload
            }*/

		default:
			return state;
	}
};
