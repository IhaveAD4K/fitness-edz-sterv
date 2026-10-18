console.assert(profil.setNev("János") === true,"Hiba, érvényes név elutasítva!");
console.assert(tesztProfil.getNev() === "János","Hiba, a név értéke nem megfelelő!");
console.assert(tesztProfil.setNev("Al") === false,"Hiba, túl rövid név elfogadva!");

console.assert(tesztProfil.setNev("A".repeat(25)) === false,"HIBA: A túl hosszú név elfogadva!");
console.assert(tesztProfil.setNev("   János   ") === true && tesztProfil.getNev() === "János","Hiba, a név elején és végén lévő szóközök kezelése hibás!");

console.assert(tesztProfil.setEmail("janos@gmail.com") === true,"HIBA: Érvényes email elutasítva!");
console.assert(tesztProfil.getEmail() === "janos@gmail.com","HIBA: Az email értéke nem megfelelő!");
console.assert(tesztProfil.setEmail("janosgmail.com") === false,"Hiba, a @ nélküli email elfogadva!");
console.assert(tesztProfil.setEmail("janos@gmailcom") === false,"HIBA! A pont nélküli email elfogadva!");


console.assert(tesztProfil.setJelszo("titkos123") === true,"Hiba, érvényes jelszó elutasítva!");
console.assert(tesztProfil.getJelszo() === "titkos123","Hiba, a jelszó értéke nem megfelelő!");
console.assert(tesztProfil.setJelszo("1234567") === false,"Hiba a 8 karakternél rövidebb jelszó elfogadva!");
console.assert(tesztProfil.setJelszo("12345678") === true,"Hiba, a pontosan 8 karakteres jelszó elutasítva!");
