// array of 90s TV shows
const topics = [
    "The Wonder Years",
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
];

function renderButtons() {
    // Deleting the show buttons prior to adding new show buttons
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

    document.querySelectorAll("button").forEach(function (button) {
        button.addEventListener("click", buttonClickListener);
    })
    
    document.querySelectorAll(".gif").forEach(function (img) {
        img.addEventListener("click", imageToggleListener);
    });
}

function buttonClickListener() {
    // "this" refers to "this button that was clicked" from line above
    const topic = this.getAttribute("data-name");
    const apiKey = "wJ9FQnapL15iOcQCenrHnbCjBXpGt5ni";
    const queryURL = "https://api.giphy.com/v1/gifs/search?q=" + encodeURIComponent(topic) + "&api_key=" + encodeURIComponent(apiKey) + "&limit=10";

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (responseJson) {
            const results = responseJson.data;

            for (let i = 0; i < results.length; i++) {
                if (results[i].rating === "g") {
                    const gifDiv = document.createElement("div");

                    const rating = results[i].rating;

                    const p = document.createElement("p");
                    p.innerHTML = "Rating: " + rating;

                    const showImage = document.createElement("img");
                    showImage.setAttribute("src", results[i].images.original_still.url);
                    showImage.setAttribute("data-state", "still");
                    showImage.setAttribute("data-animate", results[i].images.fixed_height.url);
                    showImage.setAttribute("data-still", results[i].images.original_still.url);

                    gifDiv.prepend(p);
                    gifDiv.prepend(showImage);

                    document.getElementById("gifs-appear-here").prepend(gifDiv);
                }
            }
        });
}

function imageToggleListener () {
    const state = event.target.getAttribute("data-state");

    if (state === "still") {
        event.target.setAttribute("src", event.target.getAttribute("data-animate"));
        event.target.setAttribute("data-state", "animate");
    } else {
        event.target.setAttribute("src", event.target.getAttribute("data-still"));
        event.target.setAttribute("data-state", "still");
    }
}

document.getElementById("add-show").addEventListener("click", function (event) {
    event.preventDefault();

    // Grab the text from the input box
    const show = document.getElementById("show-input").value.trim();

    // The show from the textbox is then added to our array
    topics.push(show);

    // re-render the buttons again
    renderButtons();
});

renderButtons();