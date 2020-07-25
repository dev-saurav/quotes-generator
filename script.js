//get quotes from the api
async function getQuote() {
    const proxy = "https://desolate-bastion-82740.herokuapp.com/"
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try {
        const response = await fetch(proxy + apiUrl);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        // if we get a error then call for a new quote
        getQuote()
        console.log("oops!", error);
    }
}


//on load
getQuote();