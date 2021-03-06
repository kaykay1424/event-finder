import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './NumberOfEvents.css';

import {ErrorAlert} from './Alert';

const NumberOfEvents = ({currentNumEvents, maxNumEvents, updateEvents}) => {
    const [infoText, setInfoText] = useState('');
    const [numEvents, setNumEvents] = useState('');
    const [maximumNumEvents, setMaximumNumEvents] = useState('');
        
    useEffect(() => {
        setNumEvents(currentNumEvents);
        setMaximumNumEvents(maxNumEvents);
    },[currentNumEvents, maxNumEvents]);

    const handleInputChange = (value) => {
        
        if (value < 1 || value > maximumNumEvents) {
            setInfoText(`Please enter a number between 1 and ${maxNumEvents}.`);
            setNumEvents(value);
            return;
        } else {
            setInfoText('');
            setNumEvents(value);
        }
        
        

        updateEvents(null, value);
    };

    return (
        <div className="Number-Of-Events">
            <label 
                className="label" 
                htmlFor="number">Select number of events</label>
            <input 
                id="number"
                className="number"
                type="number"
                value={numEvents}
                max={maximumNumEvents}
                min="1"
                onChange={(e) => handleInputChange(e.target.value)}
            />
            <ErrorAlert 
                text={infoText} 
            />
        </div>
        
    );
};

NumberOfEvents.propTypes = {
    maxNumEvents: PropTypes.number,
    updateEvents: PropTypes.func
};

export default NumberOfEvents;
