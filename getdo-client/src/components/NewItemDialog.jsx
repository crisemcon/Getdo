import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Fab from "@material-ui/core/Fab";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

import Alert from "@material-ui/lab/Alert";

import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";

import itemsContext from "../context/items/itemsContext";
import sidebarContext from "../context/sidebar/sidebarContext";
import tagsContext from "../context/tags/tagsContext";

//icons
import InboxIcon from "@material-ui/icons/Inbox";
import DoubleArrowSharpIcon from "@material-ui/icons/DoubleArrowSharp";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import ScheduleIcon from "@material-ui/icons/Schedule";
import CakeIcon from "@material-ui/icons/Cake";
import ListIcon from "@material-ui/icons/List";
import LabelIcon from "@material-ui/icons/Label";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "@material-ui/icons/Add";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import PersonIcon from "@material-ui/icons/Person";
import CreateIcon from "@material-ui/icons/Create";

import TextField from "@material-ui/core/TextField";

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

export default function NewItemDialog() {
	const classes = useStyles();

	//get itemsState
	const itemlistContext = useContext(itemsContext);
	const {
		erroritem,
		getItems,
		addItem,
		validateItem,
		getProjects,
		itemBelongsProject,
	} = itemlistContext;

	//get currentCategory State
	const categoryContext = useContext(sidebarContext);
	const { category } = categoryContext;

	//get tags State
	const tagContext = useContext(tagsContext);
	const { tags } = tagContext;

	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
		resetState();
	};

	const resetState = () => {
		updateItem({
			name: "",
			note: "",
			category: "inbox",
			tags: [],
			parent: "standalone",
		});
	};

	//form
	//form item state
	const [item, updateItem] = useState({
		name: "",
		note: "",
		category: "inbox",
		tags: [],
		parent: "standalone",
	});

	//function to read form values
	const handleFormChange = (e) => {
		updateItem({
			...item,
			[e.target.name]: e.target.value,
		});
	};

	//tags functions
	const tagIcon = (tag) => {
		if (tag.type === "label") {
			return <LocalOfferIcon />;
		} else if (tag.type === "area") {
			return <LocationOnIcon />;
		}
		return <PersonIcon />;
	};

	const handleSubmit = () => {
		//e.preventDefault();
		//validate if itemname is empty
		if (item.name.trim() === "") {
			validateItem();
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

		//new item
		addItem(item);

		//if it has a parent, attach to it
		if (item.parent !== "standalone") {
			itemBelongsProject(item);
		}

		//get and display the new item if it belongs to the current category
		if (category === item.category) {
			getItems(category);
		}
		//reset form and close dialog
		setOpen(false);
		resetState();
	};

	/*//action name textfield
	const [namevalue, setNameValue] = React.useState("");
	const handleNameChange = (event) => {
		setNameValue(event.target.value);
	};
	//action notes textfield
	const [notevalue, setNoteValue] = React.useState("");
	const handleNoteChange = (event) => {
		setNoteValue(event.target.value);
	};*/

	//category select

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
			<Dialog
				fullScreen={fullScreen}
				fullWidth={true}
				maxWidth="sm"
				open={open}
				onClose={handleClose}
				aria-labelledby="max-width-dialog-title"
			>
				<DialogTitle disableTypography id="max-width-dialog-title">
					<>
						<Typography variant="h6">New Action</Typography>
						<IconButton
							aria-label="close"
							className={classes.closeButton}
							onClick={handleClose}
						>
							<CloseIcon />
						</IconButton>
					</>
				</DialogTitle>
				<DialogContent dividers>
					<form className={classes.form} noValidate>
						<FormControl className={classes.formControl}>
							<TextField
								autoFocus
								id="itemname"
								name="name"
								label="Action Name"
								multiline
								rowsMax="2"
								value={item.name}
								onChange={handleFormChange}
							/>
						</FormControl>
						<FormControl className={classes.formControl}>
							<TextField
								id="itemnote"
								name="note"
								label="Note or Description"
								multiline
								rowsMax="5"
								value={item.note}
								onChange={handleFormChange}
							/>
						</FormControl>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="category">Category</InputLabel>
							<Select
								name="category"
								value={item.category}
								onChange={handleFormChange}
								/*inputProps={{
									name: "max-width",
									id: "max-width",
								}}*/
							>
								<MenuItem value="inbox">
									<ListItemIcon>
										<InboxIcon />
									</ListItemIcon>
									Inbox
								</MenuItem>
								<MenuItem value="next">
									<ListItemIcon>
										<DoubleArrowSharpIcon />
									</ListItemIcon>
									Next
								</MenuItem>
								<MenuItem value="waiting">
									<ListItemIcon>
										<HourglassEmptyIcon />
									</ListItemIcon>
									Waiting
								</MenuItem>
								<MenuItem value="scheduled">
									<ListItemIcon>
										<ScheduleIcon />
									</ListItemIcon>
									Scheduled
								</MenuItem>
								<MenuItem value="someday">
									<ListItemIcon>
										<CakeIcon />
									</ListItemIcon>
									Someday
								</MenuItem>
								<MenuItem value="projects">
									<ListItemIcon>
										<ListIcon />
									</ListItemIcon>
									Projects
								</MenuItem>
								<MenuItem value="notebooks">
									<ListItemIcon>
										<LabelIcon />
									</ListItemIcon>
									Notebooks
								</MenuItem>
							</Select>
						</FormControl>

						{item.category !== "projects" &&
						item.category !== "notebooks" ? (
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="parent">Parent</InputLabel>
								<Select
									name="parent"
									value={item.parent}
									onChange={handleFormChange}
									/*inputProps={{
									name: "max-width",
									id: "max-width",
								}}*/
								>
									<MenuItem
										key="standalone"
										value="standalone"
									>
										<ListItemIcon>
											<CreateIcon />
										</ListItemIcon>
										Standalone
									</MenuItem>
									{getProjects().map((project) => (
										//

										<MenuItem
											key={project.id}
											value={project.id}
											//style={getStyles(name, personName, theme)}
										>
											<ListItemIcon>
												<ListIcon />
											</ListItemIcon>
											{project.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						) : null}

						<FormControl className={classes.formControl}>
							<InputLabel id="tags-multiple-select">
								Tags
							</InputLabel>
							<Select
								labelId="tags-multiple-select"
								id="tags-multiple-select"
								name="tags"
								multiple
								value={item.tags}
								onChange={handleFormChange}
								input={<Input id="select-multiple-chip" />}
								renderValue={(selected) => (
									<div className={classes.chips}>
										{selected.map((tag) => {
											return (
												<Chip
													key={tag.id}
													label={tag.name}
													className={classes.chip}
												/>
											);
										})}
									</div>
								)}
								MenuProps={{ variant: "menu" }}
							>
								{tags.map((tag) => (
									//
									<MenuItem
										key={tag.id}
										value={tag}
										//style={getStyles(name, personName, theme)}
									>
										<ListItemIcon>
											{tagIcon(tag)}
										</ListItemIcon>
										{tag.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</form>
				</DialogContent>
				<DialogActions>
					{erroritem ? (
						<Alert
							classes={{ root: classes.alert }}
							variant="outlined"
							severity="error"
						>
							Action name is required
						</Alert>
					) : null}
					<IconButton aria-label="submit" onClick={handleSubmit}>
						<DoneIcon classes={{ root: classes.doneButton }} />
					</IconButton>
				</DialogActions>
			</Dialog>
		</>
	);
}
