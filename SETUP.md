# MWFC Macro Updates — Setup Guide

This app reads and writes directly to your Google Sheet using the Google Sheets API.
You only need to do this setup once.

---

## Step 1 — Create a Google Cloud Project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click **Select a project** → **New Project**
3. Name it something like `MWFC Macro App` and click **Create**

---

## Step 2 — Enable the Google Sheets API

1. In your project, go to **APIs & Services → Library**
2. Search for **Google Sheets API** and click **Enable**

---

## Step 3 — Create OAuth 2.0 Credentials

1. Go to **APIs & Services → Credentials**
2. Click **+ Create Credentials → OAuth client ID**
3. If prompted, configure the **OAuth consent screen** first:
   - User type: **Internal** (if your Google account is a Workspace org) or **External**
   - App name: `MWFC Macro App`
   - Add your email as a test user if External
4. Back in Create OAuth client ID:
   - Application type: **Web application**
   - Name: `MWFC Macro App`
   - Under **Authorized JavaScript origins**, add the URL where you'll host the app
     (e.g., `https://shinebrightvirtual.github.io` or `http://localhost:8080` for local testing)
   - Click **Create**
5. Copy your **Client ID** — it ends in `.apps.googleusercontent.com`

---

## Step 4 — Configure the App

1. Open the app in your browser
2. Click **⚙ Settings** in the top right
3. Enter:
   - **OAuth Client ID**: your Client ID from Step 3
   - **Spreadsheet ID**: `1Qyv2sr0yOSccNis_OLMEztH3KBl1O73pkw1S6F5-yeo`
   - **Sheet Tab Name**: the name of the tab at the bottom of your spreadsheet (e.g., `Sheet1`)
4. Click **Save & Sign In** — a Google sign-in popup will appear

---

## Hosting Options

### Option A — GitHub Pages (recommended, free)
1. Push this repo to GitHub
2. Go to repo **Settings → Pages**
3. Source: **Deploy from a branch → main / root**
4. Your app will be at `https://shinebrightvirtual.github.io/mwfc-macro-updates/`
5. Add that URL to your OAuth credentials' Authorized JavaScript origins

### Option B — Open locally
- Just open `index.html` directly in Chrome (file:// won't work with OAuth)
- Use a local server: `npx serve .` or Python's `python3 -m http.server 8080`
- Add `http://localhost:8080` to Authorized origins

---

## What Each Button Does

| Button | What it writes to the sheet |
|--------|----------------------------|
| **Save Edits** | Saves your edits to **Updated Name** (col D) and **Updated Macro** (col E) |
| **Approve** | Sets **Update Approved** (col H) to TRUE and **Date Updated** (col J) to today |

Once a row is Approved, the fields lock so no accidental edits happen.

---

## Sharing with the Team

Everyone who uses the app needs to:
1. Open the app URL
2. Click ⚙ Settings and enter the same Client ID and Spreadsheet ID
3. Sign in with their Google account (they need at least Editor access to the sheet)
