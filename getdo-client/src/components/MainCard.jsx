import React from "react";
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
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
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
	}
}));

const MainCard = () => {
	const classes = useStyles();

	//collapse and expand state
	const [expanded, setExpanded] = React.useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	//check button state
	const [checked, setChecked] = React.useState(false);
	const handleChange = (event) => {
		setChecked(event.target.checked);
	};

	//options menu state
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Card>
			<CardHeader
				classes={{ root: classes.cardHeader , action: classes.cardHeaderAction}}//this is the way to customize children
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
									icon={<FavoriteBorder />}
									checkedIcon={<Favorite />}
									name="checkedH"
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
							<MenuItem onClick={handleClose}>
								<ListItemIcon>
									<DeleteIcon fontSize="small" />
								</ListItemIcon>
								Delete
							</MenuItem>
						</Menu>
					</>
				}
				title="Example task"
				/*subheader=here goes an button directing to a project*/
			/>
			<CardActions disableSpacing classes={{ root: classes.cardActions }}>
				<Grid className={classes.tagContainer} container>
					<Chip
						classes={{ root: classes.tag }}
						variant="outlined"
						size="small"
						label="Computador"
					/>
					<Chip
						classes={{ root: classes.tag }}
						variant="outlined"
						size="small"
						label="Universidad"
					/>
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
					<Typography variant="body2">
						Heat oil in a (14- to 16-inch) paella pan or a large,
						deep skillet over medium-high heat. Add chicken, shrimp
						and chorizo, and cook, stirring occasionally until
						lightly browned, 6 to 8 minutes. Transfer shrimp to a
						large plate and set aside, leaving chicken and chorizo
						in the pan. Add pimentón, bay leaves, garlic, tomatoes,
						onion, salt and pepper, and cook, stirring often until
						thickened and fragrant, about 10 minutes. Add saffron
						broth and remaining 4 1/2 cups chicken broth; bring to a
						boil.
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};

export default MainCard;
