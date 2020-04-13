import {ITEM_CATEGORIE, ADD_ITEM, VALIDATE_ITEM, DELETE_ITEM, FOCUS_ITEM, ITEM_STATE, CURRENT_ITEM, UPDATE_ITEM} from '../../types';

export default(state, action) => {
    switch(action.type) {

        case ITEM_CATEGORIE:
            if (action.payload === "focus"){
                return {
                    ...state,
                    categoryitems: state.items.filter(item => item.focus === true)
                }
            } else if(action.payload ==="tags"){
                return {
                    ...state,
                    categoryitems: []
                }
            }
            return {
                ...state,
                categoryitems: state.items.filter(item => item.category === action.payload)
            }

        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload],
                erroritem: false
            }

        case VALIDATE_ITEM:
            return {
                ...state,
                erroritem: true
            }

        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            }
        case FOCUS_ITEM:
            const focus = action.payload.focus;
            return {
                ...state,
                items: [...state.items, state.items.filter(item => item.id === action.payload.id)[0].focus =  !focus]
            }
        case UPDATE_ITEM:
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
            }

        default:
            return state;
    }
}