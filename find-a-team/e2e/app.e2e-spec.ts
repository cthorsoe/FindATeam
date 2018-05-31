import { AppPage } from './app.po';
import { browser} from 'protractor';

describe('Find-A-Team End-to-end Test!', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('Allow test runner to have some time to open test website', () => {
        page.navigateTo('/app')
        browser.sleep(5000);
    });
});
