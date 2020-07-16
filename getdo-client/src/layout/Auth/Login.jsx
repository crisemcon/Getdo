import React, {useContext, useEffect, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import AuthContext from '../../context/auth/authContext';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://material-ui.com/">
				GETDO
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	header: {
		fontWeight: 400,
		minWidth: 0,
		fontSize: 36,
		marginBottom: theme.spacing(3)
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const SignIn = (props) => {
	const classes = useStyles();

	//extract values from context
    const authContext = useContext(AuthContext);
	const {message, authenticated, signIn} = authContext;
	
	//in case that the user is authenticated
    useEffect(() => {
        if(authenticated){
            props.history.push('/app');
        }

        if(message){
            //mostrarAlerta(message.msg, message.categoria);
        }
        //eslint-disable-next-line
	}, [message, authenticated, props.history]);

	//state signin
    const [user, saveUser] = useState({
        email: '',
        password: '',
	})

	//extract from user
	const {email, password} = user;

	//when the user is typing
    const onChange = e => {
        saveUser({
            ...user,
            [e.target.name]: e.target.value
        })
	}

	//when the user submit the register
    const onSubmit = e => {
        e.preventDefault();

        //validar que no haya campos vacios
        if(email.trim() ==='' || password.trim() ==='') {
			//mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
			console.log("Todos los campos son obligatorios");
            return;
        }

        //pasarlo al action (useReducer)
        signIn({
            email,
            password
        })
    }


	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography
					noWrap
					color="textSecondary"
					className={classes.header}
				>
					GETDO
				</Typography>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} onSubmit={onSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={onChange}
						value={email}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={onChange}
						value={password}
					/>
					{/*<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>*/}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>{/*
							<Link href="#" variant="body2">
								Forgot password?
						</Link>*/}
						</Grid>
						
						<Grid item>
							<Link href="/register" variant="body2">
								Don't have an account? Sign Up
							</Link>
							
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}

export default SignIn;