async function initMap() {
    // Request needed libraries.
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
        "marker",
    );
    const map = new Map(document.getElementById("map"), {
        zoom: 3,
        center: { lat: 34.0, lng: 23.0 },
        mapId: "4504f8b37365c3d0",
    });
    // Set LatLng and title text for the markers.
    const tourStops = [
        {
            position: { lat: 51.5072, lng: 0.1276 },
            title: "London",
            link: "https://www.visitlondon.com"
        },
        {
            position: { lat: 50.5039, lng: 4.4699 },
            title: "Belgium",
            link: "https://www.visitlondon.com"
        },
        {
            position: { lat: 41.0082, lng: 28.9784 },
            title: "Istanbul",
            link: "https://www.visitlondon.com"
        },
        {
            position: { lat: 26.8206, lng: 30.8025 },
            title: "Egypt",
            link: "https://www.visitlondon.com"
        },
        {
            position: { lat: 44.8125, lng: 20.4612 },
            title: "Belgrade",
            link: "https://www.visitlondon.com"
        },
        {
            position: { lat: 50.7156, lng: 3.5309 },
            title: "Devon",
            link: "https://www.none.com"
        },
        {
            position: { lat: 51.5742, lng: 0.4857 },
            title: "Essex",
            link: "https://www.atstyles.com"
        },

    ];
    // Create an info window to share between markers.
    const infoWindow = new InfoWindow();

    // Create the markers.
    tourStops.forEach(({ position, title, link }, i) => {
        const pin = new PinElement({
            glyph: `${i + 1}`,
            scale: 1.5,
        });
        const marker = new AdvancedMarkerElement({
            position,
            map,
            title: `${i + 1}. ${title}`,
            content: pin.element,
        });

        // Add a click listener for each marker, and set up the info window.
        marker.addListener("click", () => {
            const content = `<h1>${title}</h1><p><a href="${link}" target="_blank">Visit London</a></p>`;

            infoWindow.close();
            infoWindow.setContent(content);
            infoWindow.open(marker.map, marker);
        });
    });
}

initMap();
