
// import readlineSync from "readline-sync"
function base64Decoding(){
        // Step-1=> Accept string input
    let Base64String = document.getElementById("decodeinput").value
    const base64regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

    while(!Base64String || (!(base64regex.test(Base64String)))){
        Base64String = readlineSync.question(" Invalid Input, Please try again : ");
    }
    // console.log(Base64String);
        // Step-2=> Split Character
    let SplitString = Base64String.split("")
    // console.log("the given string:- ",SplitString)
    // Base64 Values
    let Base64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let value = []
    for(let i=0;i<SplitString.length;i++){
        for(let j=0;j<Base64.length;j++){
            if(SplitString[i]==Base64[j]){
                value.push(Base64.indexOf(Base64[j]))
            }
        }
    }
    // console.log("the Base64 values: ",value)

    // converting to binary
    let binaryCodes = value.map((num) => num.toString(2));
    console.log("Binary Codes: ", binaryCodes);
    //checking for 6bit binaries
    for (let i=0;i<binaryCodes.length;i++){
        while(binaryCodes[i].length<6){
            binaryCodes[i] = "0" + binaryCodes[i]
            }
        }
    // console.log("6bit binary codes : ",binaryCodes)
    let oneBinary = binaryCodes.join("").split("");
    // console.log(oneBinary)

    //grouping of 8bit binaries
    let binaryCode8Bit = [];
    while (oneBinary.length != 0) {
        binaryCode8Bit.push(oneBinary.splice(0, 8).join(""));
    }
    // console.log("Binaries in 8 Bits are : ", binaryCode8Bit);
    let BintoDec = binaryCode8Bit.map((num) => parseInt(num,2));
    // console.log("ASCII Values : ", BintoDec);
    let lastElement = BintoDec[BintoDec.length - 1];
    let sum = 0
    for(let i=0;i<lastElement;i++){
        sum += lastElement[i]
    }
    if(sum == 0){
        BintoDec.pop()
    }
    let string = BintoDec.map((str) => String.fromCharCode(str));
    // console.log("String : ", string);
    let decodedstr = string.join("")
    console.log("Decoded string : ",decodedstr)
    document.getElementById("decodeoutput").innerText = decodedstr
    // return decodedstr;
    }

    // base64Decoding();

export default base64Decoding;





//---------------------------------------------------------------------------------------------------------------------------

