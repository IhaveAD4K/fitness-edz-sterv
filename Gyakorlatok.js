class Gyakorlatok{
    #nev;
    #izomCsoport;
    #nehezseg;
    #szettekSzama;
    #ismetlesekSzama;
    #pihenoIdo;
    #suly;

    constructor(nev,izomCsoport, nehezseg, szettekSzama, ismetlesekSzama, pihenoIdo, suly){
        this.setNev(nev);
        this.setIzomCsoport(izomCsoport);
        this.setNehezseg(nehezseg);
        this.setSzettekSzama(szettekSzama);
        this.setIsmetlesekSzama(ismetlesekSzama);
        this.setPihenoIdo(pihenoIdo);
        this.setSuly(suly);
    }
      setNev(nev){
        this.#nev = nev;
    }
    getNev(){
        return this.#nev;
    }
    setIzomCsoport(izomCsoport){
        this.#izomCsoport = izomCsoport;
    }
    getIzomCsoport(){
        return this.#izomCsoport;
    }
    setNehezseg(nehezseg){
        this.#nehezseg = nehezseg;
    }
}
