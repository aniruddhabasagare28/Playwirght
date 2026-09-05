//Array declaration - Array Literal 
let fruits = ['mango', 'banana', 'apple', 'grapes', 3, true, {name: 'John', age: 30}];
console.log(fruits);
console.log(fruits[0]); // Accessing the first element of the array
console.log(fruits[6]); // Accessing the last element of the array
fruits[1] = 'orange'; // Modifying the second element of the array
console.log(fruits);
fruits.push('kiwi'); // Adding a new element to the end of the array
fruits.pop(); // Removing the last element of the array

fruits.unshift('strawberry'); // Adding a new element to the beginning of the array
fruits.shift(); // Removing the first element of the array





// Array Declaration - Array Constructor
let cars:any[] = new Array("BMW", "Audi", "Mercedes");
cars.push("Toyota"); // Adding a new element to the end of the array
console.log(cars);
cars.pop(); // Removing the last element of the array
console.log(cars);
cars[1] = 11; // Modifying the second element of the array
cars.unshift("Honda"); // Adding a new element to the beginning of the array
console.log(cars);
cars.shift(); // Removing the first element of the array
console.log(cars);

//sorting array
let numbers = [5, 2, 9, 1, 5, 6];
numbers.sort();
console.log(numbers); // Output: [1, 2, 5, 5, 6, 9]
numbers.reverse();
console.log(numbers); // Output: [9, 6, 5, 5, 2, 1]


let numbers1 = [5, 2, 9, 1, 5, 6];
console.log(numbers1.toSorted((a,b)=> a-b)); // Output: [1, 2, 5, 5, 6, 9]
console.log(numbers1.toSorted((a,b)=> b-a)); // Output: [9, 6, 5, 5, 2, 1]

//sliced array
let slicedArray = numbers1.slice(1, 4); // Slicing the array from index 1 to index 3
console.log("Sliced Array:"); // Output: [2, 9, 1]
console.log(slicedArray); // Output: [2, 9, 1]

//Filtering array
let filteredArray = numbers1.filter((num)=>num>5); // Filtering the array to get numbers greater than 5
console.log("Filtered Array:"); // Output: [9, 6]
console.log(filteredArray); // Output: [9, 6]