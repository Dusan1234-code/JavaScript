/// <reference path="Pacijent.ts" />

class Bolnica {
  private _naziv: string;
  private _grad: string;
  private _pacijenti: Pacijent[];

  constructor(naziv: string, grad: string) {
    this._naziv = naziv;
    this._grad = grad;
    this._pacijenti = [];
  }

  public get naziv(): string {
    return this._naziv;
  }

  public set naziv(value: string) {
    this._naziv = value;
  }

  public get grad(): string {
    return this._grad;
  }

  public set grad(value: string) {
    this._grad = value;
  }

  public get pacijenti(): Pacijent[] {
    return this._pacijenti;
  }

  public set pacijenti(value: Pacijent[]) {
    this._pacijenti = value;
  }

  refreshHTML(): void {
    let tabela = document.getElementById("tbody") as HTMLBodyElement;
    let output = "";
    for (let i = 0; i < this._pacijenti.length; i++) {
      let objPac = this._pacijenti[i];
      output += `<tr>
								<td>${i + 1}</td>
								<td>${objPac.ime}</td>
								<td>${objPac.prezime}</td>
								<td>${objPac.telesnaTemperatura}</td>
								<td>${objPac.pcrTest}</td>
								<td>
									<ul>
										<li>${objPac.ostaliSimptomi.map((elem) => elem.naziv)}</li>
									</ul>
								</td>
							</tr>`;
    }
    tabela.innerHTML = output;
  }

  dodajPacijenta(value: Pacijent): void {
    this._pacijenti.push(value);
    this.refreshHTML();
  }

  procentualnoObolelih(): number {
    let brojObolelih = 0;

    this._pacijenti.forEach((elem) => {
      if (elem.pcrTest == "Pozitivan") {
        brojObolelih++;
      }
    });
    return (brojObolelih / this._pacijenti.length) * 100;
  }

  procenatObolelihBezSimptoma(): number {
    let brojObolelih = 0;
    let res = 0;
    let pozitivni = 0;
    let sviPacijenti = this._pacijenti;
    sviPacijenti.map((elem) => {
      if (elem.pcrTest == "Pozitivan") {
        pozitivni++;
        if (elem.ostaliSimptomi.length <= 0) {
          brojObolelih++;
        }
      }

      res = Math.round((brojObolelih / pozitivni) * 100);
    });
    return res;
  }
  brojPozitivnih(): string {
    let pacijenti = this._pacijenti;
    let brojObolelihUGradu = 0;
    for (let i = 0; i < pacijenti.length; i++) {
      if (pacijenti[i].pcrTest == "Pozitivan") {
        brojObolelihUGradu++;
      }
    }
    return this.grad + " " + brojObolelihUGradu;
  }
}
