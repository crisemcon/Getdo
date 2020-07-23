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
	FETCH_ITEMS,
	ITEM_ERROR,
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
						(item) => item.focus === true && item.trash === false
					),
				};
			} else if (action.payload === "tags") {
				return {
					...state,
					categoryitems: [],
				};
			} else if(action.payload === "trash"){
				return {
					...state,
					categoryitems: state.items.filter(
						(item) => item.trash === true
					)
				}
			}
			return {
				...state,
				categoryitems: state.items.filter(
					(item) => item.category === action.payload && item.trash === false
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
						item._id !== action.payload._id &&
						action.payload.items.indexOf(item._id) === -1
				),
			};

		case CURRENT_ITEM:
			return {
				...state,
				currentitem: action.payload,
			}

		case EDIT_ITEM:
			return {
				...state,
				items: state.items.map(item => item._id === action.payload._id ? action.payload : item),
				currentitem: null,
			}

		case UNSELECT_ITEM:
			return {
				...state,
				currentitem: null,
			}

		case FETCH_ITEMS:
			return {
				...state,
				items: action.payload
			}
		case ITEM_ERROR:
			return {
				...state,
				alert: action.payload
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
