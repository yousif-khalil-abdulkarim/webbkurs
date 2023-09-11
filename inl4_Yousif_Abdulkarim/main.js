"use strict";

const baseUrl = "http://www.omdbapi.com";
const apiKey = "41059430";
function getUrl(movie) {
    const url = new URL(baseUrl);
    url.searchParams.append("s", movie);
    url.searchParams.append("apikey", apiKey);
    url.searchParams.append("type", "movie");
    url.searchParams.append("r", "json");
    return url.toString();
}
function fetchMovies(movie) {
    const request = new XMLHttpRequest();
    request.open("get", getUrl(movie), true);
    request.send();
    return new Promise((resolve, reject) => {
        request.addEventListener("load", (event) => {
            const result = JSON.parse(request.responseText);
            resolve(result);
        })
        request.addEventListener("error", () => console.log("error") || reject());
        request.addEventListener("timeout", () => console.log("timeout") || reject());
        request.addEventListener("abort", () => console.log("abort") || reject());
    })
}

const searchForm = document.getElementById("search-form");
const resultElement = document.getElementById("result");

searchForm.addEventListener("submit", async event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const movieName = formData.get("query");
    const { Response, Search, Error } = await fetchMovies(movieName);
    const hasNotMatch = Response === "False";
    if (hasNotMatch) {
        console.error(Error);
        return;
    }
    const items = Search
        .map(item => `${item.Title} (${item.Year})`)
        .map(item => {
            const pElement = document.createElement("p");
            pElement.innerText = item;
            return pElement;
        })
    resultElement.innerHTML = "";
    for (const item of items) {
        console.log(item);
        resultElement.appendChild(item);
    }
    
});