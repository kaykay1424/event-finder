import React from 'react';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';

function App() {
  return (
    <div className="App">
		<CitySearch />
		<EventList />
		<NumberOfEvents />
    </div>
  );
}

export default App;
