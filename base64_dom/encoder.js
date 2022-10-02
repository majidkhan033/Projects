
// import readlineSync from "readline-sync";
function Base64Encoding(){
    // Step-1=> Accept string input
    let inputString=document.getElementById("encodeinput").value
    // Step-2=> Split Character
    let splitString=inputString.split("");
    // console.log("The String is :",splitString);
    // ASCII Decimals
    let ASCIIcodes=splitString.map((char)=>char.charCodeAt());
    // console.log("The ASCII array is ",ASCIIcodes);
    // Converting Decimal ASCII to Binary
    let Binarycodes=ASCIIcodes.map((number)=>number.toString(2));
    // console.log("The Binarycodes : ",Binarycodes);
    // Convert the binary to 8-bit
    let Binarycode8bit=Binarycodes.map((bin)=>{
        while (bin.length<8){
            bin="0"+bin;
        }
        return bin;
    })
    // console.log("Binary in 8-bit : ",Binarycode8bit)
    let OneBinary=Binarycode8bit.join("").split("");
    // console.log(OneBinary);
    let Binarycode6bit=[];
    while (OneBinary.length!=0){
        Binarycode6bit.push(OneBinary.splice(0,6).join(""));
    }
    // console.log("Binary in 6-bits : ",Binarycode6bit)
    // Divide in 6-bits
    // Padding and add =
    let lastElement=Binarycode6bit[Binarycode6bit.length-1];
    if (lastElement.length!=6){
        var counter=0;
        while (lastElement.length<6){
            lastElement=lastElement+"0";
            counter++;
        }
        Binarycode6bit[Binarycode6bit.length-1]=lastElement;
    }
    // console.log(Binarycode6bit)
    let bintoDecimal=Binarycode6bit.map((str)=>parseInt(str,2));
    // console.log("The conversion is ",bintoDecimal);
    let Base64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    let Base64final=bintoDecimal.map((dec)=>Base64[dec]);
    // console.log("Base 64 String : ",Base64final);
    if (counter==2){
        Base64final.push("=");
    }else{
        Base64final.push("==");
    }
    let finalBase64String=Base64final.join("");
    console.log("your Base 64 Output is : ",finalBase64String)
    // return finalBase64String;

    document.getElementById("encodeoutput").innerText = finalBase64String
}
// Base64Encoding();

// export default Base64Encoding
