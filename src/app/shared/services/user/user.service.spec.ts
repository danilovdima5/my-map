import { User } from '@angular/fire/auth';
import { UserService } from './user.service';
import { of } from 'rxjs';

describe(UserService.name, () => {
    let service: UserService;

    beforeEach(() => {
        service = new UserService();
    });

    describe('get user$', () => {
        it('should return __user$ as observable', (done) => {
            const userValue = {} as User;

            service['__user$'].asObservable = jasmine.createSpy().and.returnValue(of(userValue));

            service.user$.subscribe(value => {
                expect(value).toBe(userValue);

                expect(service['__user$'].asObservable).toHaveBeenCalledOnceWith();

                done();
            });
        });
    });

    describe('set user', () => {
        it('should return __user$ as observable', () => {
            const userValue = {} as User;

            service['__user$'].next(null);

            service.user = userValue;

            expect(service['__user$'].getValue()).toBe(userValue);
        });
    });
});
