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