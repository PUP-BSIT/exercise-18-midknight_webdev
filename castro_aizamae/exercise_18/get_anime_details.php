<?php

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'anime_database';

$connect = mysqli_connect($servername, $username, $password, $dbname);

    if (!$connect) {
        echo "Not Connected";
        return;
    };

    $sql = "SELECT * FROM anime";

    $result = $connect->query($sql);

    if (!$result) {
        echo "Error: " . $sql . "<br>" . $connect->error;
    } else {

        $animeData = array();

        while ($row = $result->fetch_assoc()) {
            $animeData[] = $row;
        }
        
        header('Content-Type: application/json');
        echo json_encode($animeData);
    }

    mysqli_close($connect);
