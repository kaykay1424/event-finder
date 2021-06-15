import React, {Component} from 'react';
import './App.css';
import './nprogress.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import {extractLocations, getEvents} from './api';

class App extends Component {
    state = {
        events: [],
        locations: []
    }

    componentDidMount() {
        this.mounted = true;
        getEvents().then((events) => {
            if (this.mounted) {
                this.setState({
                    events, 
                    locations: extractLocations(events)
                });
            }
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    updateEvents = (location) => {
        getEvents()
            .then(events => {
                this.setState({
                    events: location === 'all' 
                        ? events 
                        : events.filter(event => event.location === location)
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
                <NumberOfEvents />
                <EventList events={events} />
            </div>
        );
    }
}

export default App;
