/**
 * Copyright ©️ 2021 aerocyber
 * https://github.com/aerocyber/osmata.js
 * Licensed under the terms of MIT License.
 */


// Built-In Error Check: Types.
function checkTypeMatch(variable, expectedType){
  if (type(databaseObject) != expectedType) {
    return {
      "Code": {
        "Status": "Error",
        "Type": "TypeError",
        "On": variable,
      },
    };
  }
  return true;
}
// Feature: Search for a specific url based on the name property.
function search(name, databaseObject) {
  if (checkTypeMatch(name, "String") != true){
    return checkTypeMatch(name, "String");
  } else if (checkTypeMatch(databaseObject, "Object") != true){
    return checkTypeMatch(databaseObject, "Object");
  }
}

// Feature: Add a new Osmation to DB.
function add(name, url, databaseObject, categories = []) {
  if (checkTypeMatch(name, "String") != true) {
    return checkTypeMatch(name, "String");
  } else if(checkTypeMatch(url, "String") != true){
    return checkTypeMatch(url, "String");
  }
}

// Feature: Delete an existing Osmation by name.
function del(name, databaseObject) {}

// Feature: Update an existing Osmation.
function updation(name, url, databaseObject, categories = []) {}

// Feature: Export the DB as omio strucured JSON string.
function exportOmio(DBObject, omioPswd = false) {}

// Feature: Import omio DB to DB.
function importOmio(DBObject, omioJSONString, omioPswd = false) {}

// Feature: Open omio string.
function openOmio(OmioString, omioPswd = false) {}

// Feature: Export to HTML (Unencrypted!) file.
function exportHTML(DBObject) {}

// Feature: Import from HTML. ::Warning:: Experimental feature ::Warning-End::
function importHTML(DBObject) {}

// Feature: Export the DB Object to Blob URL. ::Warning:: Experimental feature ::Warning-End::
function exposeAsBlobURL(DataAsString) {}
