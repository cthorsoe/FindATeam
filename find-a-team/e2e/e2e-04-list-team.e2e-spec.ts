import { AppPage, Login, User, Team } from './app.po';
import { browser, by, element } from 'protractor';

describe('Create team', () => {
    let page: AppPage = new AppPage();
    let team:Team = new Team();
    let teamsCountStart:number = undefined;
    beforeEach(() => {
        // page = new AppPage();
    });

    it('4.0: Get current listed teams count', async() => {
        let countPromise = team.getListedTeamsCount();
        countPromise.then(function(count){
            teamsCountStart = count;
        });
    });

    it('4.1: Navigate to list team', async() => {
        team.navigateToListTeam();
    });

    it('4.2: Select team in dropdown and click List Team button', async() => {
        team.listTeam();
    });

    it('4.3: Get listed teams count after and check if it increased by one', async() => {
        let countPromise = team.getListedTeamsCount();
        countPromise.then(function(count){
            expect((teamsCountStart + 1)).toEqual(count);
        });
    });

});
 