const filter = document.getElementById("filter");
const result = document.getElementById("result");
const listItem = [];

result.style.display = "none";

getData();

filter.addEventListener("input", function(e) {
    filterData( e.target.value);
});

function getData() {
    
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {

        let results = this.response.results;

        // Clear result
        result.innerHTML = '';

        results.forEach(user => {
            const li = document.createElement('li')

            listItem.push(li)
    
            li.innerHTML = `
                <img src="${user.picture.large}" alt="${user.name.first}">
                <div class="user-info">
                    <h4>${user.name.first} ${user.name.last}</h4>
                    <p>${user.location.city}, ${user.location.country}</p>
                </div>
            `
    
            result.appendChild(li);
        });
    }

    xhr.responseType = "json";
    xhr.open("GET", "https://randomuser.me/api?results=50");
    xhr.send();
}

function filterData(searchTerm) {
    listItem.forEach(item => {

        result.style.display = "block";

        if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
            item.classList.remove('hide')
        } else {
            item.classList.add('hide')
        }
    })
}