//for loop 

for(let i=0; i<5; i++){
    if(i===3){
        continue; // skip the rest of the loop when i is 3
    }
    console.log(i);
}


for(let i=0; i<5; i++){
    if(i===3){
        break  // exit the loop when i is 3
    }
    console.log(i);
}


//while loop
let j=0;
while(j<5){
    console.log(j);
    j++;
}