import React, { useState, useContext, Fragment } from "react";
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
import RestoreIcon from '@material-ui/icons/Restore';

import itemsContext from "../context/items/itemsContext";
import ItemCard from "../components/ItemCard";
import Divider from "@material-ui/core/Divider";

import NewProjectItemButton from "../components/NewProjectItemButton";
import NewItemDialog from "../components/NewItemDialog";

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
	},
	marginBottom: {
		marginBottom: 10,
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
		padding: 4,
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
		paddingTop: 4,
		paddingBottom: 4,
		paddingRight: 8,
		paddingLeft: 8,
		[theme.breakpoints.up("sm")]: {
			paddingRight: 6,
			paddingLeft: 6,
		},
	},
	tag: {
		marginTop: 4,
		marginBottom: 4,
		marginRight: 8,
		padding: 2,
	},
	cardContent: {
		paddingLeft: 12,
		paddingRight: 12,
		paddingTop: 4,
	},
	flexGrow: {
		flexGrow: 1,
	},
	cardHeaderAction: {
		paddingTop: 4,
	},
	note: {
		paddingLeft: 4,
		paddingRight: 4,
		paddingTop: 2,
		paddingBottom: 12,
	},
}));

const ProjectCard = ({ item, handleItemDelete, saveCurrentItem }) => {
	const classes = useStyles();
	const { name, note, tags, dueDate } = item;

	//calculate dueDate
	const calcDueDate = (dueDate) => {
		const now = new Date();
		const date = new Date(dueDate);
		const elapsed = date.getTime() - now.getTime();
		return timeConversion(elapsed);
	};

	function timeConversion(millisec) {
		const hours = (millisec / (1000 * 60 * 60)).toFixed(1);
		const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(0);
		const weeks = (days / 7).toFixed(0);

		if (hours < -24) {
			return `${days} days late`;
		} else if (hours < 0 && hours >= -24) {
			return `Yesterday`;
		} else if (hours >= 0 && hours < 24) {
			return `Today`;
		} else if (hours >= 24 && hours < 48) {
			return `Tomorrow`;
		} else if (days >= 2 && days < 14) {
			return days + " Days";
		} else {
			return `${weeks} weeks`;
		}
	}

	//calculate project time required
	const calcProjectTimeRequired = () => {
		let sumTime = 0;
		let flag = "";
		getItemsById(item.items).forEach((item) => {
			item.time ? (sumTime += item.time) : (flag = ">");
		});
		if (sumTime === 0) {
			return `Not set`;
		} else if (sumTime === 60) {
			return `${flag}1 hour`;
		} else if (sumTime > 60) {
			return `${flag}${(sumTime / 60).toFixed(0)} hours`;
		}
		return `${flag}${sumTime} minutes`;
	};

	//get itemsState
	const itemlistContext = useContext(itemsContext);
	const {
		focusItem,
		doneItem,
		getItemsById,
		getItems,
		deleteItem,
		editItem,
	} = itemlistContext;

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

	//delete item
	const handleChildItemDelete = (item) => {
		if (item.category === "trash") {
			deleteItem(item._id);
		} else {
			item.category = "trash";
		}
		getItems("projects");
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
	};

	const handleItemDone = () => {
		doneItem(item);
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
		<Card classes={{ root: classes.marginBottom }}>
			<CardHeader
				classes={{
					root: classes.cardHeader,
					action: classes.cardHeaderAction,
				}} //this is the way to customize children
				avatar={
					<Checkbox
						checked={item.done}
						onChange={handleItemDone}
						inputProps={{ "aria-label": "primary checkbox" }}
					/>
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
				/*subheader=here goes an button directing to a project*/
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
						<Chip
							classes={{ root: classes.tag }}
							disabled
							variant="outlined"
							size="small"
							icon={<TimerIcon />}
							label="15min"
						/>
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
						{item.items.length !== 0 ? (
							<Chip
								classes={{ root: classes.tag }}
								disabled
								variant="outlined"
								size="small"
								icon={<TimerIcon />}
								label={calcProjectTimeRequired()}
							/>
						) : null}
					</Grid>
				</Grid>
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
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent classes={{ root: classes.cardContent }}>
					<div className={classes.note}>
						{item.note.split(/\n/).map((line, index) => {
							if (line[0] === "-")
								return (
									<Grid key={index}>
										<Checkbox
											checked={false}
											onClick={() =>
												handleNoteCheck(line)
											}
											inputProps={{
												"aria-label":
													"primary checkbox",
											}}
										/>

										{line.slice(1)}
									</Grid>
								);
							if (line[0] === "x")
								return (
									<Grid key={index}>
										<Checkbox
											checked={true}
											onChange={() =>
												handleNoteCheck(line)
											}
											inputProps={{
												"aria-label":
													"primary checkbox",
											}}
										/>

										{line.slice(1)}
									</Grid>
								);
							return (
								<Typography key={index} variant="body2">{line}</Typography>
							);
						})}
					</div>
					<Divider light />
					{item.items.length !== 0 //!== undefined ,if this get errors
						? getItemsById(item.items).map((item) => (
								<Fragment key={item._id}>
									<ItemCard
										item={item}
										handleItemDelete={handleChildItemDelete}
										saveCurrentItem={saveCurrentItem}
									/>
									<Divider light />
								</Fragment>
						  ))
						: null}

					<NewProjectItemButton projectId={item._id} />
				</CardContent>
			</Collapse>
		</Card>
	);
};

export default ProjectCard;
