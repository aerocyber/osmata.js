/**
 * Copyright ©️ 2021 aerocyber
 * https://github.com/aerocyber/osmata.js
 * Licensed under the terms of MIT License.
 */

// Language: javascript

// Built-In Error Check: Types.
function checkTypeMatch(variable, expectedType) {
  if (type(databaseObject) != expectedType) {
    return {
      Code: {
        Status: "Error",
        Type: "TypeError",
        On: variable,
      },
    };
  }
  return true;
}

// Feature: Search for a specific url based on the name property.
function search(name, databaseObject) {
  if (checkTypeMatch(name, "String") != true) {
    return checkTypeMatch(name, "String");
  } else if (checkTypeMatch(databaseObject, "Object") != true) {
    return checkTypeMatch(databaseObject, "Object");
  }
}

// Feature: Add a new Osmation to DB.
function add(name, url, databaseObject, categories = []) {
  if (checkTypeMatch(name, "String") != true) {
    return checkTypeMatch(name, "String");
  } else if (checkTypeMatch(url, "String") != true) {
    return checkTypeMatch(url, "String");
  } else if (checkTypeMatch(categories, "Array") != true) {
    return checkTypeMatch(categories, "Array");
  }
  x = false;
  for (var key in databaseObject) {
    if (databaseObject[key] == url) {
      return {
        Code: {
          Status: "Error",
          Type: "URL Exists",
          On: url,
        },
      };
    } else if (key == name) {
      return {
        Code: {
          Status: "Error",
          Type: "Name Exists",
          On: name,
        },
      };
    }
  }
  databaseObject[name] = {
    URL: url,
    Categories: categories,
  };
  return {
    Code: {
      Status: "Success",
      Type: "Added",
      On: name,
    },
  };
}

// Feature: Delete an existing Osmation by name.
function del(name, databaseObject) {
  if (checkTypeMatch(name, "String") != true) {
    return checkTypeMatch(name, "String");
  } else if (checkTypeMatch(databaseObject, "Object") != true) {
    return checkTypeMatch(databaseObject, "Object");
  }
  for (var key in databaseObject) {
    if (databaseObject[key] == name) {
      delete databaseObject[key];
      return {
        Code: {
          Status: "Success",
          Type: "Deleted",
          On: name,
        },
      };
    }
  }
  return {
    Code: {
      Status: "Error",
      Type: "Not Found",
      On: name,
    },
  };
}

// Feature: Update an existing Osmation.
function updation(name, url, databaseObject, categories = []) {
  if (checkTypeMatch(name, "String") != true) {
    return checkTypeMatch(name, "String");
  } else if (checkTypeMatch(url, "String") != true) {
    return checkTypeMatch(url, "String");
  } else if (checkTypeMatch(categories, "Array") != true) {
    return checkTypeMatch(categories, "Array");
  }
  if (name in databaseObject) {
    delete databaseObject[name];
    return add(name, url, databaseObject, categories);
  } else {
    return add(name, url, databaseObject, categories);
  }
}

// Feature: Export the DB as omio strucured JSON string.
function exportOmio(DBObject) {
  if (checkTypeMatch(DBObject, "Object") != true) {
    return checkTypeMatch(DBObject, "Object");
  }
  var db = {
    Header: {
      "Omio Version": "2.0",
    },
    Data: data,
    Footer: {
      "End of DB": true,
    },
  };
  return JSON.stringify(db);
}

// Feature: Import omio DB to DB.
function importOmio(DBObject, omioJSONString) {
  var db = JSON.parse(omioJSONString);
  if (checkTypeMatch(DBObject, "Object") != true) {
    return checkTypeMatch(DBObject, "Object");
  } else if (checkTypeMatch(omioJSONString, "String") != true) {
    return checkTypeMatch(omioJSONString, "String");
  }
  if (db.Header["Omio Version"] < "2.0") {
    return {
      Code: {
        Status: "Error",
        Type: "Invalid Version",
        On: "Omio",
      },
    };
  }

  var dbData = db.Data;

  var dbData = JSON.parse(dbData);
  for (var key in dbData) {
    // If the key is not in the DB, add it.
    if (DBObject[key] == undefined) {
      DBObject[key] = dbData[key];
    }
  }
  return {
    Code: {
      Status: "Success",
      Type: "Imported",
      On: DBObject,
    },
  };
}

// Feature: Open omio string.
function openOmio(OmioString) {
  var db = JSON.parse(omioJSONString);
  if (checkTypeMatch(DBObject, "Object") != true) {
    return checkTypeMatch(DBObject, "Object");
  } else if (checkTypeMatch(omioJSONString, "String") != true) {
    return checkTypeMatch(omioJSONString, "String");
  }
  if (db.Header["Omio Version"] != "2.0") {
    return {
      Code: {
        Status: "Error",
        Type: "Invalid Version",
        On: "Omio",
      },
    };
  }

  var dbData = db.Data;

  var dbData = JSON.parse(dbData);
  return {
    Code: {
      Status: "Success",
      Type: "Opened",
      On: dbData,
    },
  };
}
