const HEADER_ROW = 2;

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: "Macro review write-back is ready." }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const payloadText = e && e.parameter && e.parameter.payload;
  if (!payloadText) {
    return jsonResponse({ ok: false, error: "Missing payload." });
  }

  const payload = JSON.parse(payloadText);
  const updates = payload.updates || [];
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const lastColumn = sheet.getLastColumn();
  const headers = sheet.getRange(HEADER_ROW, 1, 1, lastColumn).getValues()[0];
  const columnByName = {};
  headers.forEach((header, index) => columnByName[String(header).trim()] = index + 1);

  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);
  try {
    updates.forEach(update => {
      const row = Number(update.row);
      if (!row || row <= HEADER_ROW) return;
      setIfColumnExists(sheet, columnByName, row, "Decision", update.decision);
      setIfColumnExists(sheet, columnByName, row, "Updated Name", update.updatedName);
      setIfColumnExists(sheet, columnByName, row, "Updated Macro", update.updatedMacro);
      setIfColumnExists(sheet, columnByName, row, "Update Approved", update.updateApproved);
      setIfColumnExists(sheet, columnByName, row, "Update Made", update.updateMade);
      setIfColumnExists(sheet, columnByName, row, "Date Updated", update.dateUpdated);
    });
  } finally {
    lock.releaseLock();
  }

  return jsonResponse({ ok: true, updated: updates.length });
}

function setIfColumnExists(sheet, columnByName, row, columnName, value) {
  const column = columnByName[columnName];
  if (!column || value === undefined) return;
  sheet.getRange(row, column).setValue(value);
}

function jsonResponse(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
