// Fonction de vérification de l'alphabet
function verifyAlphabet(chain) {
    // Convertir la chaîne en minuscules
    chain = chain.toLowerCase();
    
    // Créer un Set des caractères uniques
    const characters = new Set(chain.split('').filter(char => /[a-z]/.test(char)));
    
    // Vérifier si on a bien 26 lettres uniques
    return characters.size === 26;
}

// Fonction principale Enigma
function enigma(message, rotor1, rotor2, rotor3, reflector, rotorPositions) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let [rotor1Pos, rotor2Pos, rotor3Pos] = rotorPositions;
    let codedMessage = "";

    // Fonction pour avancer un rotor
    function advanceRotor(rotor) {
        return rotor.slice(1) + rotor[0];
    }

    // Fonction pour trouver l'index d'une lettre dans l'alphabet
    function findIndex(letter) {
        return alphabet.indexOf(letter);
    }

    // Fonction pour coder une lettre avec un rotor
    function codeLetterRotor(index, rotor) {
        return rotor[index];
    }

    // Fonction pour réfléchir une lettre avec le réflecteur
    function reflectLetter(letter, reflector) {
        const index = alphabet.indexOf(letter.toLowerCase());
        return reflector[index];
    }

    // Réglage initial des rotors
    rotor1 = rotor1.slice(26 - rotor1Pos) + rotor1.slice(0, 26 - rotor1Pos);
    rotor2 = rotor2.slice(26 - rotor2Pos) + rotor2.slice(0, 26 - rotor2Pos);
    rotor3 = rotor3.slice(26 - rotor3Pos) + rotor3.slice(0, 26 - rotor3Pos);

    // Traitement de chaque lettre du message
    for (let letter of message) {
        if (!/[a-zA-Z]/.test(letter)) {
            codedMessage += letter;
            continue;
        }

        // Convertir en minuscule pour le traitement
        letter = letter.toLowerCase();

        // Encodage à travers les rotors
        let index = findIndex(letter);
        letter = codeLetterRotor(index, rotor1);
        index = findIndex(letter);
        letter = codeLetterRotor(index, rotor2);
        index = findIndex(letter);
        letter = codeLetterRotor(index, rotor3);

        // Réflexion
        letter = reflectLetter(letter, reflector);

        // Encodage inverse à travers les rotors
        index = rotor3.indexOf(letter);
        letter = alphabet[index];
        index = rotor2.indexOf(letter);
        letter = alphabet[index];
        index = rotor1.indexOf(letter);
        letter = alphabet[index];

        codedMessage += letter;

        // Avancer le rotor 1
        rotor1 = advanceRotor(rotor1);
        rotor1Pos = (rotor1Pos + 1) % 26;

        // Avancer les autres rotors si nécessaire
        if (rotor1Pos === 0) {
            rotor2 = advanceRotor(rotor2);
            rotor2Pos = (rotor2Pos + 1) % 26;
            if (rotor2Pos === 0) {
                rotor3 = advanceRotor(rotor3);
                rotor3Pos = (rotor3Pos + 1) % 26;
            }
        }
    }

    return codedMessage;
}

module.exports = {
    enigma,
    verifyAlphabet
}; 