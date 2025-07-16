

setTimeout(() => {
  console.log("3 secondes se sont écoulées !");
}, 3000);

///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\
function telechargerFichier(url, nomFichier) {
  const lien = document.createElement('a');
  lien.href = url;
  lien.download = nomFichier || '';
  document.body.appendChild(lien);
  lien.click();
  document.body.removeChild(lien);
}

///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\
setTimeout(() => {
  const lien = document.getElementById('telechargement-auto');
  if (lien) {
    lien.click();
  }
}, 2000);

///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\
function telechargementsEnChaine({
  classeLien = 'telechargement',
  plage = null,         // Exemple : { debut: 5, fin: 15 }
  liste = null,         // Exemple : [1, 3, 7, 20]
  delai = 1000          // Délai entre chaque téléchargement (en ms)
}) {
  const liens = Array.from(document.querySelectorAll(`.${classeLien}`));

  // Filtrage des liens selon la plage ou la liste
  let liensCibles = [];
  if (plage) {
    liensCibles = liens.slice(plage.debut - 1, plage.fin); // index 0-based
  } else if (liste) {
    liensCibles = liste.map(i => liens[i - 1]).filter(Boolean);
  } else {
    liensCibles = liens;
  }

  // Téléchargement en chaîne avec délai
  liensCibles.forEach((lien, index) => {
    setTimeout(() => {
      if (lien) lien.click();
    }, index * delai);
  });
}

///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\
telechargementsEnChaine({
  plage: { debut: 5, fin: 15 },
  delai: 1000
});
//::::\\
telechargementsEnChaine({
  liste: [1, 3, 7, 20],
  delai: 2000
});

///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\
/*
<input type="file" id="fichier" />
<pre id="contenu"></pre>
*/
//<script>
  document.getElementById('fichier').addEventListener('change', function(event) {
    const fichier = event.target.files[0];
    if (!fichier) return;

    const lecteur = new FileReader();
    lecteur.onload = function(e) {
      document.getElementById('contenu').textContent = e.target.result;
    };
    lecteur.readAsText(fichier); // ou readAsDataURL, readAsArrayBuffer, etc.
  });
//</script>

///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\



///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\
