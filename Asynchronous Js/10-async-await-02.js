"use strict";

const swapiFilms= async ()=> {
    let url= "https://swapi.dev/api/films/";
    let filmsData;
    let films=[];
    filmsData = await fetch(url);
    let data = await filmsData.json();
    const {results} = data
    films= results.map(f=>f.title)
    console.log(films)
};

swapiFilms();