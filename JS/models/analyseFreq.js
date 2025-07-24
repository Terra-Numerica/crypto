// Correspondances lettres - fréquences
const alphabet = {
    'a': 9.42, 'b': 1.02, 'c': 2.64, 'd': 3.39, 'e': 15.87, 'f': 0.95,
    'g': 1.04, 'h': 0.77, 'i': 8.41, 'j': 0.89, 'k': 0.01, 'l': 5.34,
    'm': 3.24, 'n': 7.15, 'o': 5.14, 'p': 2.86, 'q': 1.06, 'r': 6.46,
    's': 7.9, 't': 7.26, 'u': 6.24, 'v': 2.15, 'w': 0.0001, 'x': 0.3,
    'y': 0.24, 'z': 0.32
};

// Calcul des fréquences dans une chaîne
function calculateFrequencies(text) {
    const frequencies = {};
    let totalLetters = 0;

    // Compter les occurrences de chaque lettre
    for (let char of text.toLowerCase()) {
        if (/[a-z]/.test(char)) {
            frequencies[char] = (frequencies[char] || 0) + 1;
            totalLetters++;
        }
    }

    // Calculer les pourcentages
    for (let char in frequencies) {
        frequencies[char] = (frequencies[char] * 100 / totalLetters).toFixed(2);
    }

    // Trier par fréquence décroissante
    return Object.entries(frequencies)
        .sort(([,a], [,b]) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: parseFloat(v) }), {});
}

// Fonction pour changer une lettre par une autre
function changeLetter(text, a, b) {
    let result = '';
    const aLower = a.toLowerCase();
    const bLower = b.toLowerCase();

    for (let char of text) {
        if (!/[a-zA-Z]/.test(char)) {
            result += char;
        } else if (char.toLowerCase() === aLower) {
            result += char === char.toLowerCase() ? bLower : b.toUpperCase();
        } else if (char.toLowerCase() === bLower) {
            result += char === char.toLowerCase() ? aLower : a.toUpperCase();
        } else {
            result += char;
        }
    }

    return result;
}

// Transformer le résultat en dictionnaire
function transformToDict(frequencies) {
    return frequencies;
}

module.exports = {
    calculateFrequencies,
    changeLetter,
    transformToDict
}; 