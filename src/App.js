import React, {Component} from 'react';
import './App.css';
import './nprogress.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
// import WelcomeScreen from './WelcomeScreen';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faSearch
} from '@fortawesome/free-solid-svg-icons';

import {
    // checkToken, 
    extractLocations, 
    // getAccessToken, 
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
        filteredCity: '',
        filteredEvents: [],
        locations: [],
        selectedChart: 'city',
        showWelcomeScreen: undefined,
        showUserInput: true
    }

    async componentDidMount() {
        this.mounted = true;
        // const accessToken = localStorage.getItem('access_token');
        // const isTokenValid = (await checkToken(accessToken)).error 
        //     ? false : true;
        // const searchParams = new URLSearchParams(window.location.search);
        // const code = searchParams.get('code');
        // this.setState({showWelcomeScreen: !(code || isTokenValid)});
        // if ((code || isTokenValid) && this.mounted) {
        getEvents().then((events) => {
            if (this.mounted) {
                this.setState({
                    events, 
                    locations: extractLocations(events)
                });
            }
        });
        // }
       
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    filterAllCitiesEvents = (city) => {
        this.setState({
            filteredCity: city,
            filteredEvents: this.state.events.filter((event) => {
                return event.location.match(city);
            })
        });
    }

    getCitiesData = () => {      
        const data = [];
        const cities = {};
        const events = this.state.filteredEvents.length > 0 
            ? this.state.filteredEvents
            : this.state.events;
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

    updateEvents = (location, numEvents) => {
        
        if (location) 
            this.setState({
                currentLocation: location
            });
            
        else if (!location)
            location = this.state.currentLocation;
            
        if (!numEvents) {
            this.setState({
                filteredCity: '',
                filteredEvents: []
            });
            numEvents = 20;
        }
        
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
        const {
            currentLocation,
            events, 
            filteredCity,
            filteredEvents,
            locations, 
            selectedChart,
            // showWelcomeScreen,
            showUserInput
        } = this.state;
        const {
            filterAllCitiesEvents, 
            getCitiesData, 
            updateEvents
        } = this;
        // if (showWelcomeScreen === undefined) return <div className="App" />;
        
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
                                maxNumEvents={this.state.maxNumEvents} 
                                updateEvents={updateEvents} 
                            />
                            {currentLocation === 'all' 
                                ? <>
                                    <p className="label">
										Filter events by city:
                                    </p>
                                    <ul className="all-cities-list">
                                        {locations.map((location, i) => {
                                            
                                            return <li 
                                                key={i}
                                                className={
                                                    filteredCity 
                                                        === location 
                                                        ? 'selected'
                                                        : ''
                                                }
                                                onClick={() => 
                                                    filterAllCitiesEvents(
                                                        location)
                                                }
                                            >{location}</li>;
                                            
                                        })}
                                    </ul>
                                </>
                                : null 
                            }
                            <p className="label">View events chart by:</p>
                            <label htmlFor="events-by-genre">Genre</label>
                            <input 
                                id="events-by-genre" 
                                type="radio" 
                                name="chart"
                                value="Genre" 
                                checked={selectedChart === 'genre' ?
                                    true: false
                                }
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
                                checked={selectedChart === 'city' ?
                                    true: false
                                } 
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
                        events={filteredEvents.length > 0 
                            ? filteredEvents : events} 
                    />
                    <div className="data-vis-wrapper">
                    
                        {selectedChart === 'genre' 
                            ? <EventGenre events={filteredEvents.length > 0 
                                ? filteredEvents : events} />
                            :
                            <div className="chart-container">
                                <h3 className="text-center">Events by city</h3>
                                <ResponsiveContainer width="100%" height={400}>
                        
                                    <ScatterChart
                                        margin={{
                                            top: 20, 
                                            right: 20, 
                                            bottom: 20, 
                                            left: 20,
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
                                            fill="#8884d8" 
                                        />
                                    </ScatterChart>
                                </ResponsiveContainer>
                            </div>
                        }
                    </div>
                </div>
                {/* <WelcomeScreen 
                    showWelcomeScreen={this.state.showWelcomeScreen}
                    getAccessToken={() => {getAccessToken();}} /> */}
                
            </div>
        );
    }
}

export default App;
