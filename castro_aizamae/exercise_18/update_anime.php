<?php

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'anime_database';

$connect = mysqli_connect($servername, $username, $password, $dbname);
    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
    parse_str(file_get_contents('php://input'), $_PATCH);
    $id = $_PATCH["id"];
    $animeName = $_PATCH['anime_name'];
    $genre = $_PATCH['genre'];
    $authorName = $_PATCH['author_name'];
    $releaseDate = $_PATCH['release_date'];
    $rating = $_PATCH['rating'];

    $sql = "UPDATE anime
        SET anime_name = '$anime_name', genre = '$genre', author_name = 
        '$author_name',
        release_date = '$release_date', rating = '$rating'
        WHERE id = $id";

    if (!$connect->query($sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connect);
    } 

    echo "Updated successfully!";
    mysqli_close($connect);

    ?>
