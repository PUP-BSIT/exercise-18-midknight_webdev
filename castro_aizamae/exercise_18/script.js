const animeTable = document.querySelector("#crud_form");

document.querySelector("#crud_form").addEventListener("submit", function (event) {
    event.preventDefault(); 
    submitForm(); 
});

document.getElementById('update').addEventListener('click', function (event) {
    event.preventDefault(); 
    submitUpdate();
})

function getAnimeDetails() {

    fetch("./get_anime_details.php")  
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
    const animeName = document.querySelector("#animeName").value;
    const genre = document.querySelector("#genre").value;
    const authorName = document.querySelector("#authorName").value;
    const releaseDate = document.querySelector("#releaseDate").value;
    const rating = document.querySelector("#rating").value;
    
    fetch("./insert_anime.php",{
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: `animeName=${animeName}&genre=${genre}&authorName=${authorName}
        &releaseDate=${releaseDate}&rating=${rating}`,
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
    fetch('./delete_anime.php', {
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

    document.getElementById("animeId").value = anime.id;
    document.getElementById("animeName").value = anime.anime_name;
    document.getElementById("genre").value = anime.genre;
    document.getElementById("authorName").value = anime.author_name;
    document.getElementById("releaseDate").value = anime.release_date;
    document.getElementById("rating").value = anime.rating;
}

function submitUpdate() {
    const animeId = document.getElementById("animeId").value
    const animeName = document.querySelector("#animeName").value;
    const genre = document.querySelector("#genre").value;
    const authorName = document.querySelector("#authorName").value;
    const releaseDate = document.querySelector("#releaseDate").value;
    const rating = document.querySelector("#rating").value;

    fetch(`./update_anime.php`, {
        method: 'PATCH',   
        headers: {            
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: `id=${animeId}&animeName=${animeName}&genre=${genre}
        &authorName=${authorName}&releaseDate=${releaseDate}
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


