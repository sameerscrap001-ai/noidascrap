SAMEER KABAADI WALA - FIREBASE VERSION

1. Firebase Authentication:
   - Enable Sign-in method > Email/Password.
   - Create admin user in Authentication > Users.
   - Admin email: sameerscrap001@gmail.com
   - Use the password you set in Firebase. Do NOT put the password in this file.

2. Firestore:
   - Collection: settings
   - Document: rates
   - Fields: iron, copper, aluminium, electronic, plastic, batteries, vehicle
   - Firestore rules are included in firestore.rules.

3. Local test:
   - Open this folder in VS Code.
   - Right-click index.html > Open with Live Server.
   - Open /admin.html using the same Live Server URL.

4. Admin login:
   - Username: admin
   - Password: the Firebase Authentication password for sameerscrap001@gmail.com

5. Price changes:
   - Admin saves to Firestore settings/rates.
   - Main website listens to the same document and updates prices for users.

Important:
   - Live Server's Google/Chrome account does NOT control Firebase login.
   - Firebase Console account and Firebase Authentication user are separate things.
