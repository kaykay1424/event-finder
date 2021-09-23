import React, {useState, useEffect} from 'react';
import Event from './Event';
import PropTypes from 'prop-types';
import './EventList.css';
import {InfoAlert} from './Alert';

const EventList = ({events}) => {
    const [infoText, setInfoText] = useState('');

    useEffect(() => {
        setInfoText(navigator.onLine 
            ? '' : `The list loaded may not be up to date. 
        Please go online to view the most current list.`);
    }, [events]);

    return (
        <>
            <InfoAlert 
                text={infoText} 
            />
            <div className="event-list-container">
                
                <ul className="Event-List">
                    {events.map((event, i) =>
                        <li key={i}>
                            <Event event={event} />
                        </li>
                    )}
                </ul>
                
            </div>
            
        </>
    );
};

EventList.propTypes = {
    events: PropTypes.array.isRequired
};

export default EventList;