import React, { useReducer } from "react";

import sidebarContext from "./sidebarContext";
import sidebarReducer from "./sidebarReducer";

import { CURRENT_CATEGORY } from "../../types";

const SidebarState = props => {
	const initialState = {
		category: "inbox",
	};

	//Dispatch to execute the reducer actions
	const [state, dispatch] = useReducer(sidebarReducer, initialState);

	//selects the current category
	const currentCategory = categoryname => {
		dispatch({
			type: CURRENT_CATEGORY,
			payload: categoryname,
		});
	};

	return (
		<sidebarContext.Provider
			value={{
				category: state.category,
				currentCategory,
			}}
		>
			{props.children}
		</sidebarContext.Provider>
	);
};

export default SidebarState;
