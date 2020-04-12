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
/*import Battery50Icon from "@material-ui/icons/Battery50";
import Battery80Icon from "@material-ui/icons/Battery80";*/
import TimerIcon from "@material-ui/icons/Timer";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PersonIcon from '@material-ui/icons/Person';

import itemsContext from "../context/items/itemsContext";
import sidebarContext from "../context/sidebar/sidebarContext";
import tagsContext from "../context/tags/tagsContext";

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
	marginAuto: {
		margin: "auto",
	},
	cardHeaderAction: {
		paddingTop: 4,
	},
}));

const MainCard = ({ item, handleDelete }) => {
	const classes = useStyles();
	const { name, note } = item;

	//get itemsState
	const itemlistContext = useContext(itemsContext);
	const { getItems, focusItem } = itemlistContext;

	//get sidebarState
	const categoriesContext = useContext(sidebarContext);
	const { category } = categoriesContext;

	//get tagsState
	const tagContext = useContext(tagsContext);
	const { getTags } = tagContext;
	const tagsArray = getTags(item.tags);

	const tagIcon = (tag) => {
		if(tag.type === "label"){
			return <LocalOfferIcon />
		}
		else if (tag.type === "area"){
			return <LocationOnIcon />
		} 
		return <PersonIcon />
	}

	

	//collapse and expand state
	const [expanded, setExpanded] = useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	//check button state
	const [checked, setChecked] = useState(false);
	const handleChange = (event) => {
		setChecked(event.target.checked);
	};

	//options menu state
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDeleteClick = () => {
		handleDelete(item);
	};

	const handleItemFocus = () => {
		focusItem(item);
		if (category === "focus") {
			getItems(category);
		}
	};

	return (
		<Card>
			<CardHeader
				classes={{
					root: classes.cardHeader,
					action: classes.cardHeaderAction,
				}} //this is the way to customize children
				avatar={
					<Checkbox
						checked={checked}
						onChange={handleChange}
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
							<MenuItem onClick={handleClose}>
								<ListItemIcon>
									<EditIcon fontSize="small" />
								</ListItemIcon>
								Edit
							</MenuItem>
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
					{tagsArray.length === 0
						? null
						: tagsArray.map((tag) => (
								<Chip
									icon={tagIcon(tag)}
									key={tag.id}
									classes={{ root: classes.tag }}
									variant="outlined"
									size="small"
									label={tag.name}
								/>
						))}
					<Grid className={classes.marginAuto} item></Grid>
					<Chip
						classes={{ root: classes.tag }}
						disabled
						variant="outlined"
						size="small"
						icon={<TimerIcon />}
						label="15min"
					/>
					<Chip
						classes={{ root: classes.tag }}
						disabled
						variant="outlined"
						size="small"
						icon={<Battery20Icon />}
						label="Easy"
					/>
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
					<Typography variant="body2">{note}</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};

export default MainCard;
