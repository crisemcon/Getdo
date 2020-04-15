import React, { useReducer } from "react";
import itemsContext from "./itemsContext";
import itemsReducer from "./itemsReducer";

import { v4 as uuid } from "uuid";

import {
	ITEM_CATEGORIE,
	ADD_ITEM,
	VALIDATE_ITEM,
	DELETE_ITEM,
	FOCUS_ITEM,
	UPDATE_ITEMSTAG,
	UPDATE_ITEMSDELETEDTAG,
	/*
	UPDATE_ITEM,
	ITEM_STATE,
	CURRENT_ITEM,*/
} from "../../types";

const ItemsState = (props) => {
	const lorem =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
	const initialState = {
		items: [
			{
				id: 1,
				category: "inbox",
				name: "test inbox",
				note: "",
				focus: false,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
					{ id: 3, name: "Computador", type: "label" },
				],
			},
			{
				id: 2,
				category: "next",
				name: "test next",
				note: lorem,
				focus: false,
				tags: [{ id: 1, name: "Universidad", type: "area" }],
				parent: 3,
			},
			{
				id: 3,
				category: "projects",
				name: "test project",
				note: lorem,
				focus: false,
				tags: [{ id: 3, name: "Computador", type: "label" }],
				items: [2, 6, 8],
			},
			{
				id: 4,
				category: "notebooks",
				name: "test name",
				note: lorem,
				focus: false,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
				],
			},
			{
				id: 5,
				category: "inbox",
				name: "test inbox",
				note: lorem,
				focus: false,
				tags: [
					{ id: 2, name: "Mariella", type: "contact" },
					{ id: 3, name: "Computador", type: "label" },
				],
			},
			{
				id: 6,
				category: "inbox",
				name: "test inbox",
				note: lorem,
				focus: true,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
					{ id: 3, name: "Computador", type: "label" },
				],
				parent: 3,
			},
			{
				id: 7,
				category: "waiting",
				name: "test waiting",
				note: lorem,
				focus: false,
				tags: [{ id: 3, name: "Computador", type: "label" }],
			},
			{
				id: 8,
				category: "someday",
				name: "test someday",
				note: lorem,
				focus: true,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
				],
				parent: 3,
			},
			{
				id: 9,
				category: "next",
				name: "test next",
				note: lorem,
				focus: false,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
					{ id: 3, name: "Computador", type: "label" },
				],
			},
			{
				id: 10,
				category: "trash",
				name: "test trash",
				note: lorem,
				focus: true,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
					{ id: 3, name: "Computador", type: "label" },
				],
			},
			{
				id: 11,
				category: "trash",
				name: "test trash",
				note: lorem,
				focus: false,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
				],
			},
			{
				id: 12,
				category: "next",
				name: "test next",
				note: lorem,
				focus: true,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
					{ id: 3, name: "Computador", type: "label" },
				],
			},
			{
				id: 13,
				category: "someday",
				name: "test someday",
				note: lorem,
				focus: false,
				tags: [{ id: 2, name: "Mariella", type: "contact" }],
			},
			{
				id: 14,
				category: "notebooks",
				name: "test name",
				note: lorem,
				focus: true,
				tags: [{ id: 1, name: "Universidad", type: "area" }],
			},
			{
				id: 15,
				category: "next",
				name: "test next",
				note: lorem,
				focus: true,
				tags: [{ id: 3, name: "Computador", type: "label" }],
			},
			{
				id: 16,
				category: "inbox",
				name: "test inbox",
				note: lorem,
				focus: false,
				tags: [
					{ id: 2, name: "Mariella", type: "contact" },
					{ id: 3, name: "Computador", type: "label" },
				],
				parent: 19,
			},
			{
				id: 17,
				category: "someday",
				name: "test someday",
				note: lorem,
				focus: false,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },

					{ id: 3, name: "Computador", type: "label" },
				],
				parent: 19,
			},
			{
				id: 18,
				category: "waiting",
				name: "test waiting",
				note: lorem,
				focus: false,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
					{ id: 3, name: "Computador", type: "label" },
				],
				parent: 19,
			},
			{
				id: 19,
				category: "projects",
				name: "test project 2",
				note: lorem,
				focus: false,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
					{ id: 3, name: "Computador", type: "label" },
				],
				items: [16, 17, 18],
			},
			{
				id: 20,
				category: "next",
				name: "test next",
				note: lorem,
				focus: false,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
				],
			},
		],
		categoryitems: [],
		erroritem: false,
		selecteditem: null,
	};

	//create dispatch and state
	const [state, dispatch] = useReducer(itemsReducer, initialState);

	//FUNCTIONS
	//get items from selected category
	const getItems = (category) => {
		dispatch({
			type: ITEM_CATEGORIE,
			payload: category,
		});
	};

	//add new item
	const addItem = (item) => {
		item.id = uuid();
		dispatch({
			type: ADD_ITEM,
			payload: item,
		});
	};

	//validate the itemname and display an error if it is empty
	const validateItem = () => {
		dispatch({
			type: VALIDATE_ITEM,
		});
	};

	//permanently deletes an item by its id
	const deleteItem = (id) => {
		dispatch({
			type: DELETE_ITEM,
			payload: id,
		});
	};

	//focus or unfocus an item
	const focusItem = (item) => {
		dispatch({
			type: FOCUS_ITEM,
			payload: item,
		});
	};

	//update item when tagState is modified
	const updateItemsTag = (tag) => {
		dispatch({
			type: UPDATE_ITEMSTAG,
			payload: tag,
		});
	};

	//update items when a tag is deleted
	const updateItemsDeletedTag = (tagId) => {
		dispatch({
			type: UPDATE_ITEMSDELETEDTAG,
			payload: tagId,
		});
	};


	//get items by id for projects, so trash items are not called
	const getItemsById = itemsid => {
		const itemArray = state.items.filter(function(item){
			return itemsid.indexOf(item.id) !== -1 && item.category !== "trash";
		})
		return itemArray;
	};

	//get projects
	const getProjects = () => {
		return state.items.filter(item => item.category === "projects")
	}

	//attach item to project
	const itemBelongsProject = (item) => {
		state.items.filter(project => project.id === item.parent)[0].items.push(item.id);
	}
	/*
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
				addItem,
				validateItem,
				deleteItem,
				focusItem,
				updateItemsTag,
				updateItemsDeletedTag,
				getItemsById,
				getProjects,
				itemBelongsProject,
			}}
		>
			{props.children}
		</itemsContext.Provider>
	);
};

export default ItemsState;
