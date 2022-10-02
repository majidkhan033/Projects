// import clc from 'cli-color'
import readlineSync from "readline-sync"
console.clear();
let result;
function calci(){
    // let color = clc.xterm(160)
    // var warn = clc.yellow;


console.log((`---Simple calculator---`));

let a = readlineSync.questionInt(("Enter the number : "));
let b = readlineSync.questionInt(("Enter the number : "));

console.log(`(" Select from below\n add" for Addition, "sub" for Subtraction, "mult" for Multipication , "div" for division)`);

let operation = readlineSync.question(("Enter the operation :"))

let array = ["add","sub","mult","div"]
for(let i=0;i<array.length;i++){
    if(operation == array[i]){
switch (operation){
    case "add":
    result=a+b;
    break;
    case "sub":
        result=a-b;
        break;
    case "mult":
        result=a*b;
        break;
        case "div":
            result= a/b;          
    }
    console.log((result));

    }
}
}

// console.log(result);
calci ()