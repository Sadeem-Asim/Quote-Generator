const quoteText = document.querySelector("#quote");
const quoteContainer = document.querySelector("#quote-box");
const authorText = document.querySelector("#author");
const newQuoteButton = document.querySelector("#new-quote");
const twitterButton = document.querySelector("#twitter");
const loader = document.querySelector("#loader");
// get Quote from api
loader.hidden = true;
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}
async function getQuote() {
  loading();
  //   const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl = "http://api.quotable.io/random";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    authorText.innerHTML = data.author;
    quoteText.innerHTML = data.content;
  } catch (error) {
    getQuote();
    console.log("whoops error!!!", error);
  }
  complete();
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}
newQuoteButton.addEventListener("click", getQuote);
twitterButton.addEventListener("click", tweetQuote);
