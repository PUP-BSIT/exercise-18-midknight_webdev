<?php

function insertAnime ($servername, $username, $password, $dbname, $data) {
    
    $connect = mysqli_connect($servername, $username, $password, $dbname);
    if (!$connect) return;
        
    foreach ($data as $key => $value) {
        $data[$key] = mysqli_real_escape_string($connect, $value);
    }
    
    $sql = "INSERT INTO anime (anime_name, genre, author_name, release_date, 
                rating) 
            VALUES ('$data[anime_name]', '$data[genre]', '$data[author_name]', 
                '$data[release_date]', '$data[rating]')";
   
    if (!$connect->query($sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connect);
    } 

    echo "New record created successfully";
    mysqli_close($connect);
}
?>