import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import NewItemDialog from "../components/NewItemDialog";

//icons

import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
	form: {
		display: "flex",
		flexDirection: "column",
		margin: "auto",
	},
	formControl: {
		minWidth: 120,
		marginBottom: 10,
	},
	formControlLabel: {
		marginTop: theme.spacing(1),
	},
	button: {
		marginTop: 16,
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
	doneButton: {
		fontSize: 36,
	},
	alert: {
		marginRight: "auto",
		marginLeft: 16,
	},
	chips: {
		display: "flex",
		flexWrap: "wrap",
	},
	chip: {
		margin: 2,
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
}));

export default function NewProjectButton({projectId}) {
	const classes = useStyles();

	const [open, setOpen] = useState(false);


	const handleClickOpen = () => {
		setOpen(true);
	};

	return (
		<>
			<Button
				variant="outlined"
				color="default"
				onClick={handleClickOpen}
				className={classes.button}
				startIcon={<AddIcon />}
			>
				{`New project action`}
			</Button>
			{open ?
			<NewItemDialog open={open} setOpen={setOpen} projectId={projectId}/>
			: null}
		</>
	);
}
