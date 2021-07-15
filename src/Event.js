import React, {Component} from 'react';
import PropTypes, {shape} from 'prop-types';

class Event extends Component {
    state = {
        showState: false
    }

    render() {
        const {event} = this.props;
        const {showDetails} = this.state;
        const eventStartDate = new Date(event.start.dateTime);
        const eventStartHours = eventStartDate.getHours();
        const eventStartMinutes = eventStartDate.getMinutes();
        const eventStartTime = `${eventStartHours}:${
            eventStartMinutes === 0 ? '00' : eventStartMinutes}`;
        const eventEndDate = new Date(event.end.dateTime);
        const eventEndHours = eventEndDate.getHours();
        const eventEndMinutes = eventEndDate.getMinutes();
        const eventEndTime = `${eventEndHours}:${
            eventEndMinutes === 0 ? '00': eventEndMinutes}`;
        return <div className="Event">
            <h3>{event.summary}</h3>
            <p><b>Date:</b> {new Date(event.start.dateTime).toDateString()}</p>
            <p><b>Time:</b> {eventStartTime} - {eventEndTime}</p>
            <p>
                <b>Location: </b> 
                <span className="location">{event.location}</span>
            </p>
            <div 
                className={`details ${
                    showDetails ? 'show': 'hide'
                }`
                }
            >
                <h4>About event:</h4>	
                <p>{event.description}</p>
                <p>
                    <a 
                        href={event.htmlLink} 
                        rel="noreferrer"
                        target="_blank">See details on Google Calendar
                    </a>
                </p>
            </div>
            <button 
                className="toggle-details"
                onClick={() => this.setState({showDetails: !showDetails})}
            >Details</button>
        </div>;
    }
}

Event.propTypes = {
    event: shape({
        description: PropTypes.string.required,
        htmlLink: PropTypes.string.required
    })
};
export default Event;