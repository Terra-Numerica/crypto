const fs = require('fs');
const path = require('path');

// Fonction pour copier un dossier de manière récursive
function copyFolderRecursiveSync(source, target) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    }

    if (fs.lstatSync(source).isDirectory()) {
        const files = fs.readdirSync(source);
        files.forEach(file => {
            const curSource = path.join(source, file);
            const curTarget = path.join(target, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, curTarget);
            } else {
                fs.copyFileSync(curSource, curTarget);
            }
        });
    }
}

// Copier les ressources
const sourceRoot = path.join(__dirname, '..');
const targetRoot = __dirname;

// Copier FontAwesome
const fontawesomeSource = path.join(sourceRoot, 'analyseFreq/static/fontawesome');
const fontawesomeTarget = path.join(targetRoot, 'public/fontawesome');
copyFolderRecursiveSync(fontawesomeSource, fontawesomeTarget);

// Copier l'image Enigma
const imgSource = path.join(sourceRoot, 'analyseFreq/static/img');
const imgTarget = path.join(targetRoot, 'public/img');
copyFolderRecursiveSync(imgSource, imgTarget);

// Copier la vidéo Enigma
const videoSource = path.join(sourceRoot, 'enigma/static/video');
const videoTarget = path.join(targetRoot, 'public/video');
copyFolderRecursiveSync(videoSource, videoTarget);

console.log('Ressources copiées avec succès !'); 