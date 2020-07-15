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

import AuthContext from "../../context/auth/authContext";

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
		marginBottom: theme.spacing(3),
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
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const SignUp = (props) => {
	const classes = useStyles();

	//extract values from context
    const authContext = useContext(AuthContext);
	const {message, authenticated, registrarUsuario} = authContext;
	
	//en caso de que el user se haya authenticated o registrado o sea un registro duplicado
	//in case that the user is authenticated
    useEffect(() => {
        if(authenticated){
            props.history.push('/proyectos');
        }

        if(message){
            //mostrarAlerta(message.msg, message.categoria);
        }
        //eslint-disable-next-line
	}, [message, authenticated, props.history]);
	
	//state signup
    const [user, saveUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''
	})
	
	//extract from user
	const {name, email, password, confirm} = user;
	
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
        if(name.trim() ==='' || email.trim() ==='' || password.trim() ==='' || confirm.trim() ==='') {
            //mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        //password minimo de 6 caracteres
        if(password.length < 6){
            //mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error')
            return;
        }

        //pasword coincidan
        if(password !== confirm){
            //mostrarAlerta('Los passwords no son iguales', 'alerta-error')
            return;
        }

        //pasarlo al action (useReducer)
        registrarUsuario({
            name,
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
					Sign up
				</Typography>
				<form className={classes.form} on onSubmit={onSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								autoComplete="fname"
								name="name"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="Name"
								autoFocus
								onChange={onChange}
								value={name}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={onChange}
								value={email}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
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
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="confirm"
								label="Repeat Password"
								type="password"
								id="confirm"
								autoComplete="current-password"
								onChange={onChange}
								value={confirm}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
}

export default SignUp;