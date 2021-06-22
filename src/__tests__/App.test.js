import React from 'react';
import {shallow, mount} from 'enzyme';
import App from '../App';
import CitySearch from '../CitySearch';
import EventList from '../EventList';
import NumberOfEvents from '../NumberOfEvents';
import {mockData} from '../mock-data';
import {extractLocations, getEvents} from '../api';

describe('<App /> component', () => {
    let AppWrapper;
    
    beforeAll(() => {
        AppWrapper = shallow(<App />);
    });

    test('render EventList', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    test('render NumberOfEvents', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    });
});

describe('<App /> integration', () => { 
    test('App passes "events" state as a prop to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(
            EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
    });

    test('App passes "locations" state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(
            CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    });

    test('get list of events matching the city selected by the user', 
        async () => {
            const AppWrapper = mount(<App />);
            const CitySearchWrapper = AppWrapper.find(CitySearch);
            const locations = extractLocations(mockData);
            CitySearchWrapper.setState({suggestions: locations});
            const suggestions = CitySearchWrapper.state('suggestions');
            const selectedIndex = Math.floor(
                Math.random() * (suggestions.length));
            const selectedCity = suggestions[selectedIndex];
            await CitySearchWrapper.instance().handleItemClick(selectedCity);
            const allEvents = await getEvents();
            const eventsToShow = allEvents.filter(
                event => event.location === selectedCity);
            expect(AppWrapper.state('events')).toEqual(eventsToShow);
            AppWrapper.unmount();
        });

    test('get list of all events when user selects "See all cities"', 
        async () => {
            const AppWrapper = mount(<App />);
            const suggestionItems = AppWrapper.find(
                CitySearch).find('.suggestions li');
            await suggestionItems.at(
                suggestionItems.length - 1).simulate('click');
            const allEvents = await getEvents();
            expect(AppWrapper.state('events')).toEqual(allEvents);
            AppWrapper.unmount();
        });
    
    test('get number of events matching number specified by user', async () => {
        const AppWrapper = mount(<App />);
        AppWrapper.find(NumberOfEvents).find('.number').simulate('change', {
            target: {value: 1}
        });

        let events = await getEvents();
        events = events.slice(0,1);
        expect(AppWrapper.state('events')).toEqual(events);
        AppWrapper.unmount();
    });

    // eslint-disable-next-line max-len
    test('set max number of events user can select based on number of events available', 
        () => {
            const AppWrapper = mount(<App />);
            expect(AppWrapper.find(NumberOfEvents).find(
                '.number').prop('max')).toEqual(
                AppWrapper.state('maxNumEvents'));
            AppWrapper.unmount();
        });
});