import React, {Component} from 'react';
import PropTypes, {shape} from 'prop-types';
import {convertTime} from './api';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faCalendarAlt,
    faChevronDown,
    faChevronUp,
    faClock, 
    faLocationArrow,
    faNewspaper
} from '@fortawesome/free-solid-svg-icons';
import './Event.css';

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
        // eslint-disable-next-line no-unused-vars
        const eventStartTime = `${eventStartHours}:${
            eventStartMinutes === 0 ? '00' : eventStartMinutes}`;
        const eventEndDate = new Date(event.end.dateTime);
        const eventEndHours = eventEndDate.getHours();
        const eventEndMinutes = eventEndDate.getMinutes();
        // eslint-disable-next-line no-unused-vars
        const eventEndTime = `${eventEndHours}:${
            eventEndMinutes === 0 ? '00': eventEndMinutes}`;
        return <div className="Event">
            <h3>{event.summary}</h3>
            <p> 
                <FontAwesomeIcon icon={faClock} /> 
                {new Date(event.start.dateTime)
                    .toDateString()} | {
                    convertTime(eventStartTime)} - {convertTime(eventEndTime)}
                
            </p>
            <p>
                
                <FontAwesomeIcon icon={faLocationArrow} /> {event.location}
            </p>
            <div 
                className={`details ${
                    showDetails ? 'show': 'hide'
                }`
                }
            >
                <div>
                    <FontAwesomeIcon icon={faNewspaper} />
                    <p>
                        
                        {event.description}
                    </p> 	
                </div>
                
                <div>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <p>
                        <a 
                            href={event.htmlLink} 
                            rel="noreferrer"
                            target="_blank">See details on Google Calendar
                        </a>
                    </p>
                    
                    
                </div>
            </div>
            <button 
                className="toggle-details"
                onClick={() => this.setState({showDetails: !showDetails})}
            >Details {this.state.showDetails 
                    ? <FontAwesomeIcon icon={faChevronUp} />
                    : <FontAwesomeIcon icon={faChevronDown} />}</button>
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