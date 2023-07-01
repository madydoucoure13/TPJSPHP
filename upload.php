<?php
$conn = new PDO("mysql:host=localhost;dbname=portail","root","");;

if (isset($_GET['apprenant'])&& !empty($_GET['apprenant'])) {
        // Récupérer un seul apprenant à travers son id
        $req = $conn->prepare("SELECT * FROM apprenants where id =?"); //.$req;

        $req->execute([$_GET['apprenant']]);
        $data = $req->fetch(PDO::FETCH_OBJ);
        
        echo json_encode($data);
        die();
}

  
if (isset($_GET['edit'])&& !empty($_GET['edit']) && isset($_POST) && !empty($_POST)) {
    extract($_POST);
    $target = "uploads/";
  
   // $matricule = $promotion.generer_matricule(4);
   if(isset($_FILES['photo']) && !empty($_FILES['photo']))
    $photo = $matricule.".".strtolower(pathinfo($_FILES['photo']['name'],PATHINFO_EXTENSION));
    else
    $photo = $oldimage;

    
     $insert = $conn->prepare("UPDATE apprenants Set nom = ?, prenom = ?, age = ?,
     date_naissance = ?, email = ?, telephone = ?, promotion = ?, photo = ?, annee_certification = ?
     where id = ?");

    if($insert->execute([$nom,$prenom,$age,$date_naissance,$email,$telephpone,$promotion,$photo,
    $annee,$_GET['edit']])){
        move_uploaded_file($_FILES['photo']['tmp_name'],"uploads/".$photo);
        header("location:index.html");
    }else{
        echo "Erreur dans les données";
    }
   
    die();
}
$req = "order by id DESC LIMIT 10 ";
if(isset($_GET['app']) && $_GET['app'] == "all"){
    // ajouter d'un requette qui nous permettre d'afficher tous les apprenants ;
    $req = "";
}

    // Récupérer tous les apprenants
    $req = $conn->prepare("SELECT * FROM apprenants order by id desc "); //.$req;

    $req->execute();
    $data = $req->fetchAll(PDO::FETCH_OBJ);
    
    echo json_encode($data);
?>

<?php
  
    if (isset($_POST) && !empty($_POST)) {
        extract($_POST);
        $target = "uploads/";
        var_dump($_FILES['photo']);
        $matricule = $promotion.generer_matricule(4);
        $photo = $matricule.".".strtolower(pathinfo($_FILES['photo']['name'],PATHINFO_EXTENSION));
        
    // Connexion à la base de données
        $connex =new PDO("mysql:host=localhost;dbname=portail","root","");
   
         $insert = $connex->prepare("INSERT INTO apprenants(matricule, nom, prenom, age,
         date_naissance, email, telephone, promotion, photo, annee_certification)
         VALUES (?,?,?,?,?,?,?,?,?,?)");

        if($insert->execute([$matricule,$nom,$prenom,$age,$date_naissance,$email,$telephpone,$promotion,
        $photo,$annee])){
            move_uploaded_file($_FILES['photo']['tmp_name'],"uploads/".$photo);
            header("location:index.html");
        }else{
            echo "Erreur dans les données";
        }
       
    }

    function getApprenantMatricule(){
        
    }
    function generer_matricule($longueur) {
        $caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $matricule = '';
        $maxIndex = strlen($caracteres) - 1;
      
        for ($i = 0; $i < $longueur; $i++) {
            $randomIndex = rand(0, $maxIndex);
            $matricule .= $caracteres[$randomIndex];
        }
      
        return $matricule;
      }
    //  var_dump("P1".generer_matricule(4));