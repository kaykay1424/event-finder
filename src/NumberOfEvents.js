import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NumberOfEvents extends Component {
    state = {
        numEvents: 20
    }

    handleInputChange = (value) => {
        this.setState({
            numEvents: value
        });

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
            </div>
        );
    }
}

NumberOfEvents.propTypes = {
    maxNumEvents: PropTypes.number,
    updateEvents: PropTypes.func
};

export default NumberOfEvents;
