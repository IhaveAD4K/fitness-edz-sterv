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
    getNehezseg(){
        return this.#nehezseg;
    }
    setSzettekSzama(szettekSzama){
        if(szettekSzama>150){
            szettekSzama = 150;
        }else{
        this.#szettekSzama = szettekSzama;
    }

    }
    getSzettekSzama(){
    
        return this.#szettekSzama;
    }
    setIsmetlesekSzama(ismetlesekSzama){
        if(ismetlesekSzama > 50){
            ismetlesekSzama = 50;
        }else{
        this.#ismetlesekSzama = ismetlesekSzama;
    }
    }
    getIsmetlesekSzama(ismetlesekSzama){
        return this.#ismetlesekSzama;
    }
    setPihenoIdo(pihenoIdo){
        if(pihenoIdo > 30){
            pihenoIdo = 30;
    }else{
     this.#pihenoIdo = pihenoIdo;}
    }
    getPihenoIdo(pihenoIdo){
        return this.#suly;
    }

    setSuly(suly){
        if(suly >300){
            suly = 300;
        }else{
        this.#suly = suly;
    }

    }
    getSuly(suly){
        return this.#suly;
    }
    toString(){
        
    }
}