<?php
include 'db.php';

if (!empty($_GET['author'])) {
    $searchAuthor = $_GET['author'];
    $dbFilter = [];
    foreach ($database as $cd) {
        if ($searchAuthor == $cd['author']) {
            $dbFilter[] = $cd;
        }
    }
    $database = $dbFilter;
}

header('Content-Type: application/json');
echo json_encode($database);