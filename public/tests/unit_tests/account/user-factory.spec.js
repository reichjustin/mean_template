describe('Unit: UserFactory', function() {
    beforeEach(module('app'));

    /* make sure this factory exists to begin with */
    it('make sure user factory exists',inject(function (UserFactory) {
        expect(UserFactory).not.to.equal(null);
    }));

    /* There should not be an authenicated user on init */
    it('make sure user factory is not authenticated yet',inject(function (UserFactory) {
        expect(UserFactory.currentUser).to.equal(undefined);
        expect(UserFactory.isAuthenticated()).to.equal(false);
    }));

    /* setting the current user should return a true auth */
    it('setting the currentUser will result in auth',inject(function (UserFactory) {
        UserFactory.currentUser = { username : 'test' };
        expect(UserFactory.isAuthenticated()).to.equal(true);
    }));

    /* logging out with remove auth */
    it('calling the logout will remove auth',inject(function (UserFactory) {
        UserFactory.currentUser = { username : 'test' };
        expect(UserFactory.isAuthenticated()).to.equal(true);

        //logout the user
        UserFactory.logOut();

        //now the currentUser should be undefined and not auth
        expect(UserFactory.currentUser).to.equal(undefined);
        expect(UserFactory.isAuthenticated()).to.equal(false);
    }));
})