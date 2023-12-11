<?php

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'anime_database';

$connect = mysqli_connect($servername, $username, $password, $dbname);

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }

    parse_str(file_get_contents('php://input'), $_DELETE);
    $id = $_DELETE["id"];

    $sql = "DELETE FROM anime WHERE id = '$id'";

    if (!$connect->query($sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connect);
    } 

    echo 'Deleted succesfully';
    mysqli_close($connect);

    ?>
