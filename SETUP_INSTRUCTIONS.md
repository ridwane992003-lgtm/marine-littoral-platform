# Configuration GitHub Actions + Vercel

## ✅ Étapes complétées
- ✓ Workflow GitHub Actions créé
- ✓ Fichiers de configuration ajoutés

## 📋 Prochaines étapes (À faire manuellement)

### 1️⃣ Obtenir votre Vercel Token
1. Allez sur https://vercel.com/account/tokens
2. Cliquez sur **"Create"**
3. Donnez-lui un nom (ex: "GitHub Actions")
4. Copiez le token généré

### 2️⃣ Ajouter les secrets GitHub
1. Allez sur: https://github.com/ridwane992003-lgtm/marine-littoral-platform/settings/secrets/actions
2. Cliquez sur **"New repository secret"** et ajoutez:

#### Secret 1: VERCEL_TOKEN
- **Name**: `VERCEL_TOKEN`
- **Value**: Votre token Vercel copié à l'étape 1

#### Secret 2: VERCEL_ORG_ID
- Allez sur https://vercel.com/account/settings
- Trouvez votre **Team ID** ou **User ID**
- **Name**: `VERCEL_ORG_ID`
- **Value**: Votre ID

#### Secret 3: VERCEL_PROJECT_ID
- Allez sur votre projet Vercel: https://vercel.com/dashboard/projects
- Ouvrez le projet "marine-littoral-platform"
- Allez dans **Settings** → **General**
- Copiez le **Project ID**
- **Name**: `VERCEL_PROJECT_ID`
- **Value**: Votre Project ID

### 3️⃣ C'est tout! 🎉
- À chaque push sur `main`, le workflow se lancera automatiquement
- À chaque pull request, les tests de lint et build seront exécutés

## 📊 Workflows disponibles
- **deploy.yml** → Déploie sur Vercel après un push sur main
- **lint.yml** → Vérifie le code et la construction sur chaque PR/push

## 🔗 Liens utiles
- Workflows: https://github.com/ridwane992003-lgtm/marine-littoral-platform/actions
- Secrets: https://github.com/ridwane992003-lgtm/marine-littoral-platform/settings/secrets/actions
- Déploiement: https://marine-littoral-platform.vercel.app
