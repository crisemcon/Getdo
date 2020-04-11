
import React, {useReducer} from 'react';
import itemsContext from './itemsContext';
import itemsReducer from './itemsReducer';

import {v4 as uuid} from 'uuid';

import {ITEM_CATEGORIE, ADD_ITEM, VALIDATE_ITEM, DELETE_ITEM, UPDATE_ITEM, ITEM_STATE, CURRENT_ITEM} from '../../types';

const ItemsState = props => {
    const initialState = {
        items: [
			{id: 1, category: "inbox", name: "test name", note: "testingtestingtesting"},
			{id: 2, category: "next", name: "test name", note: "testingtestingtesting"},
			{id: 3, category: "projects", name: "test name", note: "testingtestingtesting"},
			{id: 4, category: "notebooks", name: "test name", note: "testingtestingtesting"},
			{id: 5, category: "inbox", name: "test name", note: "testingtestingtesting"},
			{id: 6, category: "inbox", name: "test name", note: "testingtestingtesting"},
			{id: 7, category: "waiting", name: "test name", note: "testingtestingtesting"},
			{id: 8, category: "someday", name: "test name", note: "testingtestingtesting"},
			{id: 9, category: "focus", name: "test name", note: "testingtestingtesting"},
			{id: 10, category: "trash", name: "test name", note: "testingtestingtesting"},
			{id: 11, category: "trash", name: "test name", note: "testingtestingtesting"},
			{id: 12, category: "focus", name: "test name", note: "testingtestingtesting"},
			{id: 13, category: "someday", name: "test name", note: "testingtestingtesting"},
			{id: 14, category: "notebooks", name: "test name", note: "testingtestingtesting"},
			{id: 15, category: "next", name: "test name", note: "testingtestingtesting"},
			{id: 16, category: "inbox", name: "test name", note: "testingtestingtesting"},
			{id: 17, category: "someday", name: "test name", note: "testingtestingtesting"},
			{id: 18, category: "waiting", name: "test name", note: "testingtestingtesting"},
			{id: 19, category: "projects", name: "test name", note: "testingtestingtesting"},
        ],
        categoryitems: [],
        erroritem: false,
        selecteditem: null
    }

    //create dispatch and state
    const [state, dispatch] = useReducer(itemsReducer, initialState);

    //FUNCTIONS
    //obtener las tareas de un proyecto
    const getItems = category => {
        dispatch({
            type: ITEM_CATEGORIE,
            payload: category
        })
    }
	/*
    //agregar una tarea al proyecto seleccionado
    const agregarTarea = tarea => {
        tarea.id = uuid();
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    //valida y muestra un erro en caso de que sea necesario
    const validarTarea= () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //elimina tarea por id
    const eliminarTarea= id => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }

    //cambia el estado de cada tarea
    const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }

    //extrae una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //edita o modifica una tarea
    const actualizarTarea = tarea => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        })
    }*/
    return (
        <itemsContext.Provider value={{
            items: state.items,
            categoryitems: state.categoryitems,
            erroritem: state.erroritem,
            selecteditem: state.selecteditem,
            getItems,
        }}>
            {props.children}
        </itemsContext.Provider>
    )
}

export default ItemsState;