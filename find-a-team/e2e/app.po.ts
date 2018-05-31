import { browser, by, element } from 'protractor';

export class AppPage {
    navigateTo(path:string) {
        return browser.get(path);
    }

    getParagraphText() {
        return element(by.css('app-root h1')).getText();
    }
}

export class Login {
    page: AppPage = new AppPage();
    logIn(username = 'cthorsoe', password = '1234', sleep:boolean = false){
        this.page.navigateTo('/app/login');
        element(by.id('txtLoginUserName')).sendKeys(username);
        element(by.id('txtLoginPassword')).sendKeys(password);
        if(sleep){
            browser.sleep(2000);
        }
        element(by.id('btnLogIn')).click().then(() => {
            browser.wait(function () {
                return element(by.id('navbarDropdown')).isPresent();
            });
            expect(element(by.id('navbarDropdown')).isPresent()).toBeTruthy();
        });
       browser.sleep(2000);
    }
    logOut(){
        expect(element(by.id('navbarDropdown')).isPresent()).toBeTruthy();
        element(by.id('navbarDropdown')).click().then(() => {
            element(by.id('navLinkLogout')).click().then(() => {
                expect(element(by.id('navLinkLogin')).isPresent()).toBeTruthy();
                expect(browser.getCurrentUrl()).toContain('/app/login');
            });
        });
    }
 }

export class Register {
    navigateToRegisterPage(){
        expect(element(by.id('navLinkLogin')).isPresent()).toBeTruthy();
        element(by.id('navLinkRegister')).click().then(() => {
            expect(browser.getCurrentUrl()).toContain('/app/register');
        });
    }
    registerUser(username:string, password:string){
        element(by.id('txtRegisterFirstName')).sendKeys('firstname');
        element(by.id('txtRegisterLastName')).sendKeys('lastname');
        element(by.id('txtRegisterUserName')).sendKeys(username);
        element(by.id('txtRegisterEmail')).sendKeys('christian@thorsoe.dk');
        element(by.id('txtRegisterPassword')).sendKeys(password);
        element(by.id('txtRegisterPasswordConfirm')).sendKeys(password);
        element(by.id('txtRegisterDate')).sendKeys('01012000');
        expect(element(by.id('frmRegisterUser')).getAttribute('class')).toContain('ng-valid');
        browser.sleep(2000);
        element(by.id('frmRegisterUser')).submit().then(() => {
            expect(browser.getCurrentUrl()).toContain('/app/login');
        });
    }
}

export class User{
    page: AppPage = new AppPage();
    navigateToListUser(){
        element(by.id('navLinkListPlayer')).click().then(() => {
            expect(browser.getCurrentUrl()).toContain('/app/list-player');
        });
    }
    
    listUser(){
        element(by.id('txtListRole')).sendKeys('e2e test');
        element(by.id('txtListDescription')).sendKeys('This user was listed by an e2e test');
        expect(element(by.id('frmListPlayer')).getAttribute('class')).toContain('ng-valid');
        browser.sleep(2000);
        element(by.id('frmListPlayer')).submit().then(() => {
            expect(browser.getCurrentUrl()).toContain('/app/players');
        });
    }

    getListedUserCount(){
        this.page.navigateTo('/app/players');
        expect(browser.getCurrentUrl()).toContain('/app/players');
        return element.all(by.css('.list-card')).then(function(arr) {
            expect(arr).toBeDefined()
            return arr.length
        });
    }

}

export class Team {
    page: AppPage = new AppPage();

    navigateToListTeam(){
        element(by.id('navLinkListTeam')).click().then(() => {
            expect(browser.getCurrentUrl()).toContain('/app/list-team');
        });
    }

    navigateToMyTeams(){
        element(by.id('navLinkMyTeams')).click().then(() => {
            expect(browser.getCurrentUrl()).toContain('/app/my-teams');
        });
    }

    navigateToCreateTeam(){
        expect(browser.getCurrentUrl()).toContain('/app/my-teams');
        expect(element(by.id('btnLinkCreateTeam')).isPresent()).toBeTruthy();
        element(by.id('btnLinkCreateTeam')).click().then(() => {
            browser.sleep(2000);
            expect(browser.getCurrentUrl()).toContain('/app/create-team');
        });
    }

    createTeam(){
        element(by.id('txtCreateTeamName')).sendKeys('e2eTestTeam' + new Date().getTime());
        expect(element(by.id('frmCreateTeam')).getAttribute('class')).toContain('ng-valid');
        browser.sleep(2000);
        element(by.id('frmCreateTeam')).submit().then(() => {
            expect(browser.getCurrentUrl()).toContain('/app/my-teams');
        });
    }

    getMyTeamsCount():any{
        expect(browser.getCurrentUrl()).toContain('/app/my-teams');
        browser.sleep(2000);
        return element.all(by.css('.list-card')).then(function(arr) {
            expect(arr).toBeDefined()
            return arr.length
        });
    }

    getListedTeamsCount():any{
        this.page.navigateTo('/app/teams');
        return element.all(by.css('.list-card')).then(function(arr) {
            expect(arr).toBeDefined()
            return arr.length
        });
    }

    listTeam(){
        element(by.cssContainingText('option', 'e2eTestTeam')).click();
        browser.sleep(2000);
        expect(element(by.id('btnListTeam')).isPresent()).toBeTruthy();
        element(by.id('btnListTeam')).click();
    }
}