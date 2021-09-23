import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faSearch
} from '@fortawesome/free-solid-svg-icons';

import {
    ResponsiveContainer, 
    ScatterChart, 
    Scatter, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip
} from 'recharts';

import './App.css';
import './nprogress.css';

import {
    checkToken, 
    extractLocations, 
    getAccessToken, 
    getEvents
} from './api';

/************ Components ***********/
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {
    state = {
        allEvents: [],
        currentLocation: 'all',
        currentNumEvents: 20,
        events: [],
        locations: [],
        maxNumEvents: 20,
        selectedChart: 'city',
        showWelcomeScreen: undefined,
        showUserInput: true
    }

    async componentDidMount() {
        this.mounted = true;
        const accessToken = localStorage.getItem('access_token');
        const isTokenValid = !!((await checkToken(accessToken)).error); 
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');
        this.setState({showWelcomeScreen: !(code || isTokenValid)});
        if ((code || isTokenValid) && this.mounted) {
            getEvents().then((events) => {
                if (this.mounted) {
                    this.setState({
                        allEvents: events,
                        currentNumEvents: events.length,
                        events, 
                        locations: extractLocations(events),
                        maxNumEvents: events.length
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
        const events = this.state.events;
        // Get number of events for each city
        events.forEach(({location}) => {
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

    updateEvents = async (location, numEvents) => { 
        let currentNumEvents = numEvents ? numEvents : this.state.currentNumEvents;
        
        /* If a location has been chosen
            make request to get events from that location.
            Otherwise, If the number of events has changed
            use the stored state of all events,
            since the events don't need to be changed,
            just the number of them being displayed
        */
        let events = location 
            ?   
                location === 'all'
                    ? await getEvents()
                    : (await getEvents()).filter((event) => event.location === location )
            : this.state.allEvents
  
        /* Only need to change allEvents when location is changed 
            (when there is a new list of events, not just a different number of events)
        */
        if (location) this.setState({allEvents: events});

        /* Change the number of events in the input
            and the state of the max number of events
            to the number of events being displayed
            if either number is greater than the number of
            events displayed, since they cannot select a 
            number higher than the number of events available
        */
        this.setState({
            currentNumEvents: currentNumEvents > events.length
                ? events.length
                : currentNumEvents
            ,
            maxNumEvents: events.length
        })

        /* Display the number of events specified by the user or the max
            number of events available
        */
        events = events.slice(0, currentNumEvents);
        this.setState({events});                
    }

    render() {
        const {
            events, 
            locations, 
            selectedChart,
            showWelcomeScreen,
            showUserInput
        } = this.state;
        const { 
            getCitiesData, 
            updateEvents
        } = this;

        if (showWelcomeScreen === undefined) return <div className="App" />;
        
        return (
            <div className="App">
                <div className="sidebar">
                    
                    {showUserInput ? 
                        <div className="user-input-container">
                            <span 
                                className="close" 
                                onClick={() => 
                                    this.setState({
                                        showUserInput: !showUserInput
                                    })}
                            >
                                &times;
                            </span>
                            <CitySearch 
                                locations={locations} 
                                updateEvents={updateEvents} 
                            />
                            <NumberOfEvents 
                                currentNumEvents={this.state.currentNumEvents}
                                maxNumEvents={this.state.maxNumEvents} 
                                updateEvents={updateEvents} 
                            />
                            <p className="label">View events chart by:</p>
                            <label htmlFor="events-by-genre">Genre</label>
                            <input 
                                id="events-by-genre" 
                                type="radio" 
                                name="chart"
                                value="Genre" 
                                checked={selectedChart === 'genre'}
                                onChange={() => this.setState({
                                    selectedChart: 'genre'
                                })}
                            />
                            
                            <label 
                                htmlFor="events-by-city"
                            >
                                City
                            </label>
                            <input 
                                id="events-by-city" 
                                type="radio" 
                                name="chart"
                                value="City"
                                checked={selectedChart === 'city'} 
                                onChange={() => this.setState({
                                    selectedChart: 'city'
                                })}
                            />
                           
                        </div>
                        : <div className="search-icon-container">
                            <span 
                                className="search-icon"
                                onClick={() => 
                                    this.setState({
                                        showUserInput: !showUserInput
                                    })}
                            ><FontAwesomeIcon icon={faSearch} /> </span>
                        </div>}
                </div>
 
                <div className="content">
                    <EventList 
                        events={events} 
                    />
                    <div className="data-vis-wrapper">
                        {selectedChart === 'genre' 
                            ? <EventGenre events={events} />
                            :
                            <div className="chart-container">
                                <h3 className="text-center">Events by city</h3>
                                <ResponsiveContainer width="100%" height={400}>
                        
                                    <ScatterChart
                                        margin={{ 
                                            left: -30,
                                            top: 5
                                        }}
                                    >
                                        <CartesianGrid />
                                        <XAxis 
                                            type="category" 
                                            dataKey="city" name="City" />
                                        <YAxis 
                                            allowDecimals={false}
                                            type="number" 
                                            dataKey="number" 
                                            name="Number of events" />
                                        <Tooltip 
                                            cursor={{strokeDasharray: '3 3'}} 
                                        />
                                        <Scatter 
                                            data={getCitiesData()} 
                                            fill="#3c92e8" 
                                        />
                                    </ScatterChart>
                                </ResponsiveContainer>
                            </div>
                        }
                    </div>
                </div>
                <WelcomeScreen 
                    showWelcomeScreen={this.state.showWelcomeScreen}
                    getAccessToken={() => {getAccessToken();}} />
                
            </div>
        );
    }
}

export default App;
