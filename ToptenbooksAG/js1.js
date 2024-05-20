const books = [
    {
        title: "The Mysterious Affair at Styles",
        year: 1920,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780007282265-L.jpg",
        description: "The Mysterious Affair at Styles was written in the middle of the First World War, in 1916, and first published by John Lane in the United States in October 1920 and in the United Kingdom by The Bodley Head on 21 January 1921."
    },
    {
        title: "The Murder of Roger Ackroyd",
        year: 1926,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780062073563-L.jpg",
        description: "The Murder of Roger Ackroyd was first published in June 1926 in the United Kingdom by William Collins, Sons and in the United States by Dodd, Mead and Company later in the same year."
    },
    {
        title: "The Murder at the Vicarage",
        year: 1930,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780061749919-L.jpg",
        description: "The Murder at the Vicarage was first published in the UK by the Collins Crime Club in October 1930 and in the US by Dodd, Mead and Company later in the same year."
    },
    {
        title: "Murder on the Orient Express",
        year: 1933,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780007815562-L.jpg",
        description: "Murder on the Orient Express was first published in the United Kingdom by the Collins Crime Club on 1 January 1934 and in the United States by Dodd, Mead and Company later in the same year,  featuring Belgian detective Hercule Poirot."
    },
    {
        title: "The ABC Murders",
        year: 1936,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780062879721-L.jpg",
        description: "The A.B.C. Murders features her most famous character Hercule Poirot, along with Arthur Hastings and Chief Inspector Japp, as they contend with a series of killings by a mysterious murderer known only as 'A.B.C.'."
    },
    {
        title: "Death on the Nile",
        year: 1937,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780007815531-L.jpg",
        description: "Death on the Nile was first published in the UK by the Collins Crime Club on 1 November 1937 and in the US by Dodd, Mead and Company the following year."
    },
    {
        title: "And Then There Were None",
        year: 1939,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780007282319-L.jpg",
        description: "And Then There Were None, described by her as the most difficult of her books to write. It was first published in the United Kingdom by the Collins Crime Club on 6 November 1939, as Ten Little Niggers, after the minstrel song, which serves as a major plot point."
    },
    {
        title: "Evil Under the Sun",
        year: 1941,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780007815593-L.jpg",
        description: "Evil Under the Sun was first published in the UK by the Collins Crime Club in June 1941 and in the US by Dodd, Mead and Company in October of the same year."
    },
    {
        title: "The Body in the Library",
        year: 1942,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780008196530-L.jpg",
        description: "The Body in the Library was first published in the US by Dodd, Mead and Company in February 1942 and in UK by the Collins Crime Club in May of the same year."
    },
    {
        title: "Crooked House",
        year: 1949,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780008196349-L.jpg",
        description: "Crooked House was first published in the US by Dodd, Mead and Company in March 1949 and in the UK by the Collins Crime Club on 23 May of the same year."
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

    let caption;
    caption = document.createElement('div');
    caption.classList.add('carousel-caption', 'd-none', 'd-md-block');


    caption.innerHTML = `<h5>${book.title}</h5><p>${book.year}</p><p>${book.description}</p>`;

    carouselItem.appendChild(img);
    carouselItem.appendChild(caption);

    carouselItems.appendChild(carouselItem);
});
