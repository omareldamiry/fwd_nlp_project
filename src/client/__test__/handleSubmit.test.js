import 'babel-polyfill'
import { handleSubmit } from '../js/formHandler'

describe('Client Test', () => {
    return handleSubmit(new Event("submit")).then(data => {
        expect(data).toContain({ message });
    });
    //! Cannot get it to work
})