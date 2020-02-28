import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

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

// // HERE FOR NOW AS EXAMPLE
// const callAPI = async () => {
// 	const response = await fetch('/api/user/loginUser', {
// 		method: 'POST'
// 	});
// 	const body = await response.json();

// 	if (response.status !== 200) {
// 		throw Error(body.message);
// 	}
// 	return body;

// }

const createRequest = async (data) => {
	console.log(JSON.stringify(data));
	const response = await fetch('/api/user/createUser', {
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

export default function CreateAccount() {
	const classes = useStyles();

	const [firstName, setFirstName] = useState({
		text: '',
		error: false,
		helper: false
	});
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState({
		text: '',
		error: false,
		helper: false
	});
	const [passwordConfirm, setPasswordConfirm] = useState({
		text: '',
		error: false,
		helper: false
	});
	const [email, setEmail] = useState({
		text: '',
		error: false,
		helper: false,
	});

	const onFirstNameChange = (event) => {
		setFirstName({
			text: event.target.value,
			error: false,
			helper: false
		});
	}

	const onLastNameChange = (event) => {
		setLastName(event.target.value);
	}

	const onEmailChange = (event) => {
				// Validate email: REGEX /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		var emailHelper = false;
		var emailError = false;
			
		var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!regex.test(event.target.value)) {
			emailHelper = "Please enter a valid email address";
			emailError = true;
			console.log(emailError);
		}

		setEmail({
			text: event.target.value,
			helper: emailHelper,
			error: emailError
		});
	}

	const onPasswordChange = (event) => {
		
		var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})");
		var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
		var helper = false;
		var error = false;

		if (strongRegex.test(event.target.value)) {
			helper = "Password Strength: Strong";
		} else if (mediumRegex.test(event.target.value)) {
			helper = "Password Strength: Acceptable";
		} else {
			helper = "Password Strength: Weak"
			error = true;
		}
		
		setPassword({
			text: event.target.value,
			helper: helper,
			error: error,
		});
		setPasswordConfirm({
			text: '',
			helper: false,
			error: false
		});
	}

	const onPasswordConfirmChange = (event) => {
		setPasswordConfirm({
			text: event.target.value,
			helper: false,
			error: false
		});
	}

	function validate(event) {
		console.log("Hello");
				
		event.preventDefault();

		var validation = true;
		// Validate password
		if (password.text !== passwordConfirm.text) {
			setPasswordConfirm({
				text: passwordConfirm.text,
				error: true,
				helper: "Please make sure your passwords are the same"
			});
			validation = false;
		}

		if (password.text === "") {
			setPassword({
				text: password.text,
				error: true,
				helper: "Please enter a password"
			})
		}

		if (!/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(password.text)) {
			validation = false;
		}

		if (firstName.text === "") {
			setFirstName({
				text: firstName.text,
				error: true,
				helper: "You must enter a First Name"
			});
			validation = false;
		}

		if (email.text === "") {
			setEmail({
				text: email.text,
				error: true,
				helper: "You must enter your email"
			});
			validation = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.text)) {
			setEmail({
				text: email.text,
				error: true,
				helper: "Please enter a valid email address"
			});
			validation = false;
		}

		if (!validation) return;

		createRequest({
			firstName: firstName.text,
			lastName: lastName,
			password: password.text,
			email: email.text
		})
			.then((res) => {
				console.log(res);
			});


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
								autoComplete="firstName"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								value={firstName.text}
								error={firstName.error}
								helperText={firstName.helper}
								onChange={onFirstNameChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="lastName"
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
								value={email.text}
								helperText={email.helper}
								error={email.error}
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
								value={password.text}
								onChange={onPasswordChange}
								error={password.error}
								helperText={password.helper}
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
								value={passwordConfirm.text}
								onChange={onPasswordConfirmChange}
								error={passwordConfirm.error}
								helperText={passwordConfirm.helper}
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
						Create Account
					</Button>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>

		</Container>
	)

}