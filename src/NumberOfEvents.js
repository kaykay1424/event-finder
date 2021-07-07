import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ErrorAlert} from './Alert';

class NumberOfEvents extends Component {
    state = {
        infoText: '',
        numEvents: 20
    }

    handleInputChange = (value) => {
        if (value < 0 || value > 50) {
            this.setState({
                infoText: 'Please enter a number between 0 and 50.',
                numEvents: value
            });
        } else {
            this.setState({
                infoText: '',
                numEvents: value
            });
        }
        
        

        this.props.updateEvents(null, value);
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
                    max={this.props.maxNumEvents}
                    onChange={(e) => this.handleInputChange(e.target.value)}
                />
                <ErrorAlert text={this.state.infoText} />
            </div>
        );
    }
}

NumberOfEvents.propTypes = {
    maxNumEvents: PropTypes.number,
    updateEvents: PropTypes.func
};

export default NumberOfEvents;
