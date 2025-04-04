import axios from "axios";

// https://api.github.com/users/suhailroushan13

 function callServer() {
    try {
        let URL = "https://api.github.com/users/suhailroushan13";
        let output =  axios.get(URL);
        console.log(output.data)
    } catch (error) {
        console.log(error);
    }
}

callServer();