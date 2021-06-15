import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';

describe('<Event /> component', () => {
	let EventWrapper;
	beforeAll(() => {
		EventWrapper = shallow(<Event event={{created: "2020-05-19T19:17:46.000Z",
		description: "Have you wondered how you can ask Google to show you the list of the top ten must-see places in London? And how Google presents you the list? How can you submit the details of an application? Well, JavaScript is doing these. :) \n\nJavascript offers interactivity to a dull, static website. Come, learn JavaScript with us and make those beautiful websites.",
		end: {dateTime: "2020-05-19T17:00:00+02:00", timeZone: "Europe/Berlin"},
		htmlLink: "https://www.google.com/calendar/event?eid=NGVhaHM5Z2hraHJ2a2xkNzJob2d1OXBoM2VfMjAyMDA1MTlUMTQwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20",
		location: "London, UK",
		start: {dateTime: "2020-05-19T16:00:00+02:00", timeZone: "Europe/Berlin"},
		summary: "Learn JavaScript"}} />);
	});

	test('render Details button', () => {
		expect(EventWrapper.find('.toggle-details')).toHaveLength(1);
	});

	test('render Details info', () => {
		expect(EventWrapper.find('.details')).toHaveLength(1);
	});

	test('clicking Details button should show details if details are hidden', () => {
		EventWrapper.setState({showDetails: false});
		EventWrapper.find('.toggle-details').simulate('click');
		expect(EventWrapper.state('showDetails')).toBe(true);
	});

	test('clicking Details button should hide details if details are visible', () => {
		EventWrapper.setState({showDetails: true});
		EventWrapper.find('.toggle-details').simulate('click');
		expect(EventWrapper.state('showDetails')).toBe(false);
	});
});