class Profil{
    #nev;
    #email;
    #jelszo;

   constructor(nev, email, jelszo) {
    this.#nev = nev;
    this.#email = email;
    this.#jelszo = jelszo;
}
    setNev(nev) {
    console.log("Kapott név:", nev);
    console.log("Hossz:", nev.length);

    if (nev.length >= 2 && nev.length < 25) {
        this.#nev = nev;
    } else {
        document.getElementById("toastSzoveg").textContent =
            "Hibás név! 2 és 24 karakter közötti nevet adjon meg!";

        bootstrap.Toast.getOrCreateInstance(
            document.getElementById("uzenetToast")
        ).show();
    }
}

    setEmail(email){
        this.#email = email;
    }

    setJelszo(jelszo){

    }

    getNev(){
        return this.#nev;
    }

    getEmail(){
        return this.#email;
    }

    getJelszo(){
        return this.#jelszo;
    }
    
    ellenorzes() {
  
}

}

let profil = new Profil("", "", "");