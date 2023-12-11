<?php

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'anime_database';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $connect = mysqli_connect($servername, $username, $password, $dbname);

    if (!$connect) return;

    $animeName = $_POST['anime_name'];
    $genre = $_POST['genre'];
    $authorName = $_POST['author_name'];
    $releaseDate = $_POST['release_date'];
    $rating = $_POST['rating'];

    $sql = "INSERT INTO anime (anime_name, genre, author_name, release_date, 
        rating) 
    VALUES ('$anime_name', '$genre', '$author_name', '$release_date', '$rating')";

    if (!$connect->query($sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connect);
    } 
    
    echo "New record created successfully";
    mysqli_close($connect);
}