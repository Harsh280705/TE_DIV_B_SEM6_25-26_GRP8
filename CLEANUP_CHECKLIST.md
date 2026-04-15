# GitHub Upload Cleanup Checklist 🧹

Complete this checklist before pushing the Career Discovery Platform to GitHub to ensure security, maintainability, and professionalism.

---

## 🔴 CRITICAL - MUST REMOVE (Sensitive Data)

> **These items contain sensitive information and MUST be removed or secured before uploading.**

### ⚠️ Firebase API Keys & Credentials

- [ ] **`src/config/firebase.js`**
  - **Issue:** Contains exposed Firebase API keys
  - **Status:** ⚠️ EXPOSED - CRITICAL
  - **Current Keys Found:**
    ```
    apiKey: "AIzaSyDraWJs7PuZMzhOupAyOPu8LOOWpbogdB8"
    authDomain: "disproject-3b7a5.firebaseapp.com"
    projectId: "disproject-3b7a5"
    storageBucket: "disproject-3b7a5.firebasestorage.app"
    messagingSenderId: "167305669224"
    appId: "1:167305669224:web:97546c3af130d70c30e9dd"
    measurementId: "G-33P047E1WJ"
    ```
  - **Action Required:**
    1. DON'T DELETE the file, but replace content with template:
    ```javascript
    export const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "",
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "",
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "",
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "",
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "",
      appId: process.env.REACT_APP_FIREBASE_APP_ID || "",
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || ""
    };
    ```
    2. Create `.env.example` file with placeholder values
    3. Update `.gitignore` to include `.env` and `.env.local`

### 🔑 Environment Files

- [ ] Check for and remove (or add to `.gitignore`):
  - `.env`
  - `.env.local`
  - `.env.production`
  - `.env.*.local`
  - `config/secrets.json`
  - `credentials.json`
  - Private API keys or tokens

### 🔐 Private Certificates & Keys

- [ ] Remove any SSL certificates or private keys:
  - `*.pem`
  - `*.key`
  - `*.pfx`
  - `*.p12`
  - `*.jks`

### 📊 Database Dumps & Backups

- [ ] Remove database backups:
  - `*.sql`
  - `*.sqlbak`
  - `database_backup.*`
  - `firebase_export.*`

### 💾 Large Model Files (ML)

- [ ] **`src/ml/gesture_model.h5`**
  - **Size:** > 50MB (binary TensorFlow model)
  - **Action:** Consider options:
    - Option A: Keep but add to `.gitignore` (users must download separately)
    - Option B: Use Git LFS (Large File Storage)
    - Option C: Host on model hub (HuggingFace, TensorFlow Hub)
  - **Recommendation:** Remove from repo, add instructions for downloading/training

- [ ] **`src/ml/X_landmarks.npy` & `src/ml/y_landmarks.npy`**
  - **Size:** > 10MB (training data)
  - **Action:** Remove from repo, add to `.gitignore`
  - **Note:** Keep locally for model retraining

### 🗄️ Training Data

- [ ] **`src/ml/dataset/`** (if contains sensitive user data)
  - Remove or anonymize any personal data
  - If publicly shareable, document in README

---

## 🟡 SHOULD IGNORE (Add to .gitignore)

> **These are automatically generated and should NOT be committed.**

### Node.js Dependencies

- [ ] `node_modules/` - Directory (npm dependencies)
- [ ] `package-lock.json` - Optional (but recommended to commit for reproducibility)
- [ ] `.npm/` - npm cache
- [ ] `npm-debug.log`
- [ ] `npm-error.log`

### Python Virtual Environment

- [ ] `src/ml/venv/` - Virtual environment directory
- [ ] `src/ml/env/` - Alternative venv names
- [ ] `*.pyc` - Compiled Python files
- [ ] `__pycache__/` - Python cache directories
- [ ] `*.pyo`
- [ ] `*.pyd`
- [ ] `.Python` - Python installer marker
- [ ] `*.egg-info/` - Package info directories
- [ ] `dist/` - Build distributions
- [ ] `build/` - Build artifacts

### IDE & Editor Files

- [ ] `.vscode/` - VS Code workspace settings
  - Contains personal preferences, extensions list
  - Each developer should have their own
- [ ] `.idea/` - IntelliJ IDEA settings
- [ ] `*.swp`, `*.swo` - Vim swap files
- [ ] `.DS_Store` - macOS folder metadata
- [ ] `Thumbs.db` - Windows thumbnails
- [ ] `.project`, `.classpath` - Eclipse
- [ ] `*.sublime-project`, `*.sublime-workspace` - Sublime Text

### OS & System Files

- [ ] `.DS_Store` - macOS
- [ ] `.AppleDouble/`
- [ ] `.LSOverride`
- [ ] `Thumbs.db` - Windows
- [ ] `Desktop.ini` - Windows
- [ ] `$RECYCLE.BIN/` - Windows Recycle Bin
- [ ] `*.lnk` - Windows shortcuts
- [ ] `.Spotlight-V100/` - macOS Spotlight
- [ ] `.Trashes` - macOS trash

### Logs & Temporary Files

- [ ] `*.log` - All log files
- [ ] `logs/` - Log directory
- [ ] `npm-debug.log*`
- [ ] `yarn-debug.log*`
- [ ] `yarn-error.log*`
- [ ] `lerna-debug.log*`
- [ ] `.pnpm-debug.log*`

### Local Development Files

- [ ] `.env.local`
- [ ] `.env.*.local`
- [ ] `local.properties`
- [ ] `gradle.properties`
- [ ] `.prettierignore`

### OS Specific

- [ ] `#*#` - Emacs autosave
- [ ] `*~` - Generic backup files
- [ ] `.~*` - Backup files

---

## 🟠 OPTIONAL CLEANUP (Code Quality)

> **Recommended for professional GitHub presence, but not critical.**

### Backup & Legacy Files

- [ ] `assessment/assessment.BACKUP.html` - Delete or archive
- [ ] `assessment/assessment-results.html.THEME_BACKUP.html` - Delete
- [ ] `assessment/career-paths.html.BACKUP` - Delete
- [ ] `assessment/career-subdomains.html.BACKUP` - Delete
- [ ] `assessment/domain.html.BACKUP_BEFORE_COMPLETE_DATA` - Delete
- [ ] `assessment/index_BACKUP.html` - Delete
- [ ] `assessment/js/career-mapper.BACKUP.js` - Delete
- [ ] Any other `.BACKUP` files

**Action:**
```bash
# Find and list all backup files
find . -name "*.BACKUP*" -o -name "*.THEME_BACKUP*" -o -name "*.BACKUP_*"

# Delete them (or archive first)
find . -name "*.BACKUP*" -delete
```

### Unused/Old Code

- [ ] `src/components/` - Remove unused components
- [ ] `src/pages/` - Remove unfinished or unused pages
- [ ] Commented-out code blocks - Remove or document
- [ ] Old test files or debugging scripts

### Documentation

- [ ] `src/ml/model/` folder - Document what's inside
- [ ] Any `TODO.md` or internal notes - Add to `.gitignore` or remove
- [ ] Incomplete documentation - Complete or remove

### Test & Cache Files

- [ ] `*.cache`
- [ ] `.pytest_cache/`
- [ ] `.coverage`
- [ ] `htmlcov/`
- [ ] `dist/`
- [ ] `build/`
- [ ] `.tox/`
- [ ] `.hypothesis/`

### Build Artifacts

- [ ] `*.min.js` (keep only if source maps missing)
- [ ] `*.min.css` (keep only if source maps missing)
- [ ] Compiled/minified files without source
- [ ] `.next/`, `out/`, `.nuxt/` (if using Next.js)

---

## ✅ FILES TO VERIFY

### Sensitive Data Checks

- [ ] **Search for API keys:** `grep -r "apiKey\|api_key\|secret\|password" . --include="*.js" --include="*.py" --include="*.json"`
  - Review all matches
  - Move to environment variables if found

- [ ] **Check for TODO comments:** `grep -r "TODO\|FIXME\|XXX\|HACK" . --include="*.js" --include="*.py"`
  - Resolve or document critical ones

- [ ] **Look for test/debug credentials:** `grep -r "test\|admin\|fake\|mock" src/config src/services --include="*.js"`
  - Ensure no real credentials mixed with test data

### Documentation

- [ ] `README.md` exists and is complete
- [ ] `CONTRIBUTING.md` exists (optional but recommended)
- [ ] `CODE_OF_CONDUCT.md` exists (optional)
- [ ] `LICENSE` file exists (MIT or chosen license)
- [ ] `SECURITY.md` exists (if accepting bug reports)

---

## 📋 PRE-UPLOAD CHECKLIST

### Git Repository Setup

- [ ] Initialize git (if not already done):
  ```bash
  git init
  ```

- [ ] Create `.gitignore` file (use provided template)
  ```bash
  # Copy from template or create new
  ```

- [ ] Add all necessary files:
  ```bash
  git add .
  ```

- [ ] Verify no sensitive data will be committed:
  ```bash
  git status
  git diff --cached  # Review what's being added
  ```

- [ ] Create initial commit:
  ```bash
  git commit -m "Initial commit: Career Discovery Platform"
  ```

### GitHub Setup

- [ ] Create new repository on GitHub (Don't initialize with README)
- [ ] Add README.md, .gitignore, LICENSE if you haven't locally
- [ ] Set repository visibility (Public/Private)
- [ ] Add repository description
- [ ] Add topics: `accessibility`, `career`, `assessment`, `disability-inclusion`, `machine-learning`
- [ ] Configure GitHub Pages (if hosting)

### Pre-Push Verification

- [ ] Run security scan:
  ```bash
  npm audit
  pip audit  # If using security package
  ```

- [ ] Test locally one more time:
  ```bash
  npm start
  ```

- [ ] Verify `.gitignore` is working:
  ```bash
  git ls-files | grep -E "node_modules|\.env|__pycache__"
  # Should return nothing
  ```

- [ ] Remove `.git/config` credentials (if any):
  ```bash
  git config --global --unset user.password
  ```

### Final Push

- [ ] Add remote repository:
  ```bash
  git remote add origin https://github.com/yourusername/career-discovery-platform.git
  git branch -M main
  ```

- [ ] Push to GitHub:
  ```bash
  git push -u origin main
  ```

- [ ] Verify on GitHub:
  - [ ] Code is visible
  - [ ] No sensitive files in history
  - [ ] No large binary files (unless using Git LFS)
  - [ ] README displays correctly

---

## 🚨 AFTER UPLOAD CHECKLIST

If you accidentally uploaded sensitive data:

1. **Immediately rotate credentials:**
   - [ ] Regenerate Firebase project keys
   - [ ] Reset API keys in Firebase Console
   - [ ] Change any exposed passwords

2. **Remove from GitHub history** (if available):
   ```bash
   # Install git-secrets
   npm install -g git-secrets
   
   # Scan history
   git-secrets --scan
   
   # Use BFG Repo-Cleaner for large files
   bfg --delete-file src/ml/gesture_model.h5
   ```

3. **Document incident** in SECURITY.md

4. **Add pre-commit hooks** to prevent future issues:
   ```bash
   npm install husky lint-staged --save-dev
   npx husky install
   ```

---

## 📋 SUMMARY TABLE

| Item | Category | Status | Action |
|------|----------|--------|--------|
| `src/config/firebase.js` | 🔴 Critical | ⚠️ EXPOSED | Replace with env vars |
| `.env*` files | 🔴 Critical | —— | Add to .gitignore |
| `src/ml/gesture_model.h5` | 🔴 Large Binary | —— | Add to .gitignore (>50MB) |
| `node_modules/` | 🟡 Build | —— | Add to .gitignore |
| `src/ml/venv/` | 🟡 Environment | —— | Add to .gitignore |
| `.vscode/` | 🟡 Editor | —— | Add to .gitignore |
| `*.BACKUP*` files | 🟠 Optional | —— | Delete (cleanup) |
| Legacy code | 🟠 Optional | —— | Review & clean |
| `README.md` | ✅ Essential | ✅ Present | Add if missing |
| `LICENSE` | ✅ Essential | ✅ MIT | Add if missing |

---

**Last Updated:** April 2026  
**Version:** 1.0  
**Status:** Ready for Review

---

## 📞 Questions?

If unsure about any item:
- Consult GitHub's [Security Best Practices](https://docs.github.com/en/code-security)
- Review [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- Check project documentation
