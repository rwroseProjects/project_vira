import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright @ '}
			<Link color="inherit" href="Vira.ninja">
				Vira: A Better Network
			</Link>
		</Typography>
	)
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const createRequest = async (data) => {
	console.log(JSON.stringify(data));
	const response = await fetch('/api/user/loginUser', {
		method: 'POST',
		cache: 'no-cache',
		headers: { "Content-Type": "application/json" },
		redirect: 'follow',
		body: JSON.stringify(data)
	});
	const body = await response.json();

	if (response.status !== 200) {
		throw Error(body.message);
	}
	return body;
}

export default function Login() {
	const classes = useStyles();

	const [authID, setAuthID] = useState('');
	const [authPassword, setAuthPassword] = useState('');
	const [errorID, setErrorID] = useState(false);
	const [errorPassword, setErrorPassword] = useState(false);
	const [authIDText, setAuthIDText] = useState(false);
	const [authPasswordText, setAuthPasswordText] = useState(false);

	const validate = (event) => {
		event.preventDefault();
		
		// Check if the password is validated and if not set isValidated to false
		var isValidated = true;
		if (authID === "") { 
			isValidated = false; 
			setErrorID(true);
			setAuthIDText("Please enter your username or email")
		}
		if (authPassword === "") {
			isValidated = false;
			setErrorPassword(true);
			setAuthPasswordText("Please enter a password");
		}
		
		// Check validated
		if (!isValidated) {
			console.log("NO VALIDATION BAD BOY");
			return;
		}

		createRequest({ email: authID, password: authPassword })
			.then((res) => {
				if (res.success) {
					alert("LOGIN SUCCESSFUL!");
				} else {
					alert("LOGIN FAILED");
				}
			});

	}

	const handleIDChange = (event) => {
		setAuthID(event.target.value);
		setErrorID(false);
		setAuthIDText(false);
	}

	const handlePasswordChange = (event) => {
		setAuthPassword(event.target.value);
		setErrorPassword(false);
		setAuthPasswordText(false);
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					Vira
				</Avatar>
				<Typography component="hi" variant="h5">
					Sign in	
				</Typography>
				<form className={classes.form} onSubmit={validate} noValidate >
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="auth_id"
						label="Username"
						name="auth_id"
						autoComplete="off"
						autoFocus
						value={authID}
						onChange={handleIDChange}
						error={errorID}
						helperText={authIDText}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						type="password"
						required
						fullWidth
						id="auth_password"
						label="Password"
						name="auth_password"
						autoComplete="current-password"
						autoFocus
						value={authPassword}
						onChange={handlePasswordChange}
						error={errorPassword}
						helperText={authPasswordText}
					/>
					<FormControlLabel 
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
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
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="/CreateAccount" variant="body2">
								{"Don't have an account? Sign up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	)
}