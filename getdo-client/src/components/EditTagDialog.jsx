import React, { useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import Alert from "@material-ui/lab/Alert";

import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";

import tagsContext from "../context/tags/tagsContext";

import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
	button: {
		marginTop: 6,
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
	formControl: {
		minWidth: 120,
		marginBottom: 10,
	},
	form: {
		display: "flex",
		flexDirection: "column",
		margin: "auto",
	},
	doneButton: {
		fontSize: 36,
	},
	alert: {
		marginRight: "auto",
		marginLeft: 16,
	},
}));

export default function EditTagDialog({ tag, handleMenuClose }) {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
		handleMenuClose();
	};

	const handleClose = () => {
		resetState();
		setOpen(false);
	};

	//get tags State
	const tagContext = useContext(tagsContext);
	const { errortag, validateTag, updateTag } = tagContext;

	//form
	//form tag state
	const [editedtag, editTag] = useState({
		id: tag.id,
		name: tag.name,
		type: tag.type,
	});
	//reset tag state
	const resetState = () => {
		editTag({
			name: tag.name,
		});
	};
	//function to read form values
	const handleFormChange = (e) => {
		editTag({
			...editedtag,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = () => {
		//e.preventDefault();
		//validate if tagname is empty
		if (editedtag.name.trim() === "") {
			validateTag();
			return;
		}

		///////////////////////TODO revisa si es edicion o nueva tarea
		/*if(tareaseleccionada === null){
            //tarea nueva
            //agregar la nueva tarea al state de tareas
            tarea.proyectoId = proyectoActual.id;
            tarea.estado = false;
            agregarTarea(tarea);   
        } else {
            //actualizar tarea existente
            actualizarTarea(tarea);
		}*/

		console.log(editedtag);
		//new tag
		updateTag(editedtag);

		//reset form and close dialog
		setOpen(false);
		resetState();
	};

	return (
		<div>
			<MenuItem onClick={handleClickOpen}>
				<ListItemIcon>
					<EditIcon fontSize="small" />
				</ListItemIcon>
				Edit
			</MenuItem>
			<Dialog
				fullScreen={fullScreen}
				fullWidth={true}
				maxWidth="sm"
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle disableTypography id="form-dialog-title">
					<Typography variant="h6">{`New ${tag.type} tag`}</Typography>
					<IconButton
						aria-label="close"
						className={classes.closeButton}
						onClick={handleClose}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers>
					<form className={classes.form} noValidate>
						<FormControl className={classes.formControl}>
							<TextField
								autoFocus
								id="tagname"
								name="name"
								label="Tag Name"
								value={editedtag.name}
								onChange={handleFormChange}
							/>
						</FormControl>
					</form>
				</DialogContent>
				<DialogActions>
					{errortag ? (
						<Alert
							classes={{ root: classes.alert }}
							variant="outlined"
							severity="error"
						>
							Tag name is required
						</Alert>
					) : null}
					<IconButton aria-label="submit" onClick={handleSubmit}>
						<DoneIcon classes={{ root: classes.doneButton }} />
					</IconButton>
				</DialogActions>
			</Dialog>
		</div>
	);
}
