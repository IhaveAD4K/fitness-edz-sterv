var edzsesek = [];
const sikeresmodal = document.getElementById('sikeresmodal');
function openNav() {
     document.getElementById("mySidenav").style.width = "250px"; 
} 
     
function closeNav() { 
    document.getElementById("mySidenav").style.width = "0"; 
} 
function kiir() {
  var listaidk = document.querySelector(".listaidk");
  listaidk.innerHTML = "";
  for (let i = 0; i < edzsesek.length; i++) {
    listaidk.innerHTML += `>
                            ${edzsesek[i].getNev()}
                            ${edzsesek[i].getIzomCsoport()}
                            ${edzsesek[i].getNehezseg()}
                            ${edzsesek[i].getSzettekSzama()}


                           `
  }
}
document.querySelector(".mentes").addEventListener('click', () => {
  var nev = document.querySelector(".nev");
  var izomCsoport = document.querySelector("#izomCsoport");
  var nehezseg = document.querySelector("#nehezseg");
    var szettekSzama = document.querySelector("#szettekSzama");
  var gy = new Gyakorlatok(nev.value, izomCsoport.value, nehezseg.value, szettekSzama.value);
  edzsesek.push(gy);
  nev.value = izomCsoport.value = nehezseg.value = szettekSzama.value =  "";
  nehezseg.value = "Válasszon!";
  kiir();
});