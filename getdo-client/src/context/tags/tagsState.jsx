import React, { useReducer } from "react";
import tagsContext from "./tagsContext";
import tagsReducer from "./tagsReducer";

import { v4 as uuid } from "uuid";

import {ADD_TAG, VALIDATE_TAG, DELETE_TAG, UPDATE_TAG } from "../../types";

const TagsState = (props) => {
	const initialState = {
		tags: [
			{ id: 1, name: "Universidad", type: "area" },
			{ id: 2, name: "Mariella", type: "contact" },
			{ id: 3, name: "Computador", type: "label" },
			{ id: 4, name: "Casa", type: "area" },
			{ id: 5, name: "Bastianex", type: "contact" },
			{ id: 6, name: "Celular", type: "label" },
		],
		errortag: false,
	};
	
	//create dispatch and state
	const [state, dispatch] = useReducer(tagsReducer, initialState);

	//FUNCTIONS
	//get tags by ids (array)
	const getTags = tagsid => {
		const tagsArray = state.tags.filter(function(tag){
			return tagsid.indexOf(tag.id) !== -1;
		})
		return tagsArray;
	};

	//add new item
	const addTag = tag => {
		tag.id = uuid();
		dispatch({
			type: ADD_TAG,
			payload: tag,
		});
	};

	//validate the itemname and display an error if it is empty
	const validateTag = () => {
		dispatch({
			type: VALIDATE_TAG,
		});
	};

	//permanently deletes a tag by its id
	const deleteTag = (tagId) => {
		dispatch({
			type: DELETE_TAG,
			payload: tagId,
		});
	};

	//updates a tag
	const updateTag = (tag) => {
		dispatch({
			type: UPDATE_TAG,
			payload: tag,
		})
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

		}}>{props.children}</tagsContext.Provider>
	);
};

export default TagsState;
