import {
	ITEM_CATEGORIE,
	ADD_ITEM,
	VALIDATE_ITEM,
	DELETE_ITEM,
	FOCUS_ITEM,
	UPDATE_ITEMSTAG,
	UPDATE_ITEMSDELETEDTAG,
	ITEM_BELONGSPROJECT,
	DONE_ITEM,
	CURRENT_ITEM,
	EDIT_ITEM,
	UNSELECT_ITEM,
	SEARCH_ITEMS,
	SEARCH_FIELD,
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
				items: state.items.filter(
					(item) =>
						item.id !== action.payload.id &&
						action.payload.items.indexOf(item.id) === -1
				),
			};
		case FOCUS_ITEM:
			state.items.filter(
				(item) => item.id === action.payload.id
			)[0].focus = !action.payload.focus;
			return {
				...state,
			};

		case DONE_ITEM:
			state.items.filter(
				(item) => item.id === action.payload.id
			)[0].done = !action.payload.done;
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
				if (item.waiting) {
					if (item.waiting.id === action.payload.id) {
						item.waiting.name = action.payload.name;
					}
				}
			});
			return {
				...state,
			};

		case UPDATE_ITEMSDELETEDTAG:
			state.items.forEach((item) => {
				const newTags = item.tags.filter(
					(tag) => tag.id !== action.payload
				);
				item.tags = newTags;
				if (item.waiting) {
					if (item.waiting.id === action.payload) {
						item.waiting = null;
					}
				}
			});
			return {
				...state,
			};

		case ITEM_BELONGSPROJECT:
			return {
				...state,
			};

		case CURRENT_ITEM:
			return {
				...state,
				currentitem: action.payload,
			}

		case EDIT_ITEM:
			return {
				...state,
				items: state.items.map(item => item.id === action.payload.id ? action.payload : item),
				currentitem: null,
			}

		case UNSELECT_ITEM:
			return {
				...state,
				currentitem: null,
			}

		case SEARCH_ITEMS:
			return {
				...state,
				searchitems: state.search === "" ? state.categoryitems : state.categoryitems.filter(item => item.name.toLowerCase().includes(state.search)),
			}

		case SEARCH_FIELD:
			return {
				...state,
				search: action.payload
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
