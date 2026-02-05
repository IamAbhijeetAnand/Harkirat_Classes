const axios= require("axios");
async function main() {
    const response = await axios.get(
        //httpdumy.app  use this site to get this dummy dump link
        "https://httpdump.app/dumps/408469af-6fdb-46b6-96c1-8ec5a0440d29?a=4", {
            //Body as 2nd argument
            username:"Abhijeet123",
            password:"1234567",
        },
        {
            headers: {
                //Header as 3rd argument
                Authorization:"Bearer 123"

            },
        },
    );
    console.log(response.data);
}
main();