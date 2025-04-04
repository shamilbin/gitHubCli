











import dotenv from "dotenv";
dotenv.config(); // START THE PROCESS TO GET DETAILS FROM .env
// It reads your .env file and adds all the key-value pairs to process.env.




let userName = process.env.USERNAME;
let password = process.env.PASSWORD
console.log(userName, password)