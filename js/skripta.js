var boje = {
  cekiran: "Crimson",
  necekiran: "Teal",
};

// Funkcija za proveru validnosti forme
function proveraForme(forma) {
  let ime = forma.ime.value.trim();
  if (ime == "" || ime[0] != ime[0].toUpperCase()) {
    return false;
  }
  let prezime = forma.prezime.value.trim();
  if (prezime == "" || prezime[0] != prezime[0].toUpperCase()) {
    return false;
  }
  return true;
}


function showPopust() {
  let popust = document.getElementById("sel1");
  let procenat = document.getElementById("sel2");
  let poruka = document.getElementById("poruka");
  let submit = document.getElementById("submitbtn");
  let premium = document.getElementById("cb1");

  if (popust.value == 2) {
    procenat.style.visibility = "visible";
    procenat.disabled = false;
    showText();
  } else if (popust.value == 1) {
    procenat.style.visibility = "hidden";
    procenat.disabled = true;
    poruka.innerHTML = "";
    submit.style.backgroundColor = "";
    premium.disabled = true;
  }
}

// Funkcija za prikaz selektovanog popusta
function showText() {
  let procenat = document.getElementById("sel2");
  let poruka = document.getElementById("poruka");
  let premium = document.getElementById("cb1");
  let submit = document.getElementById("submitbtn");

  if (procenat.value == 10) {
    poruka.innerHTML = "10% popusta";
    premium.disabled = true;
    submit.style.backgroundColor = "";
  } else if (procenat.value == 20) {
    poruka.innerHTML = "20% popusta";
    premium.disabled = true;
    submit.style.backgroundColor = "";
  } else if (procenat.value == 30) {
    poruka.innerHTML = "30% popusta";
    premium.disabled = false;
    submit.style.backgroundColor = paint(premium);
    premium.addEventListener("click", () => {
      submit.style.backgroundColor = boje.cekiran;
    });
  }
}

function paint(pa) {
  let submit = document.getElementById("submitbtn");

  if (pa.checked) {
    submit.style.backgroundColor = boje.cekiran;
  } else {
    submit.style.backgroundColor = boje.necekiran;
  }
}
