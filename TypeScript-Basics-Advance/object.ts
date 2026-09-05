let person:{name: string; age: number; isStudent: boolean; address: {street: string; city: string}}={
    name: 'John', 
    age: 30,
    isStudent: true,    
    address: {
        street: '123 Main St',
        city: 'New York'
    }
}

type studentDetailsFormat = {
    name: string;
    age: number;
    isStudent: boolean;
}

let aniruddha:studentDetailsFormat = {
    name: 'Aniruddha',
    age: 25,
    isStudent: true
}

let vegnesh:studentDetailsFormat = {
    name: 'Vegnesh',
    age: 28,
    isStudent: false
}