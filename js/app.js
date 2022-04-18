var Simptom = /** @class */ (function () {
    function Simptom(naziv) {
        this.naziv = naziv;
    }
    return Simptom;
}());
/// <reference path="Simptom.ts" />
var Pacijent = /** @class */ (function () {
    function Pacijent(id, ime, prezime, telesnaTemperatura, pcrTest) {
        this._id = id;
        this._ime = ime;
        this._prezime = prezime;
        this._telesnaTemperatura = telesnaTemperatura;
        this._pcrTest = pcrTest;
        this._ostaliSimptomi = [];
    }
    Object.defineProperty(Pacijent.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "ime", {
        get: function () {
            return this._ime;
        },
        set: function (value) {
            this._ime = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "prezime", {
        get: function () {
            return this._prezime;
        },
        set: function (value) {
            this._prezime = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "telesnaTemperatura", {
        get: function () {
            return this._telesnaTemperatura;
        },
        set: function (value) {
            this._telesnaTemperatura = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "pcrTest", {
        get: function () {
            return this._pcrTest;
        },
        set: function (value) {
            this._pcrTest = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "ostaliSimptomi", {
        get: function () {
            return this._ostaliSimptomi;
        },
        set: function (value) {
            this._ostaliSimptomi = value;
        },
        enumerable: false,
        configurable: true
    });
    Pacijent.prototype.dodajSimptom = function (simpt) {
        this._ostaliSimptomi.push(simpt);
    };
    return Pacijent;
}());
/// <reference path="Pacijent.ts" />
var Bolnica = /** @class */ (function () {
    function Bolnica(naziv, grad) {
        this._naziv = naziv;
        this._grad = grad;
        this._pacijenti = [];
    }
    Object.defineProperty(Bolnica.prototype, "naziv", {
        get: function () {
            return this._naziv;
        },
        set: function (value) {
            this._naziv = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bolnica.prototype, "grad", {
        get: function () {
            return this._grad;
        },
        set: function (value) {
            this._grad = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bolnica.prototype, "pacijenti", {
        get: function () {
            return this._pacijenti;
        },
        set: function (value) {
            this._pacijenti = value;
        },
        enumerable: false,
        configurable: true
    });
    Bolnica.prototype.refreshHTML = function () {
        var tabela = document.getElementById("tbody");
        var output = "";
        for (var i = 0; i < this._pacijenti.length; i++) {
            var objPac = this._pacijenti[i];
            output += "<tr>\n\t\t\t\t\t\t\t\t<td>".concat(i + 1, "</td>\n\t\t\t\t\t\t\t\t<td>").concat(objPac.ime, "</td>\n\t\t\t\t\t\t\t\t<td>").concat(objPac.prezime, "</td>\n\t\t\t\t\t\t\t\t<td>").concat(objPac.telesnaTemperatura, "</td>\n\t\t\t\t\t\t\t\t<td>").concat(objPac.pcrTest, "</td>\n\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t\t\t<li>").concat(objPac.ostaliSimptomi.map(function (elem) { return elem.naziv; }), "</li>\n\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>");
        }
        tabela.innerHTML = output;
    };
    Bolnica.prototype.dodajPacijenta = function (value) {
        this._pacijenti.push(value);
        this.refreshHTML();
    };
    Bolnica.prototype.procentualnoObolelih = function () {
        var brojObolelih = 0;
        this._pacijenti.forEach(function (elem) {
            if (elem.pcrTest == "Pozitivan") {
                brojObolelih++;
            }
        });
        return (brojObolelih / this._pacijenti.length) * 100;
    };
    Bolnica.prototype.procenatObolelihBezSimptoma = function () {
        var brojObolelih = 0;
        var res = 0;
        var pozitivni = 0;
        var sviPacijenti = this._pacijenti;
        sviPacijenti.map(function (elem) {
            if (elem.pcrTest == "Pozitivan") {
                pozitivni++;
                if (elem.ostaliSimptomi.length <= 0) {
                    brojObolelih++;
                }
            }
            res = Math.round((brojObolelih / pozitivni) * 100);
        });
        return res;
    };
    Bolnica.prototype.brojPozitivnih = function () {
        var pacijenti = this._pacijenti;
        var brojObolelihUGradu = 0;
        for (var i = 0; i < pacijenti.length; i++) {
            if (pacijenti[i].pcrTest == "Pozitivan") {
                brojObolelihUGradu++;
            }
        }
        return this.grad + " " + brojObolelihUGradu;
    };
    return Bolnica;
}());
/// <reference path="Bolnica.ts" />
// sve bolnice
var bolnice = [];
var aktivnaBolnica = null;
function promeniAktivnu(selekt) {
    aktivnaBolnica = bolnice.filter(function (el) { return el.naziv == selekt.value; })[0];
    aktivnaBolnica.refreshHTML();
}
function wireEvents() {
    document.getElementById("dodajSimptom").addEventListener("click", function () {
        var id = Number(document.getElementById("ids").value);
        var simptom = document.getElementById("simptom")
            .value;
        var s = new Simptom(simptom);
        aktivnaBolnica.pacijenti.filter(function (el) { return el.id == id; })[0].dodajSimptom(s);
        aktivnaBolnica.refreshHTML();
    });
    // DUGME ZA DODAVANJE PACIJENTA
    var dodajPacijenta = document.getElementById("dodajPacijenta");
    dodajPacijenta.addEventListener("click", function () {
        var ime = document.getElementById("ime").value;
        var prezime = document.getElementById("prezime")
            .value;
        var temp = document.getElementById("temperatura")
            .value;
        var pcrTest = document.getElementById("test").value;
        var pac = new Pacijent(bolnice.length + 1, ime, prezime, Number(temp), pcrTest);
        aktivnaBolnica.dodajPacijenta(pac);
    });
    // DUGME ZA PROCENAT OBOLELIH
    var procenat = document.getElementById("procenat");
    var podaci = document.getElementById("podaci");
    procenat.addEventListener("click", function () {
        var output = "";
        podaci.innerHTML = output;
        output = "<h2> Procentualan broj obolelih u bolnici ".concat(aktivnaBolnica.naziv, " je ").concat(aktivnaBolnica.procentualnoObolelih(), "% </h2>");
        location.href = "#podaci";
        podaci.innerHTML = output;
    });
    //DUGME ZA PROCENAT OBOLELIH BEZ SIMPTOMA
    var bezSimp = document.getElementById("bezSimptoma");
    bezSimp.addEventListener("click", function () {
        var output = "";
        podaci.innerHTML = output;
        output = "<h2>Procenat obolelih bez simptoma je ".concat(String(aktivnaBolnica.procenatObolelihBezSimptoma()), "% </h2>");
        podaci.innerHTML = output;
        location.href = "#podaci";
    });
    //DUGME ZA GRAD SA NAJVISE POZITIVNIH SLUCAJA
    var gradPozitivni = document.getElementById("gradPozitivni");
    gradPozitivni.addEventListener("click", function () {
        var podaci = document.getElementById("podaci");
        var output = bolnice.map(function (elem) { return elem.brojPozitivnih(); });
        console.log(output);
        podaci.innerHTML = "<h2> ".concat(String(output), " pozitivna slucaja korone </h2>");
        location.href = "#podaci";
    });
}
//
window.onload = function () {
    initializeData();
    wireEvents();
};
function initializeData() {
    var bol = window.bol;
    var selekt = document.getElementById("bolnica");
    for (var i = 0; i < bol.length; i++) {
        var naziv = bol[i].naziv;
        var grad = bol[i].grad;
        var pacijenti = [];
        for (var j = 0; j < bol[i].pacijenti.length; j++) {
            var id = Number(bol[i].pacijenti[j].id);
            var ime = bol[i].pacijenti[j].ime;
            var prezime = bol[i].pacijenti[j].prezime;
            var temperatura = Number(bol[i].pacijenti[j].telesnaTemperatura);
            var pcrTest = bol[i].pacijenti[j].pcrTest;
            var simptomi = [];
            for (var k = 0; k < bol[i].pacijenti[j].ostaliSimptomi.length; k++) {
                var s = new Simptom(bol[i].pacijenti[j].ostaliSimptomi[k]);
                simptomi.push(s);
            }
            var p = new Pacijent(id, ime, prezime, temperatura, pcrTest);
            p.ostaliSimptomi = simptomi;
            pacijenti.push(p);
        }
        var b = new Bolnica(naziv, grad);
        b.pacijenti = pacijenti;
        if (aktivnaBolnica == null) {
            aktivnaBolnica = b;
            b.refreshHTML();
        }
        bolnice.push(b);
        var option = document.createElement("option");
        option.text = b.naziv;
        selekt.add(option);
    }
}
//# sourceMappingURL=app.js.map