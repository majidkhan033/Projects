// Write a function that Prints Multiples of a given number until 100

// function getMultiples(number){
//     ..................
//     return multiplesArray 
// }

function getMultiples(number){
    multiplesArray = [];
    for (let i=number; i<=100; i++){
        if (i%number==0){
            multiplesArray.push(i)
        }
    }
    return multiplesArray
}
console.log(getMultiples(4))