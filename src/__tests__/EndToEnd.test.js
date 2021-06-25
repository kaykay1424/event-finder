import puppeteer from 'puppeteer';
import {extractLocations} from '../api';
import {mockData} from '../mock-data';

describe('show/hide an event details', () => {
    let browser;
    let page;

    beforeAll(async () => {
        jest.setTimeout(30000);
        browser = await puppeteer.launch();
        // browser = await puppeteer.launch({
        //     // headless: false,
        //     // slowMo: 150, 
        //     // ignoreDefaultArgs: ['--disable-extensions']
        // });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.Event');
        
    });

    afterAll(() => {
        browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.Event .details.show');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => { 
        await page.click('.Event .toggle-details');

        const eventDetails = await page.$('.Event .details.show');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide its details', async () => {
        await page.click('.Event .toggle-details');
        const eventDetails = await page.$('.Event .details.show');
        expect(eventDetails).toBeNull();
    });
});

describe('Filter events by city', () => {
    let browser;
    let page;

    beforeAll(async () => {
        jest.setTimeout(550000);
        browser = await puppeteer.launch();
        // browser = await puppeteer.launch({
        //     // headless: false,
        //     // slowMo: 100, 
        //     // ignoreDefaultArgs: ['--disable-extensions']
        // });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
    });

    afterAll(() => {
        browser.close();
    });

    test('Events match all cities by default', async () => {
        const city = await page.$eval(
            '.city', element => element.value);

        const eventsLength = await page.$$eval(
            '.Event', elements => elements.length);
        expect(city).toBe('');
        expect(eventsLength).toBe(mockData.length);
    });

    test('User can see list of suggestions when typing', async () => {
        await page.type('.city', 'Berlin');
        let matchingLocations = extractLocations(mockData);

        matchingLocations = matchingLocations.filter(location => 
            location.toUpperCase().indexOf('Berlin'.toUpperCase()) > -1
        );
        matchingLocations.push('See all cities');
        const suggestions = await page.$$eval(
            '.suggestions li', elements => 
                elements.map(element => element.textContent));
        
        expect(suggestions).toEqual(matchingLocations);
    });

    test('User can change city to view events from that city', async () => {
        await page.focus('.city');

        const selectedLocation = await page.$eval(
            '.suggestions > li', element => element.textContent);
        await page.click('.suggestions > li');
        let eventLocations = await page.$$eval(
            '.Event .location', elements => 
                elements.map(element => element.textContent));
        // Filter out duplicate values so that array is left empty 
        // (if the only location that exists in the array 
        // is the selectedLocation)        
        eventLocations = eventLocations.filter(
            location => location !== selectedLocation);
        expect(eventLocations).toEqual([]);      
    });
});