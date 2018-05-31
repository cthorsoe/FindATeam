import { AppPage, Login, User, Team } from './app.po';
import { browser, by, element } from 'protractor';

describe('Create team', () => {
    let page: AppPage = new AppPage();
    let team:Team = new Team();
    let teamsCountStart:number = undefined;
    beforeEach(() => {
        // page = new AppPage();
    });

    it('3.0: Navigate to my teams', async() => {
        team.navigateToMyTeams();
    });

    it('3.1: Get current teams count', async() => {
        team.getMyTeamsCount().then(function _resolvePromiseOfCall(count){
            teamsCountStart = count;
        });
    });

    it('3.2: Click on create teams', async() => {
        team.navigateToCreateTeam();
    });

    it('3.2: Fill create team form and submit', async() => {
        team.createTeam();
    });

    it('3.4: Get current teams count after and check if it increased by one', async() => {
        team.getMyTeamsCount().then(function _resolvePromiseOfCall(count){
            expect((teamsCountStart + 1)).toEqual(count);
        });
    });
});
 