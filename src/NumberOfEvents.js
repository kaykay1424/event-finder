import React, { Component } from 'react';

class NumberOfEvents extends Component {
	state = {
		numEvents: 32
	}

	handleInputChange = (value) => {
		this.setState({
			numEvents: value
		});
	}

	render() {
		return (
			<div className="Number-Of-Events">
				<label htmlFor="number">Select number of events</label>
				<input 
					id="number"
					className="number"
					type="number"
					value={this.state.numEvents}
					onChange={(e) => this.handleInputChange(e.target.value)}
				/>
			</div>
		);
	}
}

export default NumberOfEvents;
