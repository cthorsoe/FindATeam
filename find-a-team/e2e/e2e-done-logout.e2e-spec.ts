import { AppPage, Login, User } from './app.po';
import { browser, by, element } from 'protractor';

describe('e2e test done, user log out before end', () => {
    let login:Login = new Login();
    beforeEach(() => {
    });
    
    it('End: User logout', async() => {
        login.logOut();
    });
});
 