async function listBooks(place) {
    let url = 'http://openlibrary.org/search.json?q=';
    url += 'author:("Agatha Christie")';
    if (place) {
        url += ' place:("' + encodeURIComponent(place) + '")';
    }

    console.log("Fetching URL:", url); // Debugging statement

    const response = await fetch(url);
    const data = await response.json();

    console.log("Response Data:", data); // Debugging statement
    console.log("Docs:", data.docs); // Debugging statement



    // Adjust filtering logic based on available fields
    const filteredResults = data.docs.filter(book => {
        // Example: Check for `place` and alternative fields if needed
        // Log the condition to see why filtering might fail

        return book.place && book.place.includes(place);
    });

    console.log("Filtered Results:", filteredResults); // Debugging statement

    return filteredResults;
}

async function initMap() {
    // Request needed libraries.
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
    const map = new Map(document.getElementById("map"), {
        zoom: 2.5,
        center: { lat: 34.0, lng: 23.0 },
        mapId: "4504f8b37365c3d0",
    });

    // Set LatLng and title text for the markers.
    const tourStops = [
        {
            position: { lat: 50.5719, lng: -3.9207 },
            title: "Dartmoor",
            bookList: ""
        },
        {
            position: { lat: 50.5039, lng: 4.4699 },
            title: "Belgium",
            bookList: ""
        },
        {
            position: { lat: 41.0082, lng: 28.9784 },
            title: "Istanbul",
            bookList: ""
        },
        {
            position: { lat: 26.8206, lng: 30.8025 },
            title: "Egypt",
            bookList: ""
        },
        {
            position: { lat: 44.8125, lng: 20.4612 },
            title: "Belgrade",
            bookList: ""
        },
        {
            position: { lat: 51.5742, lng: 0.4857 },
            title: "Essex",
            bookList: ""
        },
        {
            position: { lat: 34.5338, lng: 43.4837 },
            title: "Iraq",
            bookList: ""
        },
        {
            position: { lat: 44.7917, lng: 1.0926 },
            title: "France",
            bookList: ""
        },
        {
            position: { lat: 40.7128, lng: -74.0060 },
            title: "New York",
            bookList: ""
        },
        {
            position: { lat: 31.7683, lng: 35.2137 },
            title: "Jerusalem",
            bookList: ""
        },
        {
            position: { lat: 18.2345, lng: -66.4108 },
            title: "West Indies",
            bookList: ""
        },
    ];

    // Create an info window to share between markers.
    const infoWindow = new InfoWindow();

    // Create the markers.
    tourStops.forEach(({ position, title, bookList }, i) => {
        const pin = new PinElement({
            
            scale: 1.5,
        });
        const marker = new AdvancedMarkerElement({
            position,
            map,
            title: `${i + 1}. ${title}`,
            content: pin.element,
        });

        // Add a click listener for each marker, and set up the info window.
        marker.addListener("click", async () => {
            const books = await listBooks(title);
            let bookListHtml = "<ul>";
            books.forEach(book => {
                bookListHtml += `<li>${book.title}</li>`;
            });

            console.log("Books:", books);
            bookListHtml += "</ul>";
            const placename = `<h1>${title}</h1><p>${bookListHtml}</p>`;

            console.log("Booklist HTML:", bookListHtml);
    
            infoWindow.close();
            infoWindow.setContent(placename);
            infoWindow.open(marker.map, marker);
        });
    });
}

initMap();
