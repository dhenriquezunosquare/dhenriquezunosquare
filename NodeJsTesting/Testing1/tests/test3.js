const { expect } = require('chai');
before('setup Code', function () {
    console.log("Setup Code");
});

after('teardown Code', function () {
    console.log("teardown Code");
})

beforeEach('setup before each test', function () {
    console.log("setup before each test");
})
afterEach('setup after each test', function () {
    console.log("setup after each test");
})
describe('TestSuite', function () {
    
    it('should be true',()=>{
        console.log("testing");
        expect(true).to.equal(true);
    })

    it('test2',()=>{
        console.log("testing 2");
        expect(false).to.equal(false);
    })
});