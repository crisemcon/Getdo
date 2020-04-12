/* eslint-disable */
import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import itemsContext from "../../context/items/itemsContext";

import MainCard from "../../components/MainCard";
import { Typography } from "@material-ui/core";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 12,
		paddingTop: 6,
		transition: theme.transitions.create(),
		[theme.breakpoints.up("sm")]: {
			padding: 18,
			paddingTop: 12,
		},
	},
	item: {
		marginTop: 6,
		marginBottom: 6,
	},
}));

const MainContent = () => {
	const classes = useStyles();

	//get itemsState
	const itemlistContext = useContext(itemsContext);
	const { categoryitems, getItems, deleteItem } = itemlistContext;

	const handleDelete = (item) => {
		const currentcategory = item.category;
		if(item.category === "trash") {
			deleteItem(item.id);
		} else {
			item.category = "trash";
		}
		getItems(currentcategory);
	}

	return (
		<Grid
			className={classes.root}
			container
			justify="flex-start"
			alignItems="flex-start"
		>
			{categoryitems.length === 0 ? (
				<Typography>No hay tareas</Typography>
			) : (
				categoryitems.map((item) => (
					<Grid key={item.id} item xs={12} className={classes.item}>
						<MainCard item={item} handleDelete={handleDelete} />
					</Grid>
				))
			)}
		</Grid>
	);
};

export default MainContent;
