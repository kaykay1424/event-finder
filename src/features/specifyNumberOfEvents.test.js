import React from 'react';
import {mount} from 'enzyme';
import App from '../App';
import {loadFeature, defineFeature} from 'jest-cucumber';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('Default number of events is showing', ({given, when, then}) => {
        let AppWrapper;

        given('the user hasn\'t changed the number of events', () => {

        });

        when('the user opens the app', () => {
            AppWrapper = mount(<App />);
        });

        then('the user should see a list of events matching default number', 
            () => {
                AppWrapper.update();
                expect(AppWrapper.find('.Event')).toHaveLength(2);
            });
    });

    // eslint-disable-next-line max-len
    test('When user changes number of events, events showing changes to match that number', 
        ({given, when, then}) => {
            let AppWrapper;

            given('the app is open', () => {
                AppWrapper = mount(<App />);
            });

            when('the user changes number of events', () => {
                AppWrapper.find('.number').simulate('change', {
                    target: {value: 1}
                });
            });

            then('the user should see a list of events equal to that number', 
                () => {
                    AppWrapper.update();
                    expect(AppWrapper.find('.Event')).toHaveLength(1);
                });
        });
});