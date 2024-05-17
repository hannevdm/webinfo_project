// Fetch book information from Open Library API
const books = [
    {
        title: "The Mysterious Affair at Styles",
        year: 1920,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780007282265-L.jpg",
        isbn: "9780007282265"
    },
    {
        title: "The Murder of Roger Ackroyd",
        year: 1926,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780062073563-L.jpg",
        isbn: "9780062073563"
    },
    {
        title: "The Murder at the Vicarage",
        year: 1930,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780061749919-L.jpg",
        isbn: "9780061749919"
    },
    {
        title: "Murder on the Orient Express",
        year: 1933,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780007815562-L.jpg",
        isbn: "9780007815562"
    },
    {
        title: "The ABC Murders",
        year: 1936,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780062879721-L.jpg",
        isbn: "9780062879721"
    },
    {
        title: "Death on the Nile",
        year: 1937,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780007815531-L.jpg",
        isbn: "9780007815531"
    },
    {
        title: "And Then There Were None",
        year: 1939,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780007282319-L.jpg",
        isbn: "9780007282319"
    },
    {
        title: "Evil Under the Sun",
        year: 1941,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780007815593-L.jpg",
        isbn: "9780007815593"
    },
    {
        title: "The Body in the Library",
        year: 1942,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780008196530-L.jpg",
        isbn: "9780008196530"
    },
    {
        title: "Crooked House",
        year: 1949,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780008196349-L.jpg",
        isbn: "9780008196349"
    }
];

const carouselItems = document.getElementById('carouselItems');

books.forEach((book, index) => {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
        carouselItem.classList.add('active');
    }

    const img = document.createElement('img');
    img.src = book.coverImage;
    img.alt = book.title;
    img.classList.add('d-block', 'w-100');

    const caption = document.createElement('div');
    caption.classList.add('carousel-caption', 'd-none', 'd-md-block');

    // Fetch book description from Open Library API
    fetch(`https://openlibrary.org/isbn/${book.isbn}.json`)
        .then(response => response.json())
        .then(data => {
            const description = data.description ? data.description.value : "Description not available";
            caption.innerHTML = `<h5>${book.title}</h5><p>${book.year}</p><p>${description}</p>`;
        })
        .catch(error => {
            console.error('Error fetching book description:', error);
            caption.innerHTML = `<h5>${book.title}</h5><p>${book.year}</p><p>Description not available</p>`;
        });

    carouselItem.appendChild(img);
    carouselItem.appendChild(caption);

    carouselItems.appendChild(carouselItem);
});
