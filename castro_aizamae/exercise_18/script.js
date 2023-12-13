const animeTable = document.querySelector("#crud_form");

document.querySelector("#crud_form").addEventListener("submit", function (event) 
{
    event.preventDefault();     
    submitForm(); 
});

document.getElementById('update').addEventListener('click', function (event) {
    event.preventDefault(); 
    submitUpdate();    
})

function getAnimeDetails() {

    fetch("https://likha.website/castro_exercise_18/anime.php", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: 
            ${response.statusText}`);
        }        
        return response.json();
    })
    .then(data => {        
        const tableBody = document.getElementById("table_body");
        
        data.forEach(anime => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${anime.id}</td>
            <td>${anime.anime_name }</td>
            <td>${anime.genre }</td>
            <td>${anime.author_name }</td>
            <td>${anime.release_date }</td>
            <td>${anime.rating }</td>`;
            
            const actionCell = document.createElement("td");
            
            const updateButton = document.createElement("button");
            updateButton.textContent = "Update";
            updateButton.addEventListener("click", () => updateAnime(anime)); 
            actionCell.appendChild(updateButton);
            
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => deleteAnime(anime.id)); 
            actionCell.appendChild(deleteButton);
            row.appendChild(actionCell);

            
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

}

getAnimeDetails ()

function submitForm() {    
    const animeName = document.querySelector("#anime_name").value;
    const genre = document.querySelector("#genre").value;
    const authorName = document.querySelector("#author_name").value;
    const releaseDate = document.querySelector("#release_date").value;
    const rating = document.querySelector("#rating").value;
    console.log(animeName);
    fetch("https://likha.website/castro_exercise_18/anime.php",{
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: `anime_name=${animeName}&genre=${genre}&author_name=
            ${authorName}
        &release_date=${releaseDate}&rating=${rating}`,
    })
    .then((response) => response.text())
    .then((responseText) => {
        alert(responseText);
        location.reload()
    })
    .catch(error => {
        console.error('Error inserting anime:', error);
    });   
}

function deleteAnime(id) {     
    fetch("https://likha.website/castro_exercise_18/anime.php", {
        method: 'DELETE',
        headers: {            
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: `id=${id}`,
    })
    .then((response) => response.text())
    .then(responseText => {
        alert(responseText); 
        location.reload()
    })
    .catch(error => {
        console.error('Error deleting anime:', error);
    });
   
}

function updateAnime(anime) {    
    const updateBtn = document.getElementById('update');
    const saveBtn = document.getElementById('save');

    updateBtn.style.display = 'block'
    saveBtn.style.display = 'none'

    document.getElementById("anime_id").value = anime.id;
    document.getElementById("anime_name").value = anime.anime_name;
    document.getElementById("genre").value = anime.genre;
    document.getElementById("author_name").value = anime.author_name;
    document.getElementById("release_date").value = anime.release_date;
    document.getElementById("rating").value = anime.rating;
}

function submitUpdate() {
    const animeId = document.getElementById("anime_id").value
    const animeName = document.querySelector("#anime_name").value;
    const genre = document.querySelector("#genre").value;
    const authorName = document.querySelector("#author_name").value;
    const releaseDate = document.querySelector("#release_date").value;
    const rating = document.querySelector("#rating").value;

    fetch("https://likha.website/castro_exercise_18/anime.php", {
        method: 'PATCH',   
        headers: {            
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: `id=${animeId}&anime_name=${animeName}&genre=${genre}
        &author_name=${authorName}&release_date=${releaseDate}
        &rating=${rating}`,     
    }) 
    .then((response) => response.text())
    .then(responseText => {
        alert(responseText); 
        location.reload()
    })
    .catch(error => {
        console.error('Error updating anime:', error);
    });
}
