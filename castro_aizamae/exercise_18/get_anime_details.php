<?php

function getAnimeDetails ($servername, $username, $password, $dbname) {

    $connect = mysqli_connect($servername, $username, $password, $dbname);

    if (!$connect) return;
    
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
}

?>
