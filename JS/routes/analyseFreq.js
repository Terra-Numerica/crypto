const express = require('express');
const router = express.Router();
const { calculateFrequencies, changeLetter, transformToDict } = require('../models/analyseFreq');

// Texte original (comme dans la version Django)
const texteOriginal = "Inymh ! Rz d'zbyfb lya eyrfkz oyfa mhsa ymzj efdykzozdb nzsaaf y pzrhpzn bhsa kza ozaaytza csags'y k'zbylz efdykz. Ezkfrfbybfhda. Mhsa mhsa pzoydpzj lzsb zbnz gsf mhsa y pfb gsz mhsa pzmfzj bnhsmzn kz rhnnftz pz k'zqyozd pz pzoyfd. Zb ifzd r'zbyfb ohf. Zd zeezb, k'zqyozd zbyfb df lksa df ohfda gsz rz gsz mhsa mzdzj pz eyfnz. Afdrznza ezkfrfbybfhda ysq chszsna, mhsa ymzj phdr ybbzfdb ky dhbz oyqfoykz ! dkk";

// Page de connexion
router.get('/mdp', (req, res) => {
    res.render('analyseFreq/mdp');
});

// Vérification du mot de passe
router.post('/mdp', (req, res) => {
    const { mdp } = req.body;
    const motDePasse = "frequence";

    if (mdp === motDePasse) {
        req.session.authenticated = true;
        res.redirect('/analyseFreq');
    } else {
        res.render('analyseFreq/mdp', {
            error: 'Mot de passe incorrect'
        });
    }
});

// Page d'analyse fréquentielle (protégée)
router.get('/analyseFreq', (req, res) => {
    if (!req.session.authenticated) {
        return res.redirect('/mdp');
    }

    // Récupérer le texte de la session ou utiliser le texte original
    const texte = req.session.texteModifie || texteOriginal;
    const frequence = calculateFrequencies(texte);
    const freqDict = transformToDict(frequence);

    res.render('analyseFreq/analyseFreq', {
        texteDecod: texte,
        frequence: freqDict
    });
});

// Traitement des changements de lettres
router.post('/analyseFreq', (req, res) => {
    if (!req.session.authenticated) {
        return res.redirect('/mdp');
    }

    const { letter, replacement } = req.body;
    let texte = req.session.texteModifie || texteOriginal;

    if (letter && replacement) {
        texte = changeLetter(texte, letter, replacement);
        req.session.texteModifie = texte;
    }

    const frequence = calculateFrequencies(texte);
    const freqDict = transformToDict(frequence);

    res.render('analyseFreq/analyseFreq', {
        texteDecod: texte,
        frequence: freqDict
    });
});

module.exports = router; 