
import React, { Component } from 'react';
import './App.css';
import Login from '../login/Login'
//import {Paper} from '@material-ui/core'

class App extends Component {

	handleSubmit() {
		console.log("Hello");
	}

	render() {
		return (
			<Login />
		)
	}

}

export default App;