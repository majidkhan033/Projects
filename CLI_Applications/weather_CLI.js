import axios from "axios";
import readlineSync from "readline-sync";


console.log("Welcome To Weather API Application");
console.log("-----------------------------------");
async function getWeather(){
    try {
        let cityname = readlineSync.question("Enter Cityname : ");
        while (!cityname) {
            cityname = readlineSync.question("City name cannot be empty! Please Re-Enter the Name : ");
        }
        let res = await axios.get (`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=a06f7a0d0fae7926aa6e13224d71923f`);
        // console.log(res.data);

        const options = ["Exit", "Check Minimum Tempterature", "CHeck Maximum Temperature", "Check Humidity", "Check Sunrise Time", "Check Sunset Time"];

        options.forEach((element, index) =>
        console.log(`Press ${index} to ${element}`)
        );
        
        const option = readlineSync.questionInt("Enter : ");
        // console.log(option);

        if ((option >= 0) && (option < options.length)) {
            switch(option) {
                case 0:
                    console.log("Program is Terminated");
                    // opt()
                    break;
                case 1:
                    console.log(`The Temperature in ${cityname} is ${(res.data.main.temp_min - 273).toFixed(2)} Centrigrade`);
                    opt();
                    break;
                case 2:
                    console.log(`The Temperature in ${cityname} is ${(res.data.main.temp_max - 273).toFixed(2)} Centrigrade`);
                    opt();
                    break;
                case 3:
                    console.log(`The Humidity in ${cityname} is ${res.data.main.humidity}`);
                    opt();
                    break;
                case 4: 
                    console.log(`The Sunrise Time in ${cityname} is ${res.data.sys.sunrise} Centigrade`);
                    opt();
                    break;
                case 5:
                    console.log(`The Sunset Time in ${cityname} is ${res.data.sys.sunset} Centigrate`);
                    opt();
                    break;
                default:
                    console.log("Invalid Input. Please select the values from the given options.");
                    break;
            }
        }

    } catch (error) {
        console.error(error);
        console.error(err.response.data);
    }
}
getWeather();

function opt() {
    let choices = readlineSync.question("Do You Want To Continue? (Y/N) : ")
    if((choices == "Y") || (choices == "y")) {
        console.log(getWeather());
    }
    else if((choices == "N") || (choices == "n")){
        console.log("Alright!");
    }
    else{
        console.log("Inavlid Input, Enter correctly (Y/N)");
        opt();
    }
}
