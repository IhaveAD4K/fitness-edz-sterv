class Profil {
    #nev;
    #email;
    #jelszo;

    constructor(nev, email, jelszo) {
        this.#nev = nev;
        this.#email = email;
        this.#jelszo = jelszo;
    }


    setNev(nev) {
        if (nev.trim().length < 3 || nev.trim().length >= 25) {
            return false;
        }
        this.#nev = nev.trim();
        return true;
    }

    setEmail(email) {
        if (!email.includes("@") || !email.includes(".")) {
            return false;
        }
        this.#email = email;
        return true;
    }

    setJelszo(jelszo) {
        if (jelszo.length < 8) {
            return false;
        }
        this.#jelszo = jelszo;
        return true;
    }

    getNev() {
        return this.#nev;
    }

    getEmail() {
        return this.#email;
    }
    getJelszo() {
        return this.#jelszo;
    }


    mutatUzenet(szoveg, sikeres = false) {
        let toastElem = document.querySelector("#uzenetToast");
        document.querySelector("#toastSzoveg").textContent = szoveg;

        if (sikeres) {
            toastElem.classList.remove("text-bg-danger");
            toastElem.classList.add("text-bg-success");
        } else {
            toastElem.classList.remove("text-bg-success");
            toastElem.classList.add("text-bg-danger");
        }

        new bootstrap.Toast(toastElem).show();
    }


    ellenorzes() {

        let urlapNev = document.querySelector("#bejelentkezve").value;
        let urlapEmail = document.querySelector("#email").value;
        let urlapJelszo = document.querySelector("#edzoimegnevezes").value;


        if (this.setNev(urlapNev) === false) {
            this.mutatUzenet("A név 3 és 24 karakter közötti legyen!");
            return;
        }

        if (this.setEmail(urlapEmail) === false) {
            this.mutatUzenet("Hibás email cím!");
            return;
        }


        if (this.setJelszo(urlapJelszo) === false) {
            this.mutatUzenet("A jelszó legalább 8 karakter legyen!");
            return;
        }



        document.querySelector("#belepettNev").textContent = this.#nev;

        bootstrap.Modal.getInstance(
            document.querySelector("#profilmodal")
        ).hide();


        this.mutatUzenet("Sikeres mentés!", true);
    }

}

let profil = new Profil("", "", "");