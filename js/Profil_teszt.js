console.assert(profil.setNev("János") === true,"Hiba, érvényes név elutasítva!");
console.assert(profil.getNev() === "János","Hiba, a név értéke nem megfelelő!");
console.assert(profil.setNev("Al") === false,"Hiba, túl rövid név elfogadva!");

console.assert(profil.setNev("A".repeat(25)) === false,"HIBA: A túl hosszú név elfogadva!");
console.assert(profil.setNev("   János   ") === true && profil.getNev() === "János","Hiba, a név elején és végén lévő szóközök kezelése hibás!");

console.assert(profil.setEmail("janos@gmail.com") === true,"HIBA: Érvényes email elutasítva!");
console.assert(profil.getEmail() === "janos@gmail.com","HIBA: Az email értéke nem megfelelő!");
console.assert(profil.setEmail("janosgmail.com") === false,"Hiba, a @ nélküli email elfogadva!");
console.assert(profil.setEmail("janos@gmailcom") === false,"HIBA! A pont nélküli email elfogadva!");


console.assert(profil.setJelszo("titkos123") === true,"Hiba, érvényes jelszó elutasítva!");
console.assert(profil.getJelszo() === "titkos123","Hiba, a jelszó értéke nem megfelelő!");
console.assert(profil.setJelszo("1234567") === false,"Hiba a 8 karakternél rövidebb jelszó elfogadva!");
console.assert(profil.setJelszo("12345678") === true,"Hiba, a pontosan 8 karakteres jelszó elutasítva!");
