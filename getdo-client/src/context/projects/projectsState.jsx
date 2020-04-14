import React, { useReducer } from "react";
import projectsContext from "./projectsContext";
import projectsReducer from "./projectsReducer";
import {
	//PROJECT_CATEGORIE,
	ADD_PROJECT,
	VALIDATE_PROJECT,
	DELETE_PROJECT,
	FOCUS_PROJECT,
	UPDATE_PROJECTSTAG,
	UPDATE_PROJECTSDELETEDTAG,
} from "../../types";
import { v4 as uuid } from "uuid";


const ProjectsState = (props) => {
	const initialState = {
		projects: [
			{
				id: 1,
				name: 'Develop Getdo',
				//type: 'parallel',
				//category: 'next',
				itemsid: [2, 5, 7],
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 3, name: "Computador", type: "label" },
				]
			},
			{
				id: 2,
				name: 'Develop Project Section',
				//type: 'parallel',
				//category: 'next',
				itemsid: [2, 4],
				tags: [
					{ id: 3, name: "Computador", type: "label" },
				]
			},
			{
				id: 3,
				name: 'Develop New Project',
				//type: 'parallel',
				//category: 'next',
				itemsid: [3, 5],
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
					{ id: 3, name: "Computador", type: "label" },
				]
			}
		],
		categoryprojects: [],
		errorproject: false,
		selectedproject: null,
	};

	//create dispatch and state
	const [state, dispatch] = useReducer(projectsReducer, initialState);

	//TODO FUNCTIONS
	//get Projects from selected category
	/*const getProjects = (category) => {
		dispatch({
			type: PROJECT_CATEGORIE,
			payload: category,
		});
	};
*/
	//add new project
	const addProject = (project) => {
		project.id = uuid();
		dispatch({
			type: ADD_PROJECT,
			payload: project,
		});
	};

	//validate the projectname and display an error if it is empty
	const validateProject = () => {
		dispatch({
			type: VALIDATE_PROJECT,
		});
	};

	//permanently deletes an project by its id
	const deleteProject = (projectId) => {
		dispatch({
			type: DELETE_PROJECT,
			payload: projectId,
		});
	};

	//focus or unfocus an project
	const focusProject = (project) => {
		dispatch({
			type: FOCUS_PROJECT,
			payload: project,
		});
	};

	//update project when tagState is modified
	const updateProjectsTag = (tag) => {
		dispatch({
			type: UPDATE_PROJECTSTAG,
			payload: tag,
		})
	}

	//update Projects when a tag is deleted
	const updateProjectsDeletedTag = (tagId) => {
		dispatch({
			type: UPDATE_PROJECTSDELETEDTAG,
			payload: tagId,
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
		<projectsContext.Provider
			value={{
				projects: state.projects,
				categoryprojects: state.categoryprojects,
				errorproject: state.errorproject,
				selectedproject: state.selectedproject,
				//getProjects,
				addProject,
				validateProject,
				deleteProject,
				focusProject,
				updateProjectsTag,
				updateProjectsDeletedTag,
			}}
		>
			{props.children}
		</projectsContext.Provider>
	);
};

export default ProjectsState;
