import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {InfoAlert} from './Alert';

class CitySearch extends Component {
    state = {
        infoText: '',
        query: '',
        showSuggestions: undefined,
        suggestions: []
    }

    handleInputChange = (value) => {
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });

        if (suggestions.length === 0) {
            this.setState({
                infoText: 'No matching cities were found. Please try again.',
                query: value,
                suggestions
            });
        } else {
            this.setState({
                infoText: '',
                query: value,
                suggestions
            });
        }
    }

    handleItemClick = (selectedCity) => {
        this.setState({
            infoText: '',
            query: selectedCity,
            showSuggestions: false
        });

        this.props.updateEvents(selectedCity);
    }

    render() {
        const {
            query, 
            showSuggestions, 
            suggestions
        } = this.state;
        return (
            <div className="City-Search">
                <label htmlFor="city">Choose your city</label>
                <input 
                    id="city"
                    className="city"
                    type="text" 
                    value={query}
                    onChange={(e) => this.handleInputChange(e.target.value)}
                    onFocus={() => this.setState({showSuggestions: true})}
                /> 
                <ul 
                    className={`suggestions ${
                        showSuggestions ? 'show': 'hide'}`}
                >
                    {suggestions.map(suggestion => (
                        <li 
                            key={suggestion}
                            onClick={() => this.handleItemClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                    <li 
                        key='all'
                        onClick={() => this.handleItemClick('all')}
                    >
                        <b>See all cities</b>
                    </li>
                </ul>                
                <InfoAlert 
                    text={this.state.infoText} 
                />
            </div>
        );
    }
}

CitySearch.propTypes = {
    locations: PropTypes.array.isRequired,
    updateEvents: PropTypes.func
};

export default CitySearch;
