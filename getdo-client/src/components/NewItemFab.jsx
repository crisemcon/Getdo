import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";

import NewItemDialog from "../components/NewItemDialog";

//icons
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
	fab: {
		position: "fixed",
		bottom: 20,
		right: 20,
		zIndex: 10,
		[theme.breakpoints.up("sm")]: {
			bottom: 40,
			right: 40,
			height: 70,
			width: 70,
		},
		[theme.breakpoints.up("md")]: {
			bottom: 60,
			right: 60,
			height: 80,
			width: 80,
		},
	},
	fabIcon: {
		fontSize: "default",
		[theme.breakpoints.up("md")]: {
			fontSize: 32,
		},
	},
}));

export default function NewItemFab() {
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	return (
		<>
			<Fab
				classes={{ root: classes.fab }}
				color="default"
				aria-label="add"
				onClick={handleClickOpen}
			>
				<AddIcon classes={{ root: classes.fabIcon }} />
			</Fab>
			{open ? <NewItemDialog open={open} setOpen={setOpen} /> : null}
		</>
	);
}
