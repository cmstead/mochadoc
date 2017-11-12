describe('TestFixture', function () {

    describe('function 3', function () {

        it('should have a test', function () {
            // this is a test
        });

        it('should have another test', function () {
            // this is a second test
        });

    });

    describe('function 4', function () {

    });

    describe('something else', function () {
        const testTitleValue = 'Testing';

        // Jest style tests
        test('This is a Jest style test', () => {
            const stuff = 5;
            assert('foo' !== stuff);
        });

        // A test with regex in the description
        it(/This is regex/, () => {
            // a test with regex
        });

        // This is a non-string description
        it(testTitleValue, () => {

        });

        // This is a non-string description
        it(testTitleValue + 'a string', () => {

        });

        // This is a non-string description
        it('a string' + testTitleValue, () => {

        });
    });

    suite('This is a test suite', function () {
        test('this is a tdd test', () => {
            // other stuff
        });
    });

});