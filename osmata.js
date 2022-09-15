/**
 * Copyright ©️ 2021 aerocyber
 * https://github.com/aerocyber/osmata.js
 * Licensed under the terms of MIT License.
 */

/**
 * Type checker.
 * Check types as osmata is all depended on types.
 *
 * See spec: https://aerocyber.github.io/osmata-spec
 */
function checkType(toCheck, expected) {
  if (toCheck === undefined || expected === undefined) {
    return {
      Status: "Error",
      Remark: "toCheck or expected type was not defined.",
      Return: [this],
    };
  }

  let _type = typeof toCheck;

  if (Array.isArray(toCheck)) {
    _type = "array";
  }

  _type.toLowerCase();

  if (_type === expected.toLowerCase()) {
    return {
      Status: "Success",
      Remark: toCheck + " is of expected type.",
      Return: [true],
    };
  }

  return {
    Status: "Fail",
    Remark: toCheck + " is not of expected type.",
    Return: [false],
  };
}

/**
 *
 * Validate a URL.
 */
function isValidUrl(url) {
  if (!checkType(url, "string")) {
    return {
      Status: "Error",
      Remark: "The url must be a string.",
      Return: [this],
    };
  }

  try {
    let _url = new URL(url);
  } catch (error) {
    return {
      Status: "Fail",
      Remark: "Invalid URL",
      Return: [false],
    };
  }
  return {
    Status: "Success",
    Remark: "Valid URL",
    Return: [true],
  };
}

/**
 * Osmation class.
 * This class is the basis of Osmata.
 * This class ensures the type of each records and thus makes it easy not to forget the typings.
 * Throws errors if type checks fail.
 * Type checks are enforced strictly.
 */
class Osmation {
  constructor(name, url, categories = []) {
    if (!checkType(name, "string")["Return"][0] && name.length > 0) {
      this.name = name;
    } else {
      if (name.length < 1) {
        return {
          Status: "Error",
          Remark: "At least ONE character must be present for name.",
          Return: [this],
        };
      } else {
        return {
          Status: "Error",
          Remark: "The name must be a string.",
          Return: [this],
        };
      }
    }
    if (!checkType(url, "string")["Return"][0] && url.length > 0) {
      if (isValidUrl(url)["Return"][0]) {
        this.url = url;
      } else {
        return {
          Status: "Error",
          Remark: "The url must be a string.",
          Return: [this],
        };
      }
    } else {
      if (url.length < 1) {
        return {
          Status: "Error",
          Remark: "Invalid url.",
          Return: [this],
        };
      } else {
        return {
          Status: "Error",
          Remark: "The url must be a string.",
          Return: [this],
        };
      }
    }
    if (!checkType(categories, "array")["Return"][0]) {
      this.categories = categories;
      for (let item in this.categories) {
        if (!checkType(item, "string")["Return"][0]) {
          let _index = this.categories.indexOf(item); // Get the index.
          this.categories[_index] = String(item);
        }
      }
    } else {
      return {
        Status: "Error",
        Remark: "The categories must be an array.",
        Return: [this],
      };
    }
  }
}

/**
 * Records class
 * This class is an optional class that can make it easy to manage records.
 * This class accepts multiple records of type Osmation and includes methods to add/remove/edit records individually.
 */
// Used by the official version of Osmata since its stable 1.0 version (1.0.0-stable)
class Records {
  records = [];

  constructor() {}

  addRecord(record) {
    /// Add an element to the record.

    if (!(record instanceof Osmation)) {
      return {
        Status: "Error",
        Remark: "The record must be created with the class Osmation.",
        Return: [this],
      };
    } else {
      for (let _record in this.records) {
        if ((record.name === _record.name) || (record.url === _record.url)) {
          return {
            "Status": "Fail",
            "Remark": "Record with same name/url s already present in the db.",
            "Returner": [this]
          };
        }
      }
      this.records.push(record);
    }
  }

  removeRecordByName(name) {
    /// Remove an element from the record based on the name.
    if (!checkType(name, "string")["Return"][0]) {
      return {
        Status: "Error",
        Remark: "The name must be a string.",
        Return: [this],
      };
    }
    for (let record in this.records) {
      if (record.name === name) {
        let _ = this.records.splice(this.records.indexOf(record));
        break;
      }
    }
    if (returner.length === 0) {
      return {
        "Status": "Fail",
        "Remark": "Not found.",
        "Return": [this]
      };
    }
    return {
      "Status": "Success",
      "Remark": "Found.",
      "Return": [this]
    };
  }

  removeRecordByUrl(url) {
    /// Remove an element from the record based on the url.
    if (!checkType(url, "string")["Return"][0]) {
      return {
        Status: "Error",
        Remark: "The url must be a string.",
        Return: [this],
      };
    }

    if (!isValidUrl(url)) {
      return {
        Status: "Error",
        Remark: "Invalid url.",
        Return: [this],
      };
    }

    for (let record in this.records) {
      if (record.url === url) {
        let _ = this.records.splice(this.records.indexOf(record));
      }
    }
    return {
      "Status": "Fail",
      "Remark": "Not found.",
      "Return": this
    };
  }

  filterByCategory(categories = []) {
    /// Fetch records with categories.

    let returner = {};

    if (!checkType(categories, "array")["Return"][0]) {
      cat = categories;
      for (let item in cat) {
        if (!checkType(item, "string")["Return"][0]) {
          let _index = catindexOf(item); // Get the index.
          cat[_index] = String(item);
        }
      }
    } else {
      return {
        Status: "Error",
        Remark: "The categories must be an array.",
        Return: [this],
      };
    }

    if (categories.length === 0) {
      return {
        "Status": "Success",
        "Remark": "Found.",
        "Return": [this.records, this]
      };
    }

    for (let record in this.records) {
      for (let category in categories) {
        if (category in record.categories) {
          if (!returner[category]) {
            returner[category] = [];
          }
          returner[category].push(record);
        }
      }
    }
    if (returner.keys().length === 0) {
      return {
        "Status": "Fail",
        "Remark": "Not found.",
        "Return": [this]
      };
    }
    return {
      "Status": "Success",
      "Remark": "Found.",
      "Return": [returner, this]
    };
  }

  getByName(name) {
    let returner = []
    if (!checkType(name, "string")["Return"][0]) {
      return {
        Status: "Error",
        Remark: "The name must be a string.",
        Return: [this],
      };
    }
    for (let record in this.records) {
      if (record.name === name) {
        returner.push(record);
        break;
      }
    }
    if (returner.length === 0) {
      return {
        "Status": "Fail",
        "Remark": "Not found.",
        "Return": [this]
      };
    }
    return {
      "Status": "Success",
      "Remark": "Found.",
      "Return": [returner, this]
    };
  }

  getByUrl(url) {
    let returner = []
    if (!checkType(url, "string")["Return"][0]) {
      return {
        Status: "Error",
        Remark: "The url must be a string.",
        Return: [this],
      };
    }

    if (!isValidUrl(url)) {
      return {
        Status: "Error",
        Remark: "Invalid url.",
        Return: [this],
      };
    }

    for (let record in this.records) {
      if (record.url === url) {
        returner.push(record);
        break;
      }
    }
    if (returner.length === 0) {
      return {
        "Status": "Fail",
        "Remark": "Not found.",
        "Return": [this]
      };
    }
    return {
      "Status": "Success",
      "Remark": "Found.",
      "Return": [returner, this]
    };
  }
}

export { checkType, isValidUrl, Osmation, Records };