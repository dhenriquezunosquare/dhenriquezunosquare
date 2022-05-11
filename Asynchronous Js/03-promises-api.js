"use strict";


// let wordnikWords = "http://api.wordnik.com/v4/words.json/",
//     wordnikWord = "http://api.wordnik.com/v4/word.json/",
//     apiKey = "?api_key=2efe06dd56a60633b30010e4d970da03b55279db9896d7127",
//     wordObj;



// fetch(wordnikWords+"randomWord"+apiKey).then((d)=>{
//     console.log(d);

//     return d.json();
// })
// .then((data)=>{
//     console.log(data.word);
// })

//let url= "https://swapi.dev/api/people/1";

const swapi = function(num){
    let url= "https://swapi.dev/api/people/"+num;
    fetch(url)
    .then((result)=>{
        return result.json();
    })
    .then((data)=>{
        console.log(data);
    })
}


swapi(1);