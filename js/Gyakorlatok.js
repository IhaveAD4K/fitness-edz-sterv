
class Gyakorlatok {
    #nev;
    #izomCsoport;
    #nehezseg;
    #szettekSzama;
    #ismetlesekSzama;
    #pihenoIdo;
    #suly;

    constructor(nev, izomCsoport, nehezseg,
                szettekSzama, ismetlesekSzama,
                pihenoIdo, suly) {
        this.setNev(nev);
        this.setIzomCsoport(izomCsoport);
        this.setNehezseg(nehezseg);
        this.setSzettekSzama(szettekSzama);
        this.setIsmetlesekSzama(ismetlesekSzama);
        this.setPihenoIdo(pihenoIdo);
        this.setSuly(suly);
    }

    setNev(nev) {
        this.#nev = nev;
    }

    getNev() {
        return this.#nev;
    }

    setIzomCsoport(izomCsoport) {
        this.#izomCsoport = izomCsoport;
    }

    getIzomCsoport() {
        return this.#izomCsoport;
    }

    setNehezseg(nehezseg) {
        this.#nehezseg = nehezseg;
    }

    getNehezseg() {
        return this.#nehezseg;
    }

    setSzettekSzama(szam) {
        this.#szettekSzama = Math.min(150, szam);
    }

    getSzettekSzama() {
        return this.#szettekSzama;
    }

    setIsmetlesekSzama(szam) {
        this.#ismetlesekSzama = Math.min(50, szam);
    }

    getIsmetlesekSzama() {
        return this.#ismetlesekSzama;
    }

    setPihenoIdo(ido) {
        this.#pihenoIdo = Math.min(30, ido);
    }
<<<<<<< HEAD

    getPihenoIdo() {
        return this.#pihenoIdo;
    }

    setSuly(suly) {
        this.#suly = Math.min(300, suly);
    }

    getSuly() {
        return this.#suly;
=======
    getPihenoIdo(pihenoIdo){
        return this.#pihenoIdo;
>>>>>>> 2491d581c1d902f452ecb263eeda8a845982cd1e
    }

    toString() {
        return this.#nev;
    }
}
