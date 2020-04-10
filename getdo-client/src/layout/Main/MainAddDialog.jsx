import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
	form: {
		display: "flex",
		flexDirection: "column",
		margin: "auto",
		width: "fit-content",
	},
	formControl: {
		marginTop: theme.spacing(2),
		minWidth: 120,
	},
	formControlLabel: {
		marginTop: theme.spacing(1),
	},
	fab: {
		position: "fixed",
		bottom: 20,
		right: 20,
		zIndex: 10,
		[theme.breakpoints.up("sm")]: {
			bottom: 40,
			right: 40,
			height: 70,
			width: 70,
		},
		[theme.breakpoints.up("md")]: {
			bottom: 60,
			right: 60,
			height: 80,
			width: 80,
		},
	},
	fabIcon: {
		fontSize: "default",
		[theme.breakpoints.up("md")]: {
			fontSize: 32,
		},
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
}));

export default function MaxWidthDialog() {
	const classes = useStyles();

	const [open, setOpen] = React.useState(false);

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const [fullWidth, setFullWidth] = React.useState(true);
	const [maxWidth, setMaxWidth] = React.useState("sm");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleMaxWidthChange = (event) => {
		setMaxWidth(event.target.value);
	};

	const handleFullWidthChange = (event) => {
		setFullWidth(event.target.checked);
	};

	return (
		<>
			<Fab
				classes={{ root: classes.fab }}
				color="default"
				aria-label="add"
				onClick={handleClickOpen}
			>
				<AddIcon classes={{ root: classes.fabIcon }} />
			</Fab>
			<Dialog
				fullScreen={fullScreen}
				fullWidth={fullWidth}
				maxWidth={maxWidth}
				open={open}
				onClose={handleClose}
				aria-labelledby="max-width-dialog-title"
			>
				<DialogTitle id="max-width-dialog-title">
					<>
						<Typography variant="h6">Testing</Typography>
						<IconButton
							aria-label="close"
							className={classes.closeButton}
							onClick={handleClose}
						>
							<CloseIcon />
						</IconButton>
					</>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						You can set my maximum width and whether to adapt or
						not.
					</DialogContentText>
					<form className={classes.form} noValidate>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="max-width">
								maxWidth
							</InputLabel>
							<Select
								autoFocus
								value={maxWidth}
								onChange={handleMaxWidthChange}
								inputProps={{
									name: "max-width",
									id: "max-width",
								}}
							>
								<MenuItem value={false}>false</MenuItem>
								<MenuItem value="xs">xs</MenuItem>
								<MenuItem value="sm">sm</MenuItem>
								<MenuItem value="md">md</MenuItem>
								<MenuItem value="lg">lg</MenuItem>
								<MenuItem value="xl">xl</MenuItem>
							</Select>
						</FormControl>
						<FormControlLabel
							className={classes.formControlLabel}
							control={
								<Switch
									checked={fullWidth}
									onChange={handleFullWidthChange}
								/>
							}
							label="Full width"
						/>
					</form>
				</DialogContent>
				<DialogActions></DialogActions>
			</Dialog>
		</>
	);
}
