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

document.addEventListener("DOMContentLoaded", function () {
    filterSelection("all");
});

function belepes() {

    let nev = document.getElementById("bejelentkezve").value;

    if (nev.trim() !== "") {

        document.getElementById("belepettNev").textContent = nev.trim();

        const modalElem = document.getElementById("bejelentkezve");
        const modal = bootstrap.Modal.getInstance(modalElem);

        if (modal) {
            modal.hide();
        }
    } else {
        alert("Kérlek, add meg a neved!");
    }
}