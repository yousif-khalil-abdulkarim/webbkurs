"use strict";

// Uppgift 1
function max(nbr1, nbr2) {
    if (nbr2 > nbr1) {
        return nbr2
    }
    return nbr1
}
console.log(max(5, 10)); 
console.log(max(7, 7));

function min(nbr1, nbr2) {
    if (nbr2 < nbr1) {
        return nbr2
    }
    return nbr1
}
console.log(min(12, 24));
console.log(min(30, 18));


// Uppgift 2
function range(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
        array.push(i)
    }
    return array;
}
console.log(range(10))

// Uppgift 3
console.log("Uppgift 3")
function sum(nbrs) {
    let sum = 0;
    for (let i = 0; i < nbrs.length; i++) {
        const nbr = nbrs[i];
        sum += nbr;
    }
    return sum;
}
console.log(sum([5, 10, 15, 20, 25]))

// Uppgift 4
function countCharacter(str, char) {
    let i = 0;
    for (const charInStr of str) {
        if (charInStr === char) {
            i++
        }
    }
    return i
} 
console.log(countCharacter("Jane Doe", "e"));
console.log(countCharacter("Abracadabra", "a"));

// Uppgift 5
function palindrome(str) {
    const reversedString = [...str].reverse().join("")
    return reversedString === str;
}
console.log(palindrome("sirap - paris"));
console.log(palindrome("lorem ipsum"));

// Uppgift 6
const person = {
    firstName: "Yousif",
    lastName: "Abdulkarim",
    age: 24,
    family: ["Abrahim", "Asmail"]
}

// Uppgift 7
function printPerson(person) {
    console.log("Fullname:", person.firstName, person.lastName + ",", "Age:", person.age)
    console.log("Family:", person.family.join(", "))
}
console.log(printPerson(person))

// Uppgift 8
function createBox(height, width) {
    return {
        height,
        width
    }
}
const box = createBox(15, 20)
console.log(box.height);
console.log(box.width);

// Uppgift 9
function Triangle(width, height) {
    return {
        width,
        height,
        area() {
            return (this.width * this.height) / 2
        }
    }
}
const triangle = Triangle(12, 14);
console.log(triangle.height);
console.log(triangle.width);
console.log(triangle.area());

// Uppgift 10
function attributes(object) {
    const fields = []
    for (const field in object) {
        fields.push(field)
    }
    return fields;
}
const obj1 = {
    a: 1,
    b: 2,
    c: 3
};
console.log(attributes(obj1))