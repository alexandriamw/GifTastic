// array of 90s TV shows
const topics = [
    "Cheers",
    "Friends",
    "Seinfeld",
    "Frasier",
    "The Simpsons",
    "The X-Files",
    "Saved by the Bell",
    "Family Matters",
    "Boy Meets World",
    "The Fresh Prince of Bel-Air",
]

//my API key
const APIKey = "wJ9FQnapL15iOcQCenrHnbCjBXpGt5ni";

const queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    +"&api_key=wJ9FQnapL15iOcQCenrHnbCjBXpGt5ni&limit=10";

function renderButtons() {
    // Deleting the show buttons prior to adding new show buttons
    // (this is necessary otherwise we will have repeat buttons)
    document.getElementById("buttons-view").innerHTML = "";

    // Looping through the array of shows
    for (let i = 0; i < topics.length; i++) {
        // Creating a button for each show
        const a = document.createElement("button");
        // Adding a class
        a.classList.add("show");
        // Adding a data-attribute with a value of the show at index i
        a.setAttribute("data-name", topics[i]);
        // Providing the button's text with a value of the show at index i
        a.innerHTML = topics[i];
        // Adding the button to the HTML
        document.getElementById("buttons-view").append(a);
    }
}

document
    .getElementById("add-show")
    .addEventListener("click", function (event) {
        event.preventDefault();
        // Grab the text from the input box
        const show = document.getElementById("show-input").value.trim();
        // The show from the textbox is then added to our array
        topics.push(show);

        renderButtons();
    });

renderButtons();


fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (responseJson) {
        const results = responseJson.data;
        for (let i = 0; i < results.length; i++) {
            if (results[i].rating === "g" || results[i].rating === "pg") {
                const gifButton = document.createElement("button");
                const rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                const p = document.createElement("p");
                p.innerHTML = "Rating: " + rating;
                // Creating an image tag
                const personImage = document.createElement("img");

                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                personImage.setAttribute("src", results[i].images.fixed_height.url);

                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(personImage);

                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                document.getElementById("gifs-appear-here").prepend(gifDiv);
            }
        }
    });