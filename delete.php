<?php
$conn = new PDO("mysql:host=localhost;dbname=portail","root","");
if (isset($_GET['apprenant'])&& !empty($_GET['apprenant'])) {
  
     $insert = $conn->prepare("DELETE FROM apprenants WHERE id = ?");

    if($insert->execute([$_GET['apprenant']])){
        die (json_encode([ 'success'=> true, 'message'=> "Apprénant a été supprimer"]));
    }else{
        die(json_encode([ 'success'=> false, 'message'=> "Veuillez ressayer"]));
    }
   
    die();
}