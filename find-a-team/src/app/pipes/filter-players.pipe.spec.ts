/* import { FilterPlayersPipe } from './filter-players.pipe';
import { TestBed, async } from '@angular/core/testing';

describe('FilterPlayersPipe', () => {
    beforeEach(() => {
        this.players = [
            {id: 1, firstname: 'John', lastname: 'Doe', username:'johndoe', dateofbirth: new Date(2000, 0, 1), email:'email@test.com'},
            {id: 2, firstname: 'Johny', lastname: 'Smith', username:'smith123', dateofbirth: new Date(2000, 0, 1), email:'email@test.com'},
            {id: 3, firstname: 'Sarah', lastname: 'Lane', username:'haras', dateofbirth: new Date(2000, 0, 1), email:'email@test.com'},
            {id: 4, firstname: 'Peter', lastname: 'Jensen', username:'PJ', dateofbirth: new Date(2000, 0, 1), email:'email@test.com'},
        ];
        TestBed.configureTestingModule({
            declarations: [
                FilterPlayersPipe
            ],
        });
      });

    describe('Filter Players', () => {
        let pipe = new FilterPlayersPipe();
        
        it('No search string returns input', () => {
            let result = pipe.transform(this.players, '');
            expect(result.length).toBe(4);
        });
  
        it('John returns 2', () => {
            let result = pipe.transform(this.players, 'John');
            expect(result.length).toBe(2);
        });
    });
});
 */