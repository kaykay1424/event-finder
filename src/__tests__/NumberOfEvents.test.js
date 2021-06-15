import React from 'react';
import {shallow} from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    test('render text input', () => {
        expect(NumberOfEventsWrapper.find('.number')).toHaveLength(1);
    });

    test('render text input correctly', () => {
        const numEvents = NumberOfEventsWrapper.state('numEvents');
        expect(NumberOfEventsWrapper.find(
            '.number').prop('value')).toBe(numEvents);
    });

    test('change state when text input changes', () => {
        NumberOfEventsWrapper.setState({
            numEvents: 32
        });
        
        const changedNum = 10;
        const eventObject = {target: {value: changedNum}};
        NumberOfEventsWrapper.find('.number').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state('numEvents')).toBe(changedNum);
    });

});