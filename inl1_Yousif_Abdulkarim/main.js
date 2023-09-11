"use strict";

// Uppgift 1.
console.log( 5 * 2  < 12 );
console.log( 55  > 22 );
console.log( 16 / 4 ===  4 );
console.log( 8 + 2  < 128 );
console.log( 32 * 8 > 255 );

// Uppgift 2.
console.log("Tisdag".substring(0, 3))
console.log("Hamburgare".substring(3))
console.log("I'll be back".substring(5))

// Uppgift 3.
console.log("It's Learning".substring(5).toUpperCase())
console.log("JavaScript: The Good Parts".substring(16).toLowerCase())

// Uppgift 4.
const numbers = [128, 256, 512, 1024, 2048];
const sumOfNumbers  = numbers.reduce((sum, nbr) => sum + nbr, 0)
console.log(sumOfNumbers)
const avgNumber  = sumOfNumbers / numbers.length;
console.log(avgNumber)

// Uppgift 5.
const countries = ["Sweden", "Denmark", "Finland", "Norway"];
console.log(countries[1].substring(0, 3))
const sum = 
    countries.map(countryName => countryName.length)
    .reduce((sum, countryNameLength) => sum + countryNameLength, 0)
const average = sum / countries.length;
console.log(average)

// Uppgift 6.
const values = [3, 5, "Jane", true, 144, false];
console.log([...values].reverse())

// Uppgift 7.
const names = ["Jane", "Joe", "Eliza"];
const ages = [21, 34, 22];
const hasPet = [true, false, true];
const multipleArrays = [
    ...names,
    ...ages,
    ...hasPet
]
console.log(multipleArrays)

// Uppgift 8.
const actors = ["Sherlock", "Watson", "Bo"];
console.log(actors.join(" - "))

// Uppgift 9.
let amount = 50;

if (amount < 50) {
    console.log("Less then 50!")
}
else if (amount >= 50 && amount < 65) {
    console.log("Optimal range for the amount!")
}
else {
    console.log("Too much")
}

// Uppgift 10.
for (let i = 0; i < 8; i++) {
    let str = ""
    for (let j = 0; j < (i+1); j++) {
        str += "#"
    }
    console.log(str)
}