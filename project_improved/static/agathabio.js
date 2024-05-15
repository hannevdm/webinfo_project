
{
        fetch('https://openlibrary.org/authors/OL27695A.json')
            .then(response => response.json())
            .then(data => {
                const dataDisplay = document.getElementById("biography");
                dataDisplay.textContent = data.bio.value;
            })
            .catch(error => console.error("Error fetching JSON data:", error));}
