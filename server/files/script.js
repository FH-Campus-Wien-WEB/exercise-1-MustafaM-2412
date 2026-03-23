window.onload = function () {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        const bodyElement = document.querySelector("body");
        if (xhr.status == 200) {
            /* Part 2: Build the HTML elements here and append them to the body */
            // JSON-String in JSON umwandeln
            const movies = JSON.parse(xhr.responseText);

            // Loop durch Movie-Array
            movies.forEach(movie => {
                //quasi wie ein div block aber durch arcticle sieht man dann direkt das es sich um ein "independent, self-contained content" handelt
                //der article block soll den css style von movie item übernehmen
                const movieArticle = document.createElement("article");
                movieArticle.className = "movie-item";

                // Poster erstellen + Alternative Text falls Bild fehlt
                if (movie.Poster) {
                    const img = document.createElement("img");
                    img.src = movie.Poster;
                    img.alt = "Poster von " + movie.Title;
                    //das bild wird dem article container hinzugefügt
                    movieArticle.appendChild(img);
                }

                const textContainer = document.createElement("div");
                textContainer.className = "movie-text-container";

                const title = document.createElement("h2");
                title.textContent = movie.Title;
                textContainer.appendChild(title);

                //eine section tag macht das man meherere html tags in einer section
                const details = document.createElement("section");
                details.innerHTML = `
                    <p><strong>Veröffentlicht:</strong> ${movie.Released}</p>
                    <p><strong>Dauer:</strong> ${movie.Runtime} min</p>
                    <p><strong>Genres:</strong> ${movie.Genres.join(", ")}</p>
                    <p><strong>Regie:</strong> ${movie.Directors.join(", ")}</p>
                    <p><strong>Darsteller:</strong> ${movie.Actors.join(", ")}</p>
                `;
                textContainer.appendChild(details);

                const description = document.createElement("p");
                description.className = "plot";
                description.textContent = movie.Plot;
                textContainer.appendChild(description);

                //aside tag wird für so sidebars verwendet und so
                const ratings = document.createElement("aside");
                ratings.innerHTML = `
                    <p><strong>IMDb:</strong> ${movie.imdbRating}</p>
                    <p><strong>Metascore:</strong> ${movie.Metascore}</p>
                `;
                textContainer.appendChild(ratings);

                movieArticle.appendChild(textContainer);
                bodyElement.appendChild(movieArticle);
            });
        } else {
            bodyElement.append("Daten konnten nicht geladen werden, Status " + xhr.status + " - " + xhr.statusText);
        }
    };
    xhr.open("GET", "/movies");
    xhr.send();
};