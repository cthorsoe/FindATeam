import { AppPage, Login, User } from './app.po';
import { browser, by, element } from 'protractor';

describe('List user', () => {
    let page: AppPage;
    let user:User = new User();
    let usersCountStart:number = undefined;
    beforeEach(() => {
        page = new AppPage();
    });
    
    it('2.0: Get current listed user count', async() => {
        user.getListedUserCount().then(function _resolvePromiseOfCall(count){
            usersCountStart = count;
        });
    });

    it('2.1: Navigate to list user', async() => {
        user.navigateToListUser();
    });

    it('2.2: Fill list user form and submit', async() => {
        user.listUser();
    });

    it('2.3: Get listed user count after and check if it increased by one', async() => {
        user.getListedUserCount().then(function _resolvePromiseOfCall(count){
            expect((usersCountStart + 1)).toEqual(count);
        });
    });
});
 