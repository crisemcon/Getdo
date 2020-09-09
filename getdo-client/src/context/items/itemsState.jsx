import React, { useReducer } from "react";
import itemsContext from "./itemsContext";
import itemsReducer from "./itemsReducer";

import axiosClient from "../../config/axios";

import {
	ITEM_CATEGORIE,
	ADD_ITEM,
	VALIDATE_ITEM,
	DELETE_ITEM,
	CURRENT_ITEM,
	EDIT_ITEM,
	UNSELECT_ITEM,
	ITEM_ERROR,
	FETCH_ITEMS,
} from "../../types";

const ItemsState = (props) => {
	const initialState = {
		items: [],
		categoryitems: [],
		erroritem: false,
		currentitem: null,
		alert: null,
	};

	//create dispatch and state
	const [state, dispatch] = useReducer(itemsReducer, initialState);

	//FUNCTIONS

	//fetch items from db
	const fetchItems = async() => {
		try {
			const result = await axiosClient.get('/api/items');
			dispatch({
				type: FETCH_ITEMS,
				payload: result.data.items
			})
		} catch(error) {
			/*const alert = {
				msg: 'There was an error',
				category: 'error'
			}
			dispatch({
				type: ITEM_ERROR,
				payload: alert
			})*/
			console.log(error);
		}
	}
	//get items from selected category
	const getItems = (category) => {
		dispatch({
			type: ITEM_CATEGORIE,
			payload: category,
		});
	};

	//add new item
	const addItem = async item => {
		/*
		item._id = uuid();
		dispatch({
			type: ADD_ITEM,
			payload: item,
		});
		*/
		try {
            const result = await axiosClient.post('/api/items', item);
            //console.log(result);
            //insertar el proyecto en el state
            dispatch({
                type: ADD_ITEM,
                payload: result.data
			})
			return result.data;
        } catch (error) {
            const alert = {
                msg: 'There was an error',
                categoria: 'error'
            }
            dispatch({
                type: ITEM_ERROR,
                payload: alert
            })
        }
	};

	//validate the itemname and display an error if it is empty
	const validateItem = () => {
		dispatch({
			type: VALIDATE_ITEM,
		});
	};

	//permanently deletes an item by its id
	const deleteItem = async item => {
		/*
		dispatch({
			type: DELETE_ITEM,
			payload: item,
		});
		*/
		try {
            await axiosClient.delete(`/api/items/${item._id}`);
            dispatch({
                type: DELETE_ITEM,
                payload: item
            })
        } catch (error) {
            const alert = {
                msg: 'There was an error',
                categoria: 'error'
            }
            dispatch({
                type: ITEM_ERROR,
                payload: alert
            })
        }
	};

	//focus or unfocus an item
	const focusItem = async (item) => {
		const selectedItem = state.items.filter(
			(currentItem) => currentItem._id === item._id
		)[0];
		selectedItem.focus = !item.focus;
		await editItem(selectedItem);
	};

	//done or undone an item
	const doneItem = async (item) => {
		const selectedItem = state.items.filter(
			(currentItem) => currentItem._id === item._id
		)[0];
		selectedItem.done = !item.done;
		await editItem(selectedItem);
	}

	//update item when tagState is modified
	const updateItemsTag = (tag) => {
		state.items.forEach((currentItem) => {
			currentItem.tags.forEach((currentTag) =>
				currentTag._id === tag._id
					? (currentTag.name = tag.name, editItem(currentItem))
					: null
			);
			if (currentItem.waiting) {
				if (currentItem.waiting._id === tag._id) {
					currentItem.waiting.name = tag.name;
					editItem(currentItem);
				}
			}
		});
		/*dispatch({
			type: UPDATE_ITEMSTAG,
			payload: tag,
		});*/
	};

	//update items when a tag is deleted
	const updateItemsDeletedTag = (tagId) => {
		state.items.forEach((item) => {
			const newTags = item.tags.filter(
				(tag) => tag._id !== tagId
			);
			item.tags = newTags;
			if (item.waiting) {
				if (item.waiting._id === tagId) {
					item.waiting = null;
				}
			}
		});
	};


	//get items by id for projects, so trash items are not called
	const getItemsById = itemsid => {
		const itemArray = state.items.filter(function(item){
			return itemsid.indexOf(item._id) !== -1 && !item.trash;
		})
		return itemArray;
	};

	//get projects
	const getProjects = () => {
		return state.items.filter(item => item.category === "projects")
	}

	//attach item to project
	const itemBelongsProject = (item) => {
		const project = state.items.filter(project => project._id === item.parent)[0];
		project.items.push(item._id);
		editItem(project);
	}

	//dettach item to project
	const itemNotBelongsProject = (item) => {
		const project = state.items.filter(project => project._id === item.parent)[0];
		project.items = project.items.filter(projectItemId => projectItemId !== item._id);
		editItem(project);
	}

	//get project by id
	const getProjectById = (projectId) => {
		return state.items.filter(item => item._id === projectId)
	}

	//extracts an item to edit
	const saveCurrentItem = item => {
		dispatch({
			type: CURRENT_ITEM,
			payload: item,
		})
	}

	//edits an item
	const editItem = async item => {
		/*
		dispatch({
			type: EDIT_ITEM,
			payload: item,
		})
		*/
		try {
            const result = await axiosClient.put(`/api/items/${item._id}`, item);
            //console.log(result);
            dispatch({
                type: EDIT_ITEM,
                payload: result.data.item
            })
        } catch (error) {
            const alert = {
                msg: 'There was an error',
                categoria: 'error'
            }
            dispatch({
                type: ITEM_ERROR,
                payload: alert
            })
        }
	}

	//unselect current item
	const unselectCurrentItem = () => {
		dispatch({
			type: UNSELECT_ITEM,
		})
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
				currentitem: state.currentitem,
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
				itemNotBelongsProject,
				getProjectById,
				doneItem,
				saveCurrentItem,
				editItem,
				unselectCurrentItem,
				fetchItems,
			}}
		>
			{props.children}
		</itemsContext.Provider>
	);
};

export default ItemsState;
