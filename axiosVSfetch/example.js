//Axios VS fetch
//GET request
// function main() {
//     fetch("https://sum-server.100xdevs.com/todos") //Url to get all thr todos data
//     //fetch will return promises So we will have
//     .then(async response=> {
//         const json = await response.json(); // await response.json() converting the response that the fetch got into json. It maight be parsing out some text into json
//         console.log(json);           //And we have to await for this because if not used await we will get a promise{<pending>} if we log that json 
//         //Here we know that this will return json data so we had written  await response.json();
//         //If they provide text data then we would have written await response.text();
//     })
// }


//Both code do the same thing
//GET request
async function main() {
    const response = await fetch("https://sum-server.100xdevs.com/todos");
    const json = await response.json();
    console.log(json); 
}

// main();


//Axios
//GET request
//As axois is an external library we have to import it
const axois= reqiure(axois);
//If we are sending get request then axios.get() request
//For post request axois.post()
async function main() {
    const response = await axois.get("https://sum-server.100xdevs.com/todos");
    //Axois is a much smarter library compare to fetch
    //It autimatically understand that the data coming is json so we don't have to parse
    //We can directly log this data
    //Using axois you will get acces to the final thing here is response.data
    console.log(response.data.todos);
}

main();



//POST request in both
//Fetch request
async function main() {
    const reaponse = await fetch("url", {
        method:"POST"
    });
    const json = await response.json();//You might get error here sometime as we don't know which type of data we are going to get if we know its json then .json if it is text then .text etc etc
    consle.log(json);
}
main();

//Axios
async function main() {
    const response = axios.post("url");
    console.log(response.data.todos);
}
main();


//Difference b/w them
//1. Syntax - Axios syntax is much clener