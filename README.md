SI GIT NE MARCHE PLUS :
Dans un répertoire faire :

git clone https://github.com/tristanlemoigne/fiber.git
cd fiber
ionic start newProject blank

Ici la console va demander si on veut installer les project dependencies car il n'a pas trouvé de dossier ./node_modules, accepter avec Y

Une fois ceci fait la console va demander si on souhaite quand même créer un nouveau projet ionic en sachant qu'on est déjà dans un projet ionic, répondre N

Et voilà ! Rien d'autre à faire.

ATTENTION : Télécharger les modules suivant :

- Caméra :

  ionic cordova plugin add cordova-plugin-camera

  npm install --save @ionic-native/camera


- Storage :

  ionic cordova plugin add cordova-sqlite-storage

  npm install --save @ionic/storage

- File Transfer :

  ionic cordova plugin add cordova-plugin-file-transfer

  npm install --save @ionic-native/file-transfer
