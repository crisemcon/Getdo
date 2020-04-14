import React, { useReducer } from "react";

import sidebarContext from "./sidebarContext";
import sidebarReducer from "./sidebarReducer";

import { CURRENT_CATEGORY } from "../../types";

const SidebarState = (props) => {
	const initialState = {
		category: "inbox",
	};

	//Dispatch to execute the reducer actions
	const [state, dispatch] = useReducer(sidebarReducer, initialState);

	//selects the current category
	const currentCategory = (categoryname) => {
		dispatch({
			type: CURRENT_CATEGORY,
			payload: categoryname,
		});
	};

	//current category index
	const currentCategoryIndex = () => {
		switch (state.category) {
			case "inbox":
				return 0;
			case "next":
				return 1;
			case "waiting":
				return 2;
			case "scheduled":
				return 3;
			case "someday":
				return 4;
			case "focus":
				return 5;
			case "tags":
				return 6;
			case "projects":
				return 7;
			case "notebooks":
				return 8;
			case "trash":
				return 9;
			default:
				return null;
		}
	};

	return (
		<sidebarContext.Provider
			value={{
				category: state.category,
				currentCategory,
				currentCategoryIndex,
			}}
		>
			{props.children}
		</sidebarContext.Provider>
	);
};

export default SidebarState;
