var edzsesek = [];
const sikeresmodal = document.getElementById('sikeresmodal');
function openNav() {
     document.getElementById("mySidenav").style.width = "250px"; 
} 
     
function closeNav() { 
    document.getElementById("mySidenav").style.width = "0"; 
} 

function kiir(){
    var e = document.querySelector(".e");
    e.innerHTML="";
    for(let i =0; i< edzsesek.length; i++ ){
        e.innerHTML+=``;
    }
}

document.querySelector(".mentes").addEventListener("click", ()=>{
       var nev = document.querySelector(".nev");
    var izomCsoport = document.querySelector(".izomCsoport");
    var nehezseg = document.querySelector(".nehezseg");
     var szettekSzama = document.querySelector(".szettekSzama");
    var ismetlesekSzama = document.querySelector(".ismetlesekSzama");
    var pihenoIdo = document.querySelector(".pihenoIdo");
    var suly = document.querySelector(".suly")
    var gy = new Gyakorlatok(nev.value, izomCsoport.value, nehezseg.value, parseInt(szettekSzama).value, parseInt(ismetlesekSzama).value, parseInt(pihenoIdo).value, parseInt(suly).value);

    nev.value = izomCsoport.value = nehezseg.value = parseInt(szettekSzama).value = parseInt(ismetlesekSzama).value = parseInt(pihenoIdo).value = parseInt(suly).value = "";
    edzsesek.push(gy);
    kiir();
  
});
/*
var nev = document.querySelector(".nev");
    var izomCsoport = document.querySelector(".izomCsoport");
    var nehezseg = document.querySelector(".nehezseg");
     var szettekSzama = document.querySelector(".szettekSzama");
    var ismetlesekSzama = document.querySelector(".ismetlesekSzama");
    var pihenoIdo = document.querySelector(".pihenoIdo");
    var suly = document.querySelector(".suly")
    var gyakorlatokForm = document.querySelector(".gyakorlatokform")
    
    gyakorlatokForm.addEventListener('.mentes', function(event){
        event.preventDefault();
        if(gyakorlatokForm.ariaValueMax.length <1) return;

        gyakorlatokForm.innerHTML+= '<li>' + nev.value + '</li>'
                                        '<li>' + izomCsoport.value + '</li>'
                                        '<li>' + nehezseg.value + '</li>'
                                        '<li>' + szettekSzama.value + '</li>'
                                        '<li>' + ismetlesekSzama.value + '</li>'
                                        '<li>' + pihenoIdo.value + '</li>'
                                        '<li>' + suly.value + '</li>';
                                        gyakorlatokForm.value = "";
                                        
    }. false);

var mentett = localStorage.getItem('gyakorlatokForm');
if(saved){
    gyakorlatokForm.innerHTML = saved;
}

*/