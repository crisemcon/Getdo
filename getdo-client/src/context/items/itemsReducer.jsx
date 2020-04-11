import {ITEM_CATEGORIE, ADD_ITEM, VALIDATE_ITEM, DELETE_ITEM, ITEM_STATE, CURRENT_ITEM, UPDATE_ITEM} from '../../types';

export default(state, action) => {
    switch(action.type) {

        case ITEM_CATEGORIE:
            return {
                ...state,
                categoryitems: state.items.filter(item => item.category === action.payload)
            }

        case ADD_ITEM:
            return {
                ...state,
                tareas: [ action.payload, ...state.tareas],
                errortarea: false
            }

        case VALIDATE_ITEM:
            return {
                ...state,
                errortarea: true
            }

        case DELETE_ITEM:
            return {
                ...state,
                tareas: state.tareas.filter(tarea => tarea.id !== action.payload),
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