import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";

import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PersonIcon from '@material-ui/icons/Person';
import EditTagDialog from "./EditTagDialog";

const useStyles = makeStyles((theme) => ({
	card: {
		borderRadius: 0,
		boxShadow: "none",
		paddingTop: 6,
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
}));

const TagCard = ({ tag, handleTagDelete }) => {
	const classes = useStyles();

	const tagIcon = (tag) => {
		if(tag.type === "label"){
			return <LocalOfferIcon />
		}
		else if (tag.type === "area"){
			return <LocationOnIcon />
		} 
		return <PersonIcon />
	}

	//options menu state in tag card
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};
	const handleDeleteClick = () => {
		handleTagDelete(tag);
	};



	return (
		<Card classes={{root: classes.card}}>
			<CardHeader
				classes={{
					root: classes.cardHeader,
					action: classes.cardHeaderAction,
				}}
				avatar={
					tagIcon(tag)
				}
				action={
					<>
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
							onClose={handleMenuClose}
						>
							<EditTagDialog tag={tag} handleMenuClose={handleMenuClose}/>
							<MenuItem onClick={handleDeleteClick}>
								<ListItemIcon>
									<DeleteIcon fontSize="small" />
								</ListItemIcon>
								Delete
							</MenuItem>
						</Menu>
					</>
				}
				title={<Typography>{tag.name}</Typography>}
			/>
		</Card>
	);
};

export default TagCard;
