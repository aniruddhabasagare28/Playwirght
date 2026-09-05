//var keyword
var name = "John";
console.log(name); // Output: John

//let keyword
let age = 30;
console.log(age); // Output: 30

//const keyword
const city = "New York";
console.log(city); // Output: New York

age = 31; // This is valid since 'age' is declared with 'let'
name = "Doe"; // This is valid since 'var' allows reassignment (and even redeclaration)
//city = "Los Angeles"; // This will cause an error since 'city' is declared with 'const' and cannot be reassigned

//age = 'aniruddha'; // This will cause an error since 'age' is declared as a number and cannot be assigned a string value
//name = 123; // Type 'number' is not assignable to type 'string'.ts(2322)


let randomValue:any = 10; // randomValue is of type 'any', so it can hold any type of value
randomValue = "Hello";
console.log(randomValue); // Output: Hello