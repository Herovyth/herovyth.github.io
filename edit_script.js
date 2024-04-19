document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("edit-article-form");
    const textarea = document.getElementById("content");

    fetch(`http://127.0.0.1:8000/wikipage/1/`)
        .then(response => response.json())
        .then(article => {
            document.getElementById("title").value = article.title;
            textarea.value = article.text; 
            adjustTextareaHeight(textarea); 
        })
        .catch(error => {
            console.error("Error fetching article data:", error);
        });

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const title = formData.get('title');
        const content = formData.get('content');

        fetch(`http://127.0.0.1:8000/wikipage/1/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, text: content })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update article');
            }
            alert('Article updated successfully!');
            window.location.href = 'articles.html';
        })
        .catch(error => {
            console.error("Error updating article:", error);
            alert('Failed to update article');
        });
    });

    textarea.addEventListener("input", function() {
        adjustTextareaHeight(this);
    });

    function adjustTextareaHeight(element) {
        element.style.height = 'auto'; 
        element.style.height = element.scrollHeight + 'px'; 
    }
});
