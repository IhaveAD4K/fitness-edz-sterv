var profil = new Profil("Zsombor", "borkazsombor2008@gmail.com", "12345678")

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


function filterSelection(c) {
    const cards = document.querySelectorAll(".filterDiv");

    cards.forEach(function (card) {
        if (c === "all" || card.classList.contains(c)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });

    if (gomb) {
        document.querySelectorAll("#myBtnContainer .btn")
            .forEach(function (gombElem) {
                gombElem.classList.remove("active");
            });

        gomb.classList.add("active");
    }
}


let sulyCimsor = document.getElementById("weightTitle");

let kgElem = document.getElementById("kg");
let lbElem = document.getElementById("lb");

kgElem.addEventListener("click", function () {
    sulyCimsor.textContent = "Súly mértékegysége [kg]";
});

lbElem.addEventListener("click", function () {
    sulyCimsor.textContent = "Súly mértékegysége [lbs]";
});