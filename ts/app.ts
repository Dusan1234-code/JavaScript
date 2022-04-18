/// <reference path="Bolnica.ts" />
// sve bolnice
let bolnice: Bolnica[] = [];
let aktivnaBolnica: Bolnica = null;

function promeniAktivnu(selekt: HTMLSelectElement): void {
  aktivnaBolnica = bolnice.filter((el) => el.naziv == selekt.value)[0];
  aktivnaBolnica.refreshHTML();
}

function wireEvents(): void {
  document.getElementById("dodajSimptom").addEventListener("click", () => {
    let id = Number((document.getElementById("ids") as HTMLInputElement).value);
    let simptom = (document.getElementById("simptom") as HTMLSelectElement)
      .value;
    let s = new Simptom(simptom);
    aktivnaBolnica.pacijenti.filter((el) => el.id == id)[0].dodajSimptom(s);
    aktivnaBolnica.refreshHTML();
  });

  // DUGME ZA DODAVANJE PACIJENTA

  let dodajPacijenta = document.getElementById(
    "dodajPacijenta"
  ) as HTMLInputElement;

  dodajPacijenta.addEventListener("click", () => {
    let ime = (document.getElementById("ime") as HTMLInputElement).value;
    let prezime = (document.getElementById("prezime") as HTMLInputElement)
      .value;
    let temp = (document.getElementById("temperatura") as HTMLInputElement)
      .value;

    let pcrTest = (document.getElementById("test") as HTMLSelectElement).value;
    let pac = new Pacijent(
      bolnice.length + 1,
      ime,
      prezime,
      Number(temp),
      pcrTest
    );
    aktivnaBolnica.dodajPacijenta(pac);
  });

  // DUGME ZA PROCENAT OBOLELIH

  let procenat = document.getElementById("procenat") as HTMLInputElement;
  let podaci = document.getElementById("podaci") as HTMLDivElement;

  procenat.addEventListener("click", () => {
    let output = "";
    podaci.innerHTML = output;
    output = `<h2> Procentualan broj obolelih u bolnici ${
      aktivnaBolnica.naziv
    } je ${aktivnaBolnica.procentualnoObolelih()}% </h2>`;

    location.href = "#podaci";

    podaci.innerHTML = output;
  });

  //DUGME ZA PROCENAT OBOLELIH BEZ SIMPTOMA
  let bezSimp = document.getElementById("bezSimptoma") as HTMLInputElement;

  bezSimp.addEventListener("click", () => {
    let output = "";
    podaci.innerHTML = output;
    output = `<h2>Procenat obolelih bez simptoma je ${String(
      aktivnaBolnica.procenatObolelihBezSimptoma()
    )}% </h2>`;
    podaci.innerHTML = output;
    location.href = "#podaci";
  });

  //DUGME ZA GRAD SA NAJVISE POZITIVNIH SLUCAJA

  let gradPozitivni = document.getElementById(
    "gradPozitivni"
  ) as HTMLInputElement;

  gradPozitivni.addEventListener("click", () => {
    let podaci = document.getElementById("podaci") as HTMLDivElement;

    let output = bolnice.map((elem) => elem.brojPozitivnih());

    console.log(output);
    podaci.innerHTML = `<h2> ${String(output)} pozitivna slucaja korone </h2>`;
    location.href = "#podaci";
  });
}
//

window.onload = () => {
  initializeData();
  wireEvents();
};

function initializeData() {
  let bol = (window as any).bol;
  let selekt = document.getElementById("bolnica") as HTMLSelectElement;
  for (let i = 0; i < bol.length; i++) {
    let naziv = bol[i].naziv;
    let grad = bol[i].grad;
    let pacijenti: Pacijent[] = [];
    for (let j = 0; j < bol[i].pacijenti.length; j++) {
      let id = Number(bol[i].pacijenti[j].id);
      let ime = bol[i].pacijenti[j].ime;
      let prezime = bol[i].pacijenti[j].prezime;
      let temperatura = Number(bol[i].pacijenti[j].telesnaTemperatura);
      let pcrTest = bol[i].pacijenti[j].pcrTest;
      let simptomi: Simptom[] = [];

      for (let k = 0; k < bol[i].pacijenti[j].ostaliSimptomi.length; k++) {
        let s = new Simptom(bol[i].pacijenti[j].ostaliSimptomi[k]);
        simptomi.push(s);
      }

      let p = new Pacijent(id, ime, prezime, temperatura, pcrTest);
      p.ostaliSimptomi = simptomi;
      pacijenti.push(p);
    }
    let b = new Bolnica(naziv, grad);
    b.pacijenti = pacijenti;
    if (aktivnaBolnica == null) {
      aktivnaBolnica = b;
      b.refreshHTML();
    }
    bolnice.push(b);
    let option = document.createElement("option");
    option.text = b.naziv;
    selekt.add(option);
  }
}
