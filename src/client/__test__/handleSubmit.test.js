import { TestScheduler } from '@jest/core'
import 'babel-polyfill'
import { handleSubmit } from '../js/formHandler'

describe('Client Test', () => {
    test('handleSubmit is defined', () => {
        expect(handleSubmit).toBeDefined();
    });
})