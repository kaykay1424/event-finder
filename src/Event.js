import React, { Component } from "react";

class Event extends Component {
	state = {
		showState: false
	}
	
	render() {
		const {showDetails} = this.state;
		return <div className="Event">
			<div 
				className={`details ${
						showDetails ? 'show': 'hide'
					}`
				}
			></div>
			<button 
				className="toggle-details"
				onClick={() => this.setState({showDetails: !showDetails})}
			>Details</button>
		</div>;
	}
}
export default Event;