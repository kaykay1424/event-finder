import React, { Component } from 'react';

class CitySearch extends Component {
	state = {
		query: '',
		suggestions: []
	}

	handleInputChange = (value) => {
		const suggestions = this.props.locations.filter((location) => {
			return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
		});
		
		this.setState({
			query: value,
			suggestions
		});
	}

	handleItemClick = (suggestion) => {
		this.setState({
		  	query: suggestion
		});
	}

	render() {
		const {query, suggestions} = this.state;
		return (
			<div className="City-Search">
				<input 
					className="city"
					type="text" 
					value={query}
					onChange={(e) => this.handleInputChange(e.target.value)}
				/>
				<ul className="suggestions">
					{suggestions.map(suggestion => (
						<li 
							key={suggestion}
							onClick={() => this.handleItemClick(suggestion)}
						>
							{suggestion}
						</li>
					))}
					<li key='all'>
						<b>See all cities</b>
					</li>
				</ul>
			</div>
		);
	}
}

export default CitySearch;
