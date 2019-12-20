import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

// HERE FOR NOW AS EXAMPLE
const callAPI = async () => {
	const response = await fetch('/api/user/loginUser');
	const body = await response.json();

	if (response.status !== 200) {
		throw Error(body.message);
	}
	return body;

}

export default function CreateUser() {
	const classes = useStyles();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [email, setEmail] = useState('');

	const onFirstNameChange = (event) => {
		setFirstName(event.target.value);
	}

	const onLastNameChange = (event) => {
		setLastName(event.target.value);
	}

	const onEmailChange = (event) => {
		setEmail(event.target.value);
	}

	const onPasswordChange = (event) => {
		setPassword(event.target.value);
	}

	const onPasswordConfirmChange = (event) => {
		setPasswordConfirm(event.target.value);
	}

	useEffect(() => {
		console.log("Changed");
		callAPI().then(function(response) { console.log(response); });
	}, []);

	function validate() {
		return "HELLP";
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					Vira
				</Avatar>
				<Typography component="hi" variant="h5">
					Create Account
				</Typography>
				<form className={classes.form} onSubmit={validate} noValidate >
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								value={firstName}
								onChange={onFirstNameChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="lname"
								value={lastName}
								onChange={onLastNameChange}
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
								value={email}
								onChange={onEmailChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								type="password"
								required
								fullWidth
								name="password"
								label="Password"
								id="password"
								autoComplete="current-password"
								value={password}
								onChange={onPasswordChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								type="password"
								required
								fullWidth
								name="passwordConfirm"
								label="Confirm Password"
								id="password"
								autoComplete="current-password"
								value={passwordConfirm}
								onChange={onPasswordConfirmChange}
							/>
						</Grid>
					</Grid>
				</form>
			</div>

		</Container>
	)

}