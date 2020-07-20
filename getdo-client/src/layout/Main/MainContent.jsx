/* eslint-disable */
import React, { useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import itemsContext from "../../context/items/itemsContext";
import sidebarContext from "../../context/sidebar/sidebarContext";
import tagsContext from "../../context/tags/tagsContext";

import ItemCard from "../../components/ItemCard";
import ProjectCard from "../../components/ProjectCard";
import { Typography, Divider } from "@material-ui/core";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TagCard from "../../components/TagCard";

import NewTagDialog from "../../components/NewTagDialog";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 6,
		transition: theme.transitions.create(),
		[theme.breakpoints.up("sm")]: {
			padding: 12,
		},
	},
	maxWidth: {
		width: "100%",
	},
	done: {
		width: "100%",
		marginTop: 16,
	},
	item: {
		marginBottom: 6,
	},
}));

const MainContent = () => {
	const classes = useStyles();

	//showing inbox items at start
	useEffect(async () => {
		await fetchItems();
		getItems("inbox");
		//eslint-disable-next-line
	}, []);

	//get itemsState
	const itemlistContext = useContext(itemsContext);
	const {
		categoryitems,
		getItems,
		deleteItem,
		updateItemsDeletedTag,
		saveCurrentItem,
		fetchItems,
		editItem,
	} = itemlistContext;

	//get sidebarState
	const categoryContext = useContext(sidebarContext);
	const { category } = categoryContext;

	//get tagsState
	const tagContext = useContext(tagsContext);
	const { tags, deleteTag } = tagContext;
	const areaTags = tags.filter((tag) => tag.type === "area");
	const labelTags = tags.filter((tag) => tag.type === "label");
	const contactTags = tags.filter((tag) => tag.type === "contact");

	//delete item
	const handleItemDelete = (item) => {
		if (item.trash) {
			deleteItem(item);
			getItems("trash");
		} else {
			item.trash = true;
			getItems(category);
		}
	};

	//delete tag
	const handleTagDelete = (tag) => {
		deleteTag(tag.id);
		updateItemsDeletedTag(tag.id);
		getItems("tags");
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
											<TagCard
												tag={tag}
												handleTagDelete={
													handleTagDelete
												}
											/>
										</Grid>
									))}
									<NewTagDialog type="area" />
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
											<TagCard
												tag={tag}
												handleTagDelete={
													handleTagDelete
												}
											/>
										</Grid>
									))}
									<NewTagDialog type="label" />
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
											<TagCard
												tag={tag}
												handleTagDelete={
													handleTagDelete
												}
											/>
										</Grid>
									))}
									<NewTagDialog type="contact" />
								</Grid>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</div>
				) : (
					<Typography>No hay tareas</Typography>
				)
			) : category !== "projects" ? (
				<>
					{categoryitems.map((item) =>
						item.done ? null : (
							<Grid
								key={item.id}
								item
								xs={12}
								className={classes.item}
							>
								<ItemCard
									item={item}
									handleItemDelete={handleItemDelete}
									saveCurrentItem={saveCurrentItem}
								/>
							</Grid>
						)
					)}
					<Divider />
					{category !== "notebooks" ?
					<div className={classes.done}>
						<ExpansionPanel>
							<ExpansionPanelSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography>Done</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Grid container>
									{categoryitems.map((item) =>
										item.done ? (
											<Grid
												key={item.id}
												item
												xs={12}
												className={classes.item}
											>
												<ItemCard
													item={item}
													handleItemDelete={
														handleItemDelete
													}
													saveCurrentItem={saveCurrentItem}
												/>
											</Grid>
										) : null
									)}
								</Grid>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</div>
					: null}
				</>
			) : (
				<>
					{categoryitems.map((item) =>
						item.done ? null : (
							<Grid
								key={item.id}
								item
								xs={12}
								className={classes.item}
							>
								<ProjectCard
									item={item}
									handleItemDelete={handleItemDelete}
									saveCurrentItem={saveCurrentItem}
								/>
							</Grid>
						)
					)}
					<Divider />

					<div className={classes.done}>
						<ExpansionPanel>
							<ExpansionPanelSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography>Done</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Grid container>
									{categoryitems.map((item) =>
										item.done ? (
											<Grid
												key={item.id}
												item
												xs={12}
												className={classes.item}
											>
												<ProjectCard
													item={item}
													handleItemDelete={
														handleItemDelete
													}
													saveCurrentItem={saveCurrentItem}
												/>
											</Grid>
										) : null
									)}
								</Grid>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</div>
				</>
			)}
		</Grid>
	);
};

export default MainContent;
