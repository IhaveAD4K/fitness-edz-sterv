class Gyakorlatok {
    #nev;
    #izomCsoport;
    #nehezseg;
    #szettekSzama;
    #ismetlesekSzama;
    #pihenoIdo;
    #suly;

    constructor(
        nev,
        izomCsoport,
        nehezseg,
        szettekSzama,
        ismetlesekSzama,
        pihenoIdo,
        suly
    ) {
        this.setNev(nev);
        this.setIzomCsoport(izomCsoport);
        this.setNehezseg(nehezseg);
        this.setSzettekSzama(szettekSzama);
        this.setIsmetlesekSzama(ismetlesekSzama);
        this.setPihenoIdo(pihenoIdo);
        this.setSuly(suly);
    }

    getNev() {
        return this.#nev;
    }

    getIzomCsoport() {
        return this.#izomCsoport;
    }

    getNehezseg() {
        return this.#nehezseg;
    }

    getSzettekSzama() {
        return this.#szettekSzama;
    }

    getIsmetlesekSzama() {
        return this.#ismetlesekSzama;
    }

    getPihenoIdo() {
        return this.#pihenoIdo;
    }

    getSuly() {
        return this.#suly;
    }

    setNev(nev) {
        this.#nev = String(nev ?? "").trim();
    }

    setIzomCsoport(izomCsoport) {
        this.#izomCsoport = String(izomCsoport ?? "").trim();
    }

    setNehezseg(nehezseg) {
        this.#nehezseg = String(nehezseg ?? "").trim();
    }

    setSzettekSzama(szettekSzama) {
        const ertek = Number(szettekSzama);

        if (Number.isFinite(ertek) && ertek >= 0 && ertek <= 150) {
            this.#szettekSzama = ertek;
        } else {
            this.#szettekSzama = 0;
        }
    }

    setIsmetlesekSzama(ismetlesekSzama) {
        const ertek = Number(ismetlesekSzama);

        if (Number.isFinite(ertek) && ertek >= 0 && ertek <= 50) {
            this.#ismetlesekSzama = ertek;
        } else {
            this.#ismetlesekSzama = 0;
        }
    }

    setPihenoIdo(pihenoIdo) {
        const ertek = Number(pihenoIdo);

        if (Number.isFinite(ertek) && ertek >= 0 && ertek <= 30) {
            this.#pihenoIdo = ertek;
        } else {
            this.#pihenoIdo = 0;
        }
    }

    setSuly(suly) {
        const ertek = Number(suly);

        if (Number.isFinite(ertek) && ertek >= 0 && ertek <= 300) {
            this.#suly = ertek;
        } else {
            this.#suly = 0;
        }
    }

    toString() {
        return `${this.#nev} - ${this.#izomCsoport} - ${this.#nehezseg}`;
    }
}