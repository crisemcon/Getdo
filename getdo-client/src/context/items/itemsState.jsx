import React, { useReducer } from "react";
import itemsContext from "./itemsContext";
import itemsReducer from "./itemsReducer";

import { v4 as uuid } from "uuid";

import {
	ITEM_CATEGORIE,
	ADD_ITEM,
	VALIDATE_ITEM,
	DELETE_ITEM,
	UPDATE_ITEM,
	ITEM_STATE,
	CURRENT_ITEM,
} from "../../types";

const ItemsState = (props) => {
	const lorem =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
	const initialState = {
		items: [
			{ id: 1, category: "inbox", name: "test inbox", note: lorem },
			{ id: 2, category: "next", name: "test next", note: lorem },
			{ id: 3, category: "projects", name: "test project", note: lorem },
			{
				id: 4,
				category: "notebooks",
				name: "test name",
				note: lorem,
			},
			{ id: 5, category: "inbox", name: "test inbox", note: lorem },
			{ id: 6, category: "inbox", name: "test inbox", note: lorem },
			{ id: 7, category: "waiting", name: "test waiting", note: lorem },
			{ id: 8, category: "someday", name: "test someday", note: lorem },
			{ id: 9, category: "focus", name: "test focus", note: lorem },
			{ id: 10, category: "trash", name: "test trash", note: lorem },
			{ id: 11, category: "trash", name: "test trash", note: lorem },
			{ id: 12, category: "focus", name: "test focus", note: lorem },
			{ id: 13, category: "someday", name: "test someday", note: lorem },
			{
				id: 14,
				category: "notebooks",
				name: "test name",
				note: lorem,
			},
			{ id: 15, category: "next", name: "test next", note: lorem },
			{ id: 16, category: "inbox", name: "test inbox", note: lorem },
			{ id: 17, category: "someday", name: "test someday", note: lorem },
			{ id: 18, category: "waiting", name: "test waiting", note: lorem },
			{
				id: 19,
				category: "projects",
				name: "test project",
				note: lorem,
			},
			{ id: 20, category: "next", name: "test next", note: lorem },
		],
		categoryitems: [],
		erroritem: false,
		selecteditem: null,
	};

	//create dispatch and state
	const [state, dispatch] = useReducer(itemsReducer, initialState);

	//FUNCTIONS
	//obtener las tareas de un proyecto
	const getItems = (category) => {
		dispatch({
			type: ITEM_CATEGORIE,
			payload: category,
		});
	};

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
		<itemsContext.Provider
			value={{
				items: state.items,
				categoryitems: state.categoryitems,
				erroritem: state.erroritem,
				selecteditem: state.selecteditem,
				getItems,
			}}
		>
			{props.children}
		</itemsContext.Provider>
	);
};

export default ItemsState;
