import { checkForUrl } from '../js/urlChecker'

describe('Test check url functionality', () => {
    test('Testing the checkUrl function defined or not', () => {
        expect(checkForUrl()).toBeDefined();
    })

    test('Testing the checkUrl function return false for invalid url', () => {
        expect(checkForUrl('Picard')).toBe(false);
    })

    test('Testing the checkUrl function return true for valid url', () => {
        expect(checkForUrl('https://www.example.com')).toBe(true);
    })
})