const quotesUrl = "https://api.quotable.io/quotes/random";

const quoteBtn = document.querySelector("#quote");
const username = document.querySelector("#username")
const content = document.querySelector("#content")

quoteBtn.addEventListener("click", async ()=>{
    const quoteData = await getQuotes();
    // console.log(quoteData);
    username.value = quoteData.author;
    content.value = quoteData.content;
});
async function getQuotes(){
    try {
        const q = await fetch(quotesUrl);
        const quotesObj = await q.json();
        return quotesObj[0];
    } catch (e) {
        console.log("error:-",e);
    }
}
getQuotes();