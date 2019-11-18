
import React, { Component } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField'
import {Grid} from '@material-ui/core'
import {Paper} from '@material-ui/core'

class App extends Component {

	handleSubmit() {
		console.log("Hello");
	}

	render() {
		return (
			<div id="App_Encapsulation" style={{ padding: 20}}>
				<Grid container 
					direction="column" 
					justify="center" 
					spacing={1}
					alignItems="center"
					>
					<Grid item>
						<h1>Login to VIRA</h1>
					</Grid>
					<Grid item>
						<TextField label="Username"></TextField>
					</Grid>
					<br/>
					<Grid item>
						<TextField label="Password"></TextField>
					</Grid>
				</Grid>
			</div>
		)
	}

}

export default App;