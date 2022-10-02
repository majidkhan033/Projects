import readlineSync from "readline-sync";
import Base64Encoding from "./encoder.js";
import Base64Decoding from "./decoder.js";

function app() {
    const options = ["Exit", "Encode", "Decode"];

    console.log(`----Base64 Application----`)
    // console.log(`====================================`)

    options.forEach((element, index) =>
        console.log(`Press ${index} to ${element}`)
    );

    const option = readlineSync.questionInt("Enter : ");
    // console.log(option);

    if ((option >= 0) && (option < options.length)) {
        switch (option) {
            case 0:
                console.log("Program is Terminated");
                // choice()
                break;
            case 1:
                console.log("The Encoded Base64 String is : ", Base64Encoding());
                choice();
                break;
            case 2:
                console.log("The Decoded Base64 String is : ", Base64Decoding());
                choice();
                break;
            default:
                console.log("Invalid Input");
                break;
        }
    }
}
function choice() {
    let choices = readlineSync.question("Do you want to continue? (Y/N) : ");
    if ((choices == "Y") || (choices == "y")) {
        console.log(app());
    }
    else if ((choices == "N") || (choices == "n")) {
        console.log("Alright!");
    }
    else {
        console.log("Inavlid Input, Enter correctly (Y/N)");
        choice();
    }
}
app();

export default choice;
