class Profil {
    #nev;
    #email;
    #jelszo;

    constructor(nev, email, jelszo) {
        this.#nev = nev;
        this.#email = email;
        this.#jelszo = jelszo;
    }

    // Getterek
    getNev() {
        return this.#nev;
    }

    getEmail() {
        return this.#email;
    }

    getJelszo() {
        return this.#jelszo;
    }

    // Setterek
    setNev(nev) {
        this.#nev = nev;
    }

    setEmail(email) {
        this.#email = email;
    }

    setJelszo(jelszo) {
        this.#jelszo = jelszo;
    }

    // Input ellenőrzés
    ellenorzes() {
        if (this.#nev.value == "" ||
            this.#email.value == "" ||
            this.#jelszo.value == "") {
            alert("Tölts ki minden mezőt!");
        } else if (!this.#email.checkValidity()) {
            alert("Hibás email cím!");
        } else if (this.#jelszo.value.length < 8) {
            alert("A jelszó legalább 8 karakter legyen!");
        } else {
            alert("Sikeres mentés!");
        }
    }
}

let profil = new Profil(
    document.getElementById("bejelentkezve"),
    document.getElementById("email"),
    document.getElementById("edzoimegnevezes")
);