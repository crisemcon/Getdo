import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Checkbox from "@material-ui/core/Checkbox";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Chip from "@material-ui/core/Chip";
import Battery20Icon from "@material-ui/icons/Battery20";
import Battery50Icon from "@material-ui/icons/Battery50";
import Battery80Icon from "@material-ui/icons/Battery80";
import TimerIcon from "@material-ui/icons/Timer";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import PersonIcon from "@material-ui/icons/Person";
import EventIcon from "@material-ui/icons/Event";
import NoteIcon from "@material-ui/icons/Note";
import ScheduleIcon from "@material-ui/icons/Schedule";
import RestoreIcon from '@material-ui/icons/Restore';

import itemsContext from "../context/items/itemsContext";
import sidebarContext from "../context/sidebar/sidebarContext";

import NewItemDialog from "../components/NewItemDialog";

import {calcDueDate, calcTimeRequired} from '../functions'

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
	avatar: {
		backgroundColor: red[500],
	},
	cardHeader: {
		paddingLeft: 4,
		paddingTop: 8,
		paddingRight: 12,
		paddingBottom: 0,
		display: "flex",
		alignItems: "center",
	},
	cardActions: {
		display: "flex",
		padding: 8,
		paddingRight: 4,
		paddingTop: 0,
		paddingBottom: 4,
		alignItems: "center",
	},
	tagContainer: {
		padding: 4,
		paddingRight: 8,
		paddingLeft: 8,
	},
	tag: {
		marginTop: 4,
		marginBottom: 4,
		marginRight: 8,
		padding: 2,
	},
	cardContent: {
		padding: 16,
		paddingTop: 4,
	},
	flexGrow: {
		flexGrow: 1,
	},
	cardHeaderAction: {
		paddingTop: 4,
	},
	itemIcon: {
		justifyContent: "center",
	},
}));

const ItemCard = ({ item, handleItemDelete, saveCurrentItem }) => {
	const classes = useStyles();
	const {
		name,
		note,
		tags,
		parent,
		dueDate,
		time,
		energy,
		waiting,
		schedule,
	} = item;

	//get itemsState
	const itemlistContext = useContext(itemsContext);
	const {
		getItems,
		focusItem,
		doneItem,
		getProjectById,
		editItem,
	} = itemlistContext;

	//get sidebarState
	const categoriesContext = useContext(sidebarContext);
	const { category } = categoriesContext;

	//edit item dialog
	const [open, setOpen] = useState(false);

	//get tagsState
	/*const tagContext = useContext(tagsContext);
	const { getTags } = tagContext;
	const tagsArray = getTags(item.tags);*/

	const tagIcon = (tag) => {
		if (tag.type === "label") {
			return <LocalOfferIcon />;
		} else if (tag.type === "area") {
			return <LocationOnIcon />;
		}
		return <PersonIcon />;
	};

	const energyIcon = () => {
		if (energy === "Low") {
			return <Battery20Icon />;
		} else if (energy === "Medium") {
			return <Battery50Icon />;
		} else return <Battery80Icon />;
	};

	//collapse and expand state
	const [expanded, setExpanded] = useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	//options menu state
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleEditClick = () => {
		saveCurrentItem(item);
		handleClose();
		setOpen(true);
	};

	const handleDeleteClick = () => {
		handleItemDelete(item);
	};

	const handleRestoreClick = () => {
		item.trash = false;
		getItems("trash");
	}

	const handleItemFocus = () => {
		focusItem(item);
		getItems(category);
		
	};

	const handleItemDone = () => {
		doneItem(item);
		getItems(category);
	};

	const handleNoteCheck = (line) => {
		const index = note.indexOf(line);
		let firstPart = note.substr(0, index);
		let lastPart = note.substr(index + 1);

		saveCurrentItem(item);

		if (line[0] === "x") item.note = firstPart + "-" + lastPart;
		if (line[0] === "-") item.note = firstPart + "x" + lastPart;

		editItem(item);
	};

	return (
		<Card>
			<CardHeader
				classes={{
					root: classes.cardHeader,
					action: classes.cardHeaderAction,
				}} //this is the way to customize children
				avatar={
					item.category !== "notebooks" ? (
						<Checkbox
							checked={item.done}
							onChange={handleItemDone}
							inputProps={{ "aria-label": "primary checkbox" }}
						/>
					) : (
						<ListItemIcon classes={{ root: classes.itemIcon }}>
							<NoteIcon />
						</ListItemIcon>
					)
				}
				action={
					<>
						<FormControlLabel
							control={
								<Checkbox
									icon={<StarBorderIcon />}
									checkedIcon={<StarIcon />}
									name="checkedH"
									checked={item.focus}
									onChange={handleItemFocus}
								/>
							}
						/>
						<IconButton
							aria-label="settings"
							aria-haspopup="true"
							onClick={handleClick}
						>
							<MoreVertIcon />
						</IconButton>
						<Menu
							id="simple-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							{item.trash ? (
								<MenuItem onClick={handleRestoreClick}>
									<ListItemIcon>
										<RestoreIcon fontSize="small" />
									</ListItemIcon>
									Restore
								</MenuItem>
							) : (
								<div>
								<MenuItem onClick={handleEditClick}>
									<ListItemIcon>
										<EditIcon fontSize="small" />
									</ListItemIcon>
									Edit
								</MenuItem>
								{open ? (
									<NewItemDialog open={open} setOpen={setOpen} />
								) : null}
								
								</div>)
							}
							<MenuItem onClick={handleDeleteClick}>
								<ListItemIcon>
									<DeleteIcon fontSize="small" />
								</ListItemIcon>
								Delete
							</MenuItem>
						</Menu>
					</>
				}
				title={name}
				subheader={
					parent !== "standalone"
						? getProjectById(item.parent)[0].name
						: null
				}
			/>
			<CardActions disableSpacing classes={{ root: classes.cardActions }}>
				<Grid className={classes.tagContainer} container>
					<Grid className={classes.flexGrow} item>
						{tags.length === 0
							? null
							: tags.map((tag) => (
									<Chip
										icon={tagIcon(tag)}
										key={tag._id}
										classes={{ root: classes.tag }}
										variant="outlined"
										size="small"
										label={tag.name}
									/>
							  ))}
					</Grid>
					<Grid item>
						{schedule ? (
							<Chip
								classes={{ root: classes.tag }}
								disabled
								variant="outlined"
								size="small"
								icon={<ScheduleIcon />}
								label={new Date(schedule).toLocaleString()}
							/>
						) : null}
						{waiting ? (
							<Chip
								classes={{ root: classes.tag }}
								disabled
								variant="outlined"
								size="small"
								icon={<PersonIcon />}
								label={waiting.name}
							/>
						) : null}
						{dueDate ? (
							<Chip
								classes={{ root: classes.tag }}
								disabled
								variant="outlined"
								size="small"
								icon={<EventIcon />}
								label={calcDueDate(dueDate)}
							/>
						) : null}
						{time ? (
							<Chip
								classes={{ root: classes.tag }}
								disabled
								variant="outlined"
								size="small"
								icon={<TimerIcon />}
								label={calcTimeRequired(time)}
							/>
						) : null}
						{energy ? (
							<Chip
								classes={{ root: classes.tag }}
								disabled
								variant="outlined"
								size="small"
								icon={energyIcon()}
								label={energy}
							/>
						) : null}
					</Grid>
				</Grid>
				{note.length === 0 ? null : (
					<IconButton
						className={clsx(classes.expand, {
							[classes.expandOpen]: expanded,
						})}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</IconButton>
				)}
			</CardActions>

			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent classes={{ root: classes.cardContent }}>
					{item.note.split(/\n/).map((line) => {
						if (line[0] === "-")
							return (
								<Grid key={line}>
									<Checkbox
										checked={false}
										onClick={() => handleNoteCheck(line)}
										inputProps={{
											"aria-label": "primary checkbox",
										}}
									/>

									{line.slice(1)}
								</Grid>
							);
						if (line[0] === "x")
							return (
								<Grid key={line}>
									<Checkbox
										checked={true}
										onChange={() => handleNoteCheck(line)}
										inputProps={{
											"aria-label": "primary checkbox",
										}}
									/>

									{line.slice(1)}
								</Grid>
							);
						return <Typography key={line} variant="body2">{line}</Typography>;
					})}
				</CardContent>
			</Collapse>
		</Card>
	);
};

export default ItemCard;
