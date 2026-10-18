const tesztGyakorlat = new Gyakorlatok('Guggolás', 'Láb', 'Nehéz', 4, 10, 20, 60);


console.assert(tesztGyakorlat.getNev() === "Guggolás", "Hiba: Nem jó nevet mentett el!");
console.assert(tesztGyakorlat.getIzomCsoport() === "Láb", "Hiba: Nem jó izomcsoportot mentett el!");
console.assert(tesztGyakorlat.getSzettekSzama() === 4, "Hiba: Nem jó szetszámot mentett el!");
