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
            oldImage.type = "hidden";
            console.log(data.photo);
            form.appendChild(oldImage);
         var imgApp = document.createElement("img");
            imgApp.src = "uploads/"+data.photo;
            imgApp.setAttribute("onerror","getDefaultImg(this)");
            form.parentNode.insertBefore(imgApp, form.parentNode.children[0]);
         var  inputMatricule = document.createElement('input');
            inputMatricule.setAttribute("readonly","true");
            inputMatricule.setAttribute("class","form-control mb-3");
            inputMatricule.setAttribute("value",data.matricule);
            inputMatricule.readonly;
            inputMatricule.name = "matricule";
            form.insertBefore(inputMatricule, form.children[0]);        
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
async function getListApprenants(parameter = "?index=0") {
 
   const response = await fetch("upload.php"+parameter)
   .then(function (res) {
        return res.json();
   }).then(function (data) {
       for (let d = 0; d < data.length; d++) {
            var trTag = document.createElement("tr");
                trTag.onclick = openLink;
                trTag.setAttribute("data-link", "apprenant="+data[d].id)
                trTag.innerHTML = 
                `<td onclick="openLink(this)"><img onerror="getDefaultImg(this)" src="${'uploads/'+data[d].photo}"></td>
                <td onclick="openLink(this)">${data[d].matricule}</td>
                <td onclick="openLink(this)">${data[d].prenom}</td>
                <td onclick="openLink(this)">${data[d].nom}</td>
                <td class="hide" onclick="openLink(this)">${data[d].age}</td>
                <td class="hide" onclick="openLink(this)">${data[d].date_naissance}</td>
                <td class="hide" onclick="openLink(this)">${data[d].email}</td>
                <td class="hide" onclick="openLink(this)">${data[d].telephone}</td>
                <td class="hide" onclick="openLink(this)">${data[d].promotion}</td>
                <td class="hide" onclick="openLink(this)">${data[d].annee_certification}</td>
                <td><a href="add.html?apprenant=${data[d].id}">&#9998;</a> <a onclick="action(this,event)" class="remove" href="delete.php?apprenant=${data[d].id}">&#128465;</a></td>`
            approw.appendChild(trTag);
        }
        console.log(data);
   })  
}
// fonction permettant d'aller la page ajout apprenant 
var openLink = function (me) {
    window.location.href = "add.html?view=1&"+me.parentNode.dataset.link;
}

async function action(me,e) {
    e.preventDefault();
    var rowI = me.closest('tr').rowIndex;
    var tableParent = me.closest('table');
    var tdMessage = document.createElement('td');
        tdMessage.colSpan = me.closest('tr').querySelectorAll('td').length;
    var trMessage = tableParent.insertRow(rowI);
        trMessage.appendChild(tdMessage);
    const response = await fetch(me.href)
    .then(function (res) {
         return res.json();
    }).then(function (data) {
        if(data.success){
           tdMessage.innerHTML = `
            <div class="alert alert-primary" role="alert">
            ${data.message}
            </div>
            `;
            me.closest('tr').remove();
            fadeout(trMessage);
        }else{
            tdMessage.innerHTML = `
            <div class="alert alert-warning" role="alert">
            ${data.message}
            </div>
            `;
            fadeout(trMessage);
        }
        console.log(data);
    })  

}
function fadeout(elem) {
    var fade= elem;// document.getElementById("body");
      
    var intervalID = setInterval(function () {
  
    if (!fade.style.opacity) {
        fade.style.opacity = 1;
    }  
    if (fade.style.opacity > 0) {
        fade.style.opacity -= 0.1;
    }
  
    else {
        elem.remove();
        clearInterval(intervalID);
    }
  
    }, 200);
}

function getDefaultImg(me){
    console.log(window.location);
    me.src = "uploads/default.png";
}
//getListApprenants();