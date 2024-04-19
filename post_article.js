document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("create-article-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(form);

        const imageFile = formData.get('image');
        let image = null;

        if (imageFile && imageFile.size > 0) {
            const reader = new FileReader();
            reader.onloadend = function() {
                image = reader.result;
                sendPostRequest();
            };
            reader.readAsDataURL(imageFile);
        } else {
            sendPostRequest();
        }

        function sendPostRequest() {
            const jsonData = {
                title: formData.get('title') || '',
                text: formData.get('text') || '',
                image: image
            };

            const jsonDataString = JSON.stringify(jsonData);

            fetch('http://127.0.0.1:8000/wikipage/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonDataString
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create article');
                }
                return response.json();
            })
            .then(data => {
                alert('Article created successfully!');
                window.location.href = 'articles.html';
            })
            .catch(error => {
                console.error("Error creating article:", error);
                alert('Failed to create article');
            });
        }
    });

    const textarea = document.getElementById("text");
    textarea.addEventListener("input", function() {
        adjustTextareaHeight(this);
    });

    function adjustTextareaHeight(element) {
        element.style.height = 'auto';
        element.style.height = element.scrollHeight + 'px';
    }
});
