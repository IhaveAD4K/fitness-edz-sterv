const tesztGyakorlat = new Gyakorlatok('Guggolás', 'Láb', 'Nehéz', 4, 10, 20, 60);


console.assert(tesztGyakorlat.getNev() === "Guggolás", "Hiba: A getNev() metódus nem jó nevet mentett el!");
console.assert(tesztGyakorlat.getIzomCsoport() === "Láb", "Hiba: A getIzomCsoport() metódus nem jó izomcsoportot mentett el!");
console.assert(tesztGyakorlat.getSzettekSzama() === 4, "Hiba:A getSzettekSzama() nem jó számot mentett el!");


tesztGyakorlat.setNev("Fekvenyomás");
console.assert(tesztGyakorlat.getNev() === "Fekvenyomás", "Hiba: A setNev() metódusban, nem változtatta meg a nevet!");


tesztGyakorlat.setPihenoIdo(100);


