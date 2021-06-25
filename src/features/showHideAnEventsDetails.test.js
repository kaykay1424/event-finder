import React from 'react';
import {mount} from 'enzyme';
import App from '../App';
import {loadFeature, defineFeature} from 'jest-cucumber';
import Event from '../Event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('Event details are hidden by default', ({given, when, then}) => {
        let AppWrapper;

        // eslint-disable-next-line max-len
        given('the user hasn\'t clicked on \'Details\' button to show event\'s details',
            () => {

            });

        when('the user opens the app', () => {
            AppWrapper = mount(<App />);
        });

        then(`the event's details should be hidden`, () => {
            AppWrapper.update();
            expect(AppWrapper.find('.Event .details.show')).toHaveLength(0);
        });
    });

    test('Hidden event details are shown when user clicks on Details button', 
        ({given, when, then}) => {
            let AppWrapper;
            given('the event\'s details are hidden', () => {
                AppWrapper = mount(<App />);
            });

            when('the user clicks on \'Details\' button', async () => {
                AppWrapper.update();
                AppWrapper.find(
                    Event).at(0).find('.toggle-details').simulate('click');
            
            });

            then('the event\'s details should be visible', () => {
                expect(AppWrapper.find(
                    Event).at(0).find('.details.show')).toHaveLength(1);
            });
        });

    test('Visible event details are hidden when user clicks on Details button', 
        ({given, when, then}) => {
            let AppWrapper;

            given('the event\'s details are visible', async () => {
                AppWrapper = await mount(<App />);
                AppWrapper.update();
                AppWrapper.find(
                    Event).at(0).find('.toggle-details').simulate('click');
            
            });

            when('the user clicks on \'Details\' button', () => {
                AppWrapper.find(
                    Event).at(0).find('.toggle-details').simulate('click');
            });

            then('the event\'s details should be hidden', () => {
                expect(AppWrapper.find(
                    Event).at(0).find('.details.hide')).toHaveLength(1);
            });
        });
});
