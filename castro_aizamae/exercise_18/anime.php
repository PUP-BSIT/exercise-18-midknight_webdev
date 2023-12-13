<?php

include 'insert_anime.php';
include 'update_anime.php';
include 'delete_anime.php';
include 'get_anime_details.php';

$servername = "localhost";
$username = "u247876310_midknight";
$password = "~G5yW|W^Nf";
$dbname = "u247876310_exercise_18";

header('Access-Control-Allow-Origin: http://localhost');
header('Access-Control-Allow-Methods: GET, POST, DELETE, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type'); 

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $data = [
        'anime_name' => $_POST['anime_name'],
        'genre' => $_POST['genre'],
        'author_name' => $_POST['author_name'],
        'release_date' => $_POST['release_date'],
        'rating' => $_POST['rating']
    ];
        
    insertAnime($servername, $username, $password, $dbname, $data);

}
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    getAnimeDetails($servername, $username, $password, $dbname);
}
if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    parse_str(file_get_contents('php://input'), $_DELETE);
    $id = $_DELETE["id"];
    deleteAnime($servername, $username, $password, $dbname, $id);
}
if ($_SERVER["REQUEST_METHOD"] == "PATCH") {

    parse_str(file_get_contents('php://input'), $_PATCH);

    $data = [
        'id' => $_PATCH['id'],
        'anime_name' => $_PATCH['anime_name'],
        'genre' => $_PATCH['genre'],
        'author_name' => $_PATCH['author_name'],
        'release_date' => $_PATCH['release_date'],
        'rating' => $_PATCH['rating']
    ];

    updateAnime ($servername, $username, $password, $dbname, $data);    
}

?>