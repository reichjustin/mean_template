describe('Unit: NotifierFactory', function() {
    //beforeEach(module('app'));
    beforeEach(module('app'));

    /* make sure this factory exists to begin with */
    it('make sure notifier factory exists',inject(function (NotifierFactory) {
        expect(NotifierFactory).not.to.equal(null);
    }));

    /* make sure the valid login is handled */
    it('should handle a valid login',inject(function (NotifierFactory, toast) {
        //create a mock for toast
        var toastMock = sinon.mock(toast);
        //expect the success method on the toast object to be called once
        toastMock.expects('success').once();

        //call the notify method with true AKA valid user
        NotifierFactory.notify(true);

        //verify the mock was satisfied
        toastMock.verify();
    }));

    /* make sure an invalid login is handled */
    it('should handle an invalid user login',inject(function (NotifierFactory, toast) {
        //create a mock for toast
        var toastMock = sinon.mock(toast);

        //expect the error method on the toast object to be called once
        toastMock.expects('error').once();

        //call the notify method with false AKA invalid user
        NotifierFactory.notify(false);

        //verify the mock was satisfied
        toastMock.verify();
    }));
})