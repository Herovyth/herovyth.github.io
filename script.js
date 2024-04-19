document.addEventListener("DOMContentLoaded", function() {
    fetchWikiPage(); 

    function fetchWikiPage() {
        fetch("http://127.0.0.1:8000/wikipage/1", {
            method: 'GET' 
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayWikiPage(data);
        })
        .catch(error => {
            console.error("Error fetching wiki page:", error);
        });
    }

    function displayWikiPage(wikiPage) {
        const mainContent = document.querySelector("#main-content .wiki-article");
        const imageUrl = `http://127.0.0.1:8000${wikiPage.image}`;
        mainContent.innerHTML = `
            <h1>${wikiPage.title}</h1>
            <img src="${imageUrl}" alt="${wikiPage.title}">
            <p>${wikiPage.text}</p>
        `;

        const editButton = document.getElementById("edit-article-btn");
        editButton.style.display = "block";
    }
    
    const editButton = document.getElementById("edit-article-btn");
    editButton.addEventListener("click", function() {
        window.location.href = 'edit_article.html';
    });
});
