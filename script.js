//dom refrences
const container = document.getElementById('quote-container');
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader')

function showLoadingSpinner() {
    loader.hidden = false;
    container.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        loader.hidden = true;
        container.hidden = false;
    }
}

//get quotes from the api
async function getQuote() {
    showLoadingSpinner();
    const proxy = "https://desolate-bastion-82740.herokuapp.com/"
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try {
        const response = await fetch(proxy + apiUrl);
        const data = await response.json();
        //if there is no author then add 'Unknown'
        if (data.quoteAuthor === '') {
            author.innerText = "Unknown"
        } else {
            author.innerText = data.quoteAuthor
        }
        //If there the quote is long reduce the font size
        if (data.quoteText.length > 120) {
            quote.classList.add('long-quote')
        } else {
            quote.classList.remove('long-quote')
        }
        quote.innerText = data.quoteText;

        //loading completed
        removeLoadingSpinner();
    } catch (error) {
        // if we get a error then call for a new quote
        getQuote()
        console.log("oops!", error);
    }
}

//tweets quote in new twitter window
function tweetQuote() {
    const quoteText = quote.innerText;
    const authorText = author.innerText;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${authorText}`;
    window.open(tweetUrl, "_blank");
}

//add all the event listners
newQuote.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


//on load
getQuote();
