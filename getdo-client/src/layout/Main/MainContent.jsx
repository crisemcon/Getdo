/* eslint-disable */
import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import MainCard from "../../components/MainCard";

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
	item: {
		marginTop: 6,
		marginBottom: 6,
	},
}));

const MainContent = () => {
	const classes = useStyles();
	return (
		<Grid
			className={classes.root}
			container
			justify="flex-start"
			alignItems="flex-start"
		>
			<Grid item xs={12} className={classes.item}>
				<MainCard />
			</Grid>
			<Grid item xs={12} className={classes.item}>
				<MainCard />
			</Grid>
			<Grid item xs={12} className={classes.item}>
				<MainCard />
			</Grid>
			<Grid item xs={12} className={classes.item}>
				<MainCard />
			</Grid>
			<Grid item xs={12} className={classes.item}>
				<MainCard />
			</Grid>
			<Grid item xs={12} className={classes.item}>
				<MainCard />
			</Grid>
			<Grid item xs={12} className={classes.item}>
				<MainCard />
			</Grid>
			<Grid item xs={12} className={classes.item}>
				<MainCard />
			</Grid>
			<Grid item xs={12} className={classes.item}>
				<MainCard />
			</Grid>
			<Grid item xs={12} className={classes.item}>
				<MainCard />
			</Grid>
		</Grid>
	);
};

export default MainContent;
