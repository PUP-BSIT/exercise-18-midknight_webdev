<?php

function updateAnime ($servername, $username, $password, $dbname, $data) {
    $connect = mysqli_connect($servername, $username, $password, $dbname);
    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }

    foreach ($data as $key => $value) {
        $data[$key] = mysqli_real_escape_string($connect, $value);
    }

    $sql = "UPDATE anime
        SET anime_name = '$data[anime_name]', genre = '$data[genre]', 
        author_name = '$data[author_name]',release_date = '$data[release_date]', 
        rating = '$data[rating]'
        WHERE id = '$data[id]'";

    if (!$connect->query($sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connect);
    } 

    echo "Updated successfully!";
    mysqli_close($connect);
}


?>
