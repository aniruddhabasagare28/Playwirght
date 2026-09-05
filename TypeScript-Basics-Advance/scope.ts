// Global Scope
var globalVar = "I am global";
let globalLet = "I am also global";

//Function Scope
function myFunction() {
    var functionVar = "I am function-scoped";
    let functionLet = "I am also function-scoped";
}

//Block Scope
if (true) {
    var blockVar = "I am block-scoped";
    let blockLet = "I am also block-scoped";
}

console.log(globalVar); // Accessible
// console.log(functionVar); // Error: functionVar is not defined
// console.log(blockVar); // Error: blockVar is not defined
console.log(blockVar); // Accessible because it's declared with var


console.log(globalLet); // Accessible
// console.log(functionLet); // Error: functionLet is not defined
// console.log(blockLet); // Error: blockLet is not defined