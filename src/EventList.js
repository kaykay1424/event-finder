import React, {Component} from 'react';
import Event from './Event';
import PropTypes, {shape} from 'prop-types';

class EventList extends Component {
    render() {
        const {events} = this.props;
        return (
            <ul className="Event-List">
                {events.map(event =>
                    <li key={event.id}>
					  	<Event event={event} />
                    </li>
                )}
            </ul>
        );
    }
}

EventList.propTypes = {
    events: shape({
        id: PropTypes.string.required
    })
};

export default EventList;