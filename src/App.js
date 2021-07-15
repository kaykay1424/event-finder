import React, {Component} from 'react';
import './App.css';
import './nprogress.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
import WelcomeScreen from './WelcomeScreen';

import {
    checkToken, 
    extractLocations, 
    getAccessToken, 
    getEvents
} from './api';

import {
    ResponsiveContainer, 
    ScatterChart, 
    Scatter, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip
} from 'recharts';

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

    getCitiesData = () => {
        const data = [];
        const cities = {};

        // Get number of events for each city
        this.state.events.forEach(({location}) => {
            let numEvents = 0;
            if (cities.hasOwnProperty(location)) 
                numEvents = cities[location];

            cities[location] = numEvents + 1; 
        });

        for (const city in cities) {
            data.push({
                city: city.split(',')[0], // include only city without country
                'number': cities[city]
            });
        }

        return data;
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
        const {getCitiesData, updateEvents} = this;
        if (showWelcomeScreen === undefined) return <div className="App" />;
        
        return (
            <div className="App">
                <CitySearch locations={locations} updateEvents={updateEvents} 
                />
                <NumberOfEvents 
                    maxNumEvents={this.state.maxNumEvents} 
                    updateEvents={updateEvents} 
                />
                <h4 className="text-center">Events in each city</h4>
                <div className="data-vis-wrapper">
                    <EventGenre events={events} />
                    <ResponsiveContainer width="45%" height={400}>
                        <ScatterChart
                            margin={{
                                top: 20, right: 20, bottom: 20, left: 20,
                            }}
                        >
                            <CartesianGrid />
                            <XAxis 
                                type="category" 
                                dataKey="city" name="city" />
                            <YAxis 
                                allowDecimals={false}
                                type="number" 
                                dataKey="number" name="number of events" />
                            <Tooltip cursor={{strokeDasharray: '3 3'}} />
                            <Scatter data={getCitiesData()} fill="#8884d8" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
                <EventList events={events} />
                
                <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
                    getAccessToken={() => {getAccessToken();}} />
            </div>
        );
    }
}

export default App;
