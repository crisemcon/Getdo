import React, { Fragment } from "react";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import Search from "@material-ui/icons/Search";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	header: {
		fontWeight: 400,
		minWidth: 0,
		fontSize: 24,
	},
	grow: {
		flexGrow: 1,
	},
	search: {
		position: "relative",
		marginRight: 8,
		borderRadius: theme.shape.borderRadius,
		background: theme.palette.grey[200],
		"&:hover": {
			background: theme.palette.grey[300],
		},
		marginLeft: 0,
		width: "40%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
	},
	searchIcon: {
		width: theme.spacing(6),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
		width: "100%",
	},
	inputInput: {
		borderRadius: 4,
		paddingTop: theme.spacing(1),
		paddingRight: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		paddingLeft: theme.spacing(6),
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: 120,
			paddingLeft: theme.spacing(8),
			"&:focus": {
				width: 200,
			},
		},
	},
}));

const MainHeader = () => {
	const classes = useStyles();

	return (
		<Fragment>
			<Typography noWrap color="textSecondary" className={classes.header}>
				GETDO
			</Typography>
			<div className={classes.grow}></div>
			<div className={classes.search}>
				<div className={classes.searchIcon}>
					<Search />
				</div>
				<InputBase
					placeholder="Search..."
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
				/>
			</div>
		</Fragment>
	);
};

export default MainHeader;
