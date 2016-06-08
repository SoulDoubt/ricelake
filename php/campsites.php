<?php
require_once 'dbinfo.php';  // You know those quotes that are like, double quotes? Changed them as well.
require_once 'helpers.php';


// check for ajax before we do anything;
if (!is_ajax())
{
   die("Not Ajax. Fuck off");
}
// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = 'SELECT * FROM Campsites INNER JOIN ServiceTypes ON Campsites.ServiceTypeID = ServiceTypes.ID';

//$results = $conn->query($sql);

if (! $result = $conn->query($sql)) {
	die('There was an error running the query [' . $conn->error . ']');
}

$rows = array();

while ($row = $result->fetch_assoc()){
	$rows[] = $row;	
}

$conn->close();


echo json_encode($rows);

?>
