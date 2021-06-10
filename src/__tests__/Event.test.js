import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';

describe('<Event /> component', () => {
	let EventWrapper;
	beforeAll(() => {
		EventWrapper = shallow(<Event />);
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