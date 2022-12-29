import { environment } from 'src/environments/environment';
import { ApiRoute } from './route';

describe('Utilities', () => {
    describe('ApiRoute.fromServerUrl', () => {
        it('Combines url and path to form a complete URL', () => {
            const expectation = `${environment.serviceUrl}/test`;
            const actual = ApiRoute.fromServerUrl('test');
            expect(expectation).toEqual(actual);
        });
    });
});
