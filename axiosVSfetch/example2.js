//Using Fetch

async function main() {
    const response = await fetch(
        "url", 
        {
            method:"POST",
            body: {
                username:"Abhijeet",
                password:"1234567"
            },
            headers: {
                "Authorization":"Bearer 123"
            }
        },
    );
    const data = await response.json();
    console.log(data);
}
main();


//Using Axios
const axois= require("axios");

async function main() {
    const response = await axois.post("url", {
        username:"Abhijeet123",
        password:"1234556",
    },
        {
        headers: {
            "Authorization":"Bearer 123"
        }
    });
    console.log(response.data);
}

main();