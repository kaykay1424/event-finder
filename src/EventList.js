import React, {Component} from 'react';
import Event from './Event';
import PropTypes from 'prop-types';

import {InfoAlert} from './Alert';

class EventList extends Component {
    state = {
        infoText: ''
    }

    componentDidMount() {
        this.setState({
            infoText: navigator.onLine 
                ? '' : `The list loaded may not be up to date. 
                Please go online to view the most current list.`
        });
    }

    render() {
        const {events} = this.props;
  
        return (
            <>
                <InfoAlert 
                    className="text-center"
                    text={this.state.infoText} 
                />
                <ul className="Event-List">
                    {events.map(event =>
                        <li key={event.id}>
                            <Event event={event} />
                        </li>
                    )}
                </ul>
            </>
        );
    }
}

EventList.propTypes = {
    events: PropTypes.array.isRequired
};

export default EventList;