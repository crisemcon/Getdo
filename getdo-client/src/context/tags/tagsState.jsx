import React, { useReducer } from "react";
import tagsContext from "./tagsContext";
import tagsReducer from "./tagsReducer";

import { v4 as uuid } from "uuid";

import axiosClient from "../../config/axios";

import {ADD_TAG, VALIDATE_TAG, DELETE_TAG, UPDATE_TAG, FETCH_TAGS, TAG_ERROR } from "../../types";

const TagsState = (props) => {
	const initialState = {
		tags: [],/*[
			{ _id: 1, name: "Universidad", type: "area" },
			{ _id: 2, name: "Mariella", type: "contact" },
			{ _id: 3, name: "Computador", type: "label" },
			{ _id: 4, name: "Casa", type: "area" },
			{ _id: 5, name: "Bastianex", type: "contact" },
			{ _id: 6, name: "Celular", type: "label" },
		],*/
		errortag: false,
		alert: null,
	};
	
	//create dispatch and state
	const [state, dispatch] = useReducer(tagsReducer, initialState);

	//FUNCTIONS
	//fetch tags from db
	const fetchTags = async() => {
		try {
			const result = await axiosClient.get('/api/tags');
			dispatch({
				type: FETCH_TAGS,
				payload: result.data.tags
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

	//get tags by ids (array)
	const getTags = tagsid => {
		const tagsArray = state.tags.filter(function(tag){
			return tagsid.indexOf(tag._id) !== -1;
		})
		return tagsArray;
	};

	//add new item
	const addTag = async tag => {
		/*tag._id = uuid();
		dispatch({
			type: ADD_TAG,
			payload: tag,
		});*/
		try {
            const result = await axiosClient.post('/api/tags', tag);
            console.log(result);
            //insertar el proyecto en el state
            dispatch({
                type: ADD_TAG,
                payload: result.data
            })
        } catch (error) {
            const alert = {
                msg: 'There was an error',
                categoria: 'error'
            }
            dispatch({
                type: TAG_ERROR,
                payload: alert
            })
        }
	};

	//validate the itemname and display an error if it is empty
	const validateTag = () => {
		dispatch({
			type: VALIDATE_TAG,
		});
	};

	//permanently deletes a tag by its id
	const deleteTag = async tagId => {
		/*dispatch({
			type: DELETE_TAG,
			payload: tagId,
		});*/
		try {
            await axiosClient.delete(`/api/tags/${tagId}`);
            dispatch({
                type: DELETE_TAG,
                payload: tagId
            })
        } catch (error) {
            const alert = {
                msg: 'There was an error',
                categoria: 'error'
            }
            dispatch({
                type: TAG_ERROR,
                payload: alert
            })
        }
	};

	//updates a tag
	const updateTag = async tag => {
		/*dispatch({
			type: UPDATE_TAG,
			payload: tag,
		})*/
		try {
            const result = await axiosClient.put(`/api/tags/${tag._id}`, tag);
            console.log(result);
            dispatch({
                type: UPDATE_TAG,
                payload: result.data.tag
            })
        } catch (error) {
            const alert = {
                msg: 'There was an error',
                categoria: 'error'
            }
            dispatch({
                type: TAG_ERROR,
                payload: alert
            })
        }
	}


	return (
		<tagsContext.Provider value={{
			tags: state.tags,
			errortag: state.errortag,
			getTags,
			addTag,
			validateTag,
			deleteTag,
			updateTag,
			fetchTags,

		}}>{props.children}</tagsContext.Provider>
	);
};

export default TagsState;
