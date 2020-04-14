import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import sidebarContext from "../../context/sidebar/sidebarContext";
import itemsContext from "../../context/items/itemsContext";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
//icons
import InboxIcon from "@material-ui/icons/Inbox";
import DoubleArrowSharpIcon from "@material-ui/icons/DoubleArrowSharp";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import ScheduleIcon from "@material-ui/icons/Schedule";
import CakeIcon from "@material-ui/icons/Cake";
import StarIcon from "@material-ui/icons/Star";
import LabelIcon from "@material-ui/icons/Label";
import ListIcon from "@material-ui/icons/List";
import NoteIcon from "@material-ui/icons/Note";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: 256,
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function SelectedListItem({ setOpened }) {
	//get sidebarState
	const categoriesContext = useContext(sidebarContext);
	const { currentCategory, currentCategoryIndex } = categoriesContext;
	//get itemsState
	const itemlistContext = useContext(itemsContext);
	const { getItems } = itemlistContext;

	const classes = useStyles();

	const [selectedIndex, setSelectedIndex] = useState(currentCategoryIndex);


	const handleListItemClick = (event, index, name) => {
		setSelectedIndex(index);
		currentCategory(name); //set current category
		getItems(name); //filter items with category name
		setOpened(false);//closes the navbar when clicked
	};

	return (
		<div className={classes.root}>
			<List component="nav" aria-label="main mailbox folders">
				<ListItem
					button
					selected={selectedIndex === 0}
					onClick={(event) => handleListItemClick(event, 0, "inbox")}
				>
					<ListItemIcon>
						<InboxIcon />
					</ListItemIcon>
					<ListItemText primary="Inbox" />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem
					button
					selected={selectedIndex === 1}
					onClick={(event) => handleListItemClick(event, 1, "next")}
				>
					<ListItemIcon>
						<DoubleArrowSharpIcon />
					</ListItemIcon>
					<ListItemText primary="Next" />
				</ListItem>
				<ListItem
					button
					selected={selectedIndex === 2}
					onClick={(event) =>
						handleListItemClick(event, 2, "waiting")
					}
				>
					<ListItemIcon>
						<HourglassEmptyIcon />
					</ListItemIcon>
					<ListItemText primary="Waiting" />
				</ListItem>
				<ListItem
					button
					selected={selectedIndex === 3}
					onClick={(event) =>
						handleListItemClick(event, 3, "scheduled")
					}
				>
					<ListItemIcon>
						<ScheduleIcon />
					</ListItemIcon>
					<ListItemText primary="Scheduled" />
				</ListItem>
				<ListItem
					button
					selected={selectedIndex === 4}
					onClick={(event) =>
						handleListItemClick(event, 4, "someday")
					}
				>
					<ListItemIcon>
						<CakeIcon />
					</ListItemIcon>
					<ListItemText primary="Someday" />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem
					button
					selected={selectedIndex === 5}
					onClick={(event) => handleListItemClick(event, 5, "focus")}
				>
					<ListItemIcon>
						<StarIcon />
					</ListItemIcon>
					<ListItemText primary="Focus" />
				</ListItem>
				<ListItem
					button
					selected={selectedIndex === 6}
					onClick={(event) => handleListItemClick(event, 6, "tags")}
				>
					<ListItemIcon>
						<LabelIcon />
					</ListItemIcon>
					<ListItemText primary="Tags" />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem
					button
					selected={selectedIndex === 7}
					onClick={(event) =>
						handleListItemClick(event, 7, "projects")
					}
				>
					<ListItemIcon>
						<ListIcon />
					</ListItemIcon>
					<ListItemText primary="Projects" />
				</ListItem>
				<ListItem
					button
					selected={selectedIndex === 8}
					onClick={(event) =>
						handleListItemClick(event, 8, "notebooks")
					}
				>
					<ListItemIcon>
						<NoteIcon />
					</ListItemIcon>
					<ListItemText primary="Notebooks" />
				</ListItem>
			</List>
			<Divider />
			<List component="nav" aria-label="secondary mailbox folder">
				<ListItem
					button
					selected={selectedIndex === 9}
					onClick={(event) => handleListItemClick(event, 9, "trash")}
				>
					<ListItemIcon>
						<DeleteIcon />
					</ListItemIcon>
					<ListItemText primary="Trash" />
				</ListItem>
			</List>
		</div>
	);
}
