async function listBooks(place) {
    let url = 'http://openlibrary.org/search.json?q=';
    url += 'author:("Agatha Christie")';
    const l = document.getElementById("location").value.trim();
    if (place) {
        url += ' place:("' + place + '")';
    }

    const response = await fetch(url);
    const data = await response.json();

    const filteredResults = data.docs.filter(book => {
        return book.place && !book.publish_place;
    });

    console.log(filteredResults);
}
