const { expect } = require('chai');

function asyncFunction ( callback){
    setTimeout(function(){
        callback("xD");
    }, 100);
}

function PromiseFunction(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve("lol")
        }, 100);
    })
}


it('test async function', function(done){
    asyncFunction(function(str){
        expect(str).to.equal('xD');
        done();
    })
})

it("test promise function", function(){
    return PromiseFunction().then(function(res){
        expect(res).to.equal('lol');
    })
})

it("test async-await function", async function(){
    const res = await PromiseFunction();
    expect(res).to.equal('lol');
})