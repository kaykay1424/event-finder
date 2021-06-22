import React, {Component} from 'react';
import './App.css';
import './nprogress.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import {extractLocations, getEvents} from './api';

class App extends Component {
    state = {
        currentLocation: 'all',
        events: [],
        locations: []
    }

    componentDidMount() {
        this.mounted = true;
        getEvents().then((events) => {
            if (this.mounted) {
                this.setState({
                    events, 
                    locations: extractLocations(events),
                    maxNumEvents: 20
                });
            }
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    updateEvents = (location, numEvents) => {
        
        if (location) 
            this.setState({
                currentLocation: location
            });
            
        else if (!location)
            location = this.state.currentLocation;
            
        if (!numEvents) numEvents = 20;
        
        getEvents()
            .then(events => { 
                let updatedEvents;
                if (location === 'all') 
                    updatedEvents = events;
                else 
                    updatedEvents = events.filter(event => 
                        event.location === location
                    );
                  
                this.setState({
                    events: updatedEvents.slice(
                        0, numEvents),
                    maxNumEvents: updatedEvents.length    
                });
            });
    }

    render() {
        const {events, locations} = this.state;
        const {updateEvents} = this;
        return (
            <div className="App">
                <CitySearch locations={locations} updateEvents={updateEvents} 
                />
                <NumberOfEvents 
                    maxNumEvents={this.state.maxNumEvents} 
                    updateEvents={updateEvents} 
                />
                <EventList events={events} />
            </div>
        );
    }
}

export default App;
