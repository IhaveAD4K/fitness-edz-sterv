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
    if (nev.length < 25 && nev.length > 2) {
        this.#nev = nev;
    } else {
        document.getElementById("toastSzoveg").textContent =
            "Hibás név! 2 és 25 karakter közé eső nevet adjon meg! ";

        new bootstrap.Toast(
            document.getElementById("uzenetToast")
        ).show();

        return;
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
    let nev = document.getElementById("bejelentkezve").value;
    this.setNev(nev);
}

}

let profil = new Profil("", "", "");