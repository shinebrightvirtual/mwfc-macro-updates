# MWFC Macro Review

An HTML app for reviewing macro updates from the MWFC Google Sheet.

## What It Does

- Loads macro records from the published Google Sheet
- Shows search and filters for decision, current use, and approval status
- Displays current macro text beside editable updated macro text
- Shows Bonnie's recommendation and currently-used status
- Lets reviewers approve updates locally
- Exports an updated CSV
- Sends approved updates back to Google Sheets through the connected Apps Script helper

## Files

- `index.html` - the review app
- `google-sheets-web-app.gs` - Google Apps Script helper for writing approvals back to the editable spreadsheet

## Local Preview

Open `index.html` in a browser, or run a small local web server from this folder and visit the local URL.

## Google Sheets Write-Back

The published Google Sheets link is read-only, so approvals are sent back through a Google Apps Script web app. The current app already includes the deployed write-back URL.

If the Apps Script is redeployed later:

1. Open the editable Google Sheet.
2. Go to Extensions > Apps Script.
3. Paste the contents of `google-sheets-web-app.gs`.
4. Deploy it as a web app.
5. Copy the web app URL.
6. Open the review app, choose Sheet Connection, and paste that URL, or update `DEFAULT_SHEET_ENDPOINT` in `index.html`.
