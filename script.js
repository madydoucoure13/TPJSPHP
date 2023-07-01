var approw = document.getElementById("apprenantsRow");

async function getApprenant(parameter) {
 
    const response = await fetch("upload.php"+parameter)
    .then(function (res) {
         return res.json();
    }).then(function (data) {
        form.action += "?edit="+data.id;
        
         var inputs = form.querySelectorAll('input');
         var oldImage = document.createElement("input");
                oldImage.name = "oldimage";
            oldImage.value = data.photo;
            console.log(data.photo);
            form.appendChild(oldImage);
         var imgApp = document.createElement("img");
            imgApp.src = "uploads/"+data.photo;
            form.insertBefore(imgApp, form.children[0]);
         var inputMatricule = document.createElement('input');
            inputMatricule.setAttribute("readonly","true");
            inputMatricule.setAttribute("class","form-control mb-3");
            inputMatricule.setAttribute("value",data.matricule);
            inputMatricule.readonly;
            inputMatricule.name = "matricule";
            form.insertBefore(inputMatricule, form.children[1]);
        
            inputs[0].value = data.prenom;
            inputs[1].value = data.nom;
            inputs[2].value = data.age;
            inputs[3].value = data.date_naissance;
            inputs[4].value = data.email;
            inputs[5].value = data.telephone;
           inputs[6].filename = data.photo;
            inputs[6].required = false;
           inputs[7].value = data.promotion;
           inputs[8].value = data.annee_certification;
           inputs[inputs.length-1].value = "Modifier";
           
    })  
  
   
 }
async function getListApprenants(parameter = "?app=all") {
 
   const response = await fetch("upload.php"+parameter)
   .then(function (res) {
        return res.json();
   }).then(function (data) {
       for (let d = 0; d < data.length; d++) {
            var trTag = document.createElement("tr");
                trTag.onclick = openLink;
                trTag.setAttribute("data-link", "apprenant="+data[d].id)
                trTag.innerHTML = 
                `<td><img src="${'uploads/'+data[d].photo}"></td>
                <td>${data[d].matricule}</td>
                <td>${data[d].prenom}</td>
                <td>${data[d].nom}</td>
                <td>${data[d].age}</td>
                <td>${data[d].date_naissance}</td>
                <td>${data[d].email}</td>
                <td>${data[d].telephone}</td>
                <td>${data[d].promotion}</td>
                <td>${data[d].annee_certification}</td>`
            approw.appendChild(trTag);
        }
        console.log(data);
   })  
 
  
}
// fonction permettant d'aller la page ajout apprenant 
var openLink = function () {
    window.location.href = "add.html?"+this.dataset.link;
}
//getListApprenants();