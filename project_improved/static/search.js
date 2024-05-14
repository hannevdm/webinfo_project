var currentPage = 1;
const resultCountElem = document.getElementById("results-count");
const resultTotalElem = document.getElementById("results-total");
const loadMoreButton = document.getElementById("load-more");
var data;

let form = document.getElementById("search-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    ProcessForm()
});

loadMoreButton.addEventListener("click", () => {
    addResults(currentPage + 1, data);
});


function createResult(index, data){
    const template = document.getElementById("resultsTemplate");
    const resultsTemp = template.content.cloneNode(true);

    //Update container elements
    const bTitle = resultsTemp.querySelector(".book-title");
    bTitle.textContent = data.docs[index].title;
    const bAuthor = resultsTemp.querySelector(".author");
    bAuthor.textContent = 'Author: '+data.docs[index].author_name;
    const bSubj = resultsTemp.querySelector(".subject");
    bSubj.textContent = 'Subject: '+ data.docs[index].subject;
    const bLocation = resultsTemp.querySelector(".location");
    bLocation.textContent = 'Location: '+ data.docs[index].place;
    const bPubl = resultsTemp.querySelector(".publish-year");
    bPubl.textContent = 'First Publish Year: '+data.docs[index].first_publish_year;
    const bButton = resultsTemp.getElementById("interested");
    bButton.href = 'https://openlibrary.org'+data.docs[index].key;

    const booksOutput = document.getElementById('books-output');
    booksOutput.appendChild(resultsTemp);
}


async function ProcessForm() {
    document.getElementById('books-output').innerHTML = "";
    document.getElementById("error-message").innerHTML = "";
    let currentPage = 1;
    document.getElementById("results-count").innerHTML="";
    document.getElementById("results-total").innerHTML="";

    //show loading element
    document.getElementById("loader").style.display = "block";
    //hide load more button
    document.getElementById("result-actions").style.display = "none";

    data = await searchBooks();

    //hide loading element
    document.getElementById("loader").style.display = "none";

    addResults(currentPage,data);
    //show load more button
    document.getElementById("result-actions").style.display = "block";
}

function isInputProvided(elementId) {
    const element = document.getElementById(elementId);
    return element !== null && element !== undefined && element.value!== "";
}



function encodePublishYear(){
    let begin= document.getElementById("start_publ_year").value;
    let end= document.getElementById("end_publ_year").value;
    return `[${begin}+TO+${end}]`;
}



async function searchBooks() {
    // Build the base URL
    let url = 'http://openlibrary.org/search.json?q=';
    // Add parameters if provided
    url += 'author:("Agatha Christie")';
    if (isInputProvided('title')) {
        const t = document.getElementById("title").value;
        url += ' title:("'+t+'")';
    }
    if (isInputProvided('location')) {
        const l = document.getElementById("location").value;
        url += ' place:("' + l + '")';
    }
    const y = encodePublishYear();
    url += ' first_publish_year:' + y;


    try {
        // Fetch the data
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
    
        if (data.numFound === 0) {
            const err = document.getElementById("error-message");
            err.textContent = "No books found for your search.";
            return;
        }
    
        return data; // Return search results if found
      } catch (error) {
        // Handle any errors during API request or parsing
        console.error("Error fetching books:", error);
        const err = document.getElementById("error-message");
        err.textContent = "An error occurred while searching for books. Please try again later.";
        return null;
      }
}

const addResults = (pageIndex,data) => {


    const resultLimit = data.docs.length;
    resultTotalElem.innerHTML = resultLimit;
    const resultIncrease = 9;
    const pageCount = Math.ceil(resultLimit / resultIncrease);

    currentPage = pageIndex;
    handleButtonStatus(pageCount);
    const startRange = (pageIndex - 1) * resultIncrease;
    const endRange = pageIndex * resultIncrease;
        pageIndex * resultIncrease > resultLimit ? resultLimit : pageIndex * resultIncrease;
    resultCountElem.innerHTML = endRange;
    for (let i = startRange + 1; i <= endRange; i++) {
        createResult(i, data);
    }
};

const handleButtonStatus = (pageCount) => {
    if (pageCount === currentPage) {
        loadMoreButton.classList.add("disabled");
        loadMoreButton.setAttribute("disabled", true);
    }
};






