const express = require('express');
const router = express.Router();
const { enigma, verifyAlphabet } = require('../models/enigma');

// Page d'accueil
router.get('/', (req, res) => {
    res.render('home');
});

// Page de décodage Enigma
router.get('/decode', (req, res) => {
    res.render('enigma/decodage');
});

// Page du corrigé
router.get('/corrige_ds', (req, res) => {
    res.render('enigma/corrige_ds');
});

// Traitement du décodage
router.get('/submit', (req, res) => {
    const { rotor1, rotor2, rotor3, reflector, texte } = req.query;
    
    // Vérification des rotors
    if (!verifyAlphabet(rotor1) || !verifyAlphabet(rotor2) || !verifyAlphabet(rotor3)) {
        return res.render('enigma/decodage', {
            rotor1_conf: rotor1,
            rotor2_conf: rotor2,
            rotor3_conf: rotor3,
            reflector_conf: reflector,
            texte: texte.toLowerCase()
        });
    }

    // Décodage du message
    const decoded_message = enigma(
        texte,
        rotor1.toLowerCase(),
        rotor2.toLowerCase(),
        rotor3.toLowerCase(),
        reflector,
        [0, 0, 0]
    );

    res.render('enigma/submit', {
        texte: texte.toLowerCase(),
        decoded_message,
        rotor1_conf: rotor1,
        rotor2_conf: rotor2,
        rotor3_conf: rotor3,
        reflector_conf: reflector
    });
});

module.exports = router; 