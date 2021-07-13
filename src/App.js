import React, {Component} from 'react';
import './App.css';
import './nprogress.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import {checkToken, extractLocations, getAccessToken, getEvents} from './api';

class App extends Component {
    state = {
        currentLocation: 'all',
        events: [],
        locations: [],
        showWelcomeScreen: undefined
    }

    async componentDidMount() {
        this.mounted = true;
        const accessToken = localStorage.getItem('access_token');
        const isTokenValid = (await checkToken(accessToken)).error 
            ? false : true;
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');
        this.setState({showWelcomeScreen: !(code || isTokenValid)});
        if ((code || isTokenValid) && this.mounted) {
            getEvents().then((events) => {
                if (this.mounted) {
                    this.setState({
                        events, 
                        locations: extractLocations(events)
                    });
                }
            });
        }
       
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
        const {events, locations, showWelcomeScreen} = this.state;
        const {updateEvents} = this;
        if (showWelcomeScreen === undefined) return <div className="App" />;
        
        return (
            <div className="App">
                <CitySearch locations={locations} updateEvents={updateEvents} 
                />
                <NumberOfEvents 
                    maxNumEvents={this.state.maxNumEvents} 
                    updateEvents={updateEvents} 
                />
                <EventList events={events} />
                <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
                    getAccessToken={() => {getAccessToken();}} />
            </div>
        );
    }
}

export default App;
