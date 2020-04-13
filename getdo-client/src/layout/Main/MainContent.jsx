/* eslint-disable */
import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import itemsContext from "../../context/items/itemsContext";
import sidebarContext from "../../context/sidebar/sidebarContext";
import tagsContext from "../../context/tags/tagsContext";

import MainCard from "../../components/MainCard";
import { Typography } from "@material-ui/core";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MainTag from "../../components/MainTag";

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
	maxWidth: {
		width: "100%",
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

	//get sidebarState
	const categoryContext = useContext(sidebarContext);
	const { category } = categoryContext;

	//get tagsState
	const tagContext = useContext(tagsContext);
	const { tags } = tagContext;
	const areaTags = tags.filter((tag) => tag.type === "area");
	const labelTags = tags.filter((tag) => tag.type === "label");
	const contactTags = tags.filter((tag) => tag.type === "contact");

	const handleDelete = (item) => {
		const currentcategory = item.category;
		if (item.category === "trash") {
			deleteItem(item.id);
		} else {
			item.category = "trash";
		}
		getItems(currentcategory);
	};

	return (
		<Grid
			className={classes.root}
			container
			justify="flex-start"
			alignItems="flex-start"
		>
			{categoryitems.length === 0 ? (
				category === "tags" ? (
					<div className={classes.maxWidth}>
						<ExpansionPanel>
							<ExpansionPanelSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography>Areas</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Grid container>
									{areaTags.map((tag) => (
										<Grid
											key={tag.id}
											item
											xs={12}
											className={classes.item}
										>
											<MainTag tag={tag} />
										</Grid>
									))}
								</Grid>
							</ExpansionPanelDetails>
						</ExpansionPanel>
						<ExpansionPanel>
							<ExpansionPanelSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography>Labels</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Grid container>
									
									{labelTags.map((tag) => (
										<Grid
											key={tag.id}
											item
											xs={12}
											className={classes.item}
										>
											<MainTag tag={tag} />
										</Grid>
									))}
								</Grid>
							</ExpansionPanelDetails>
						</ExpansionPanel>
						<ExpansionPanel>
							<ExpansionPanelSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography>Contacts</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Grid container>
									{contactTags.map((tag) => (
										<Grid
											key={tag.id}
											item
											xs={12}
											className={classes.item}
										>
											<MainTag tag={tag} />
										</Grid>
									))}
								</Grid>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</div>
				) : (
					<Typography>No hay tareas</Typography>
				)
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
