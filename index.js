/**
 * Copyright ©️ 2021 aerocyber
 * https://github.com/aerocyber/osmata.js
 * Licensed under the terms of MIT License.
 */

// Type Checks.
function checkType(variable, expectedType) {
    if (typeof(variable).toLowerCase() == expectedType.toLowerCase()) {
        if (typeof(variable) == 'Object') {
            if (variable instanceof expectedType) {
                return true;
            }
        }
        return true;
    }
    return false;
}

// Add osmation
function addOsmation(db, name, url, category = []) {
    if (!checkType(db, 'Array')) {
        return {
            "Status": false,
            "Reason": "Invalid type on db.",
            "Expected": "Array"
        }
    }
    if (!checkType(name, 'string')) {
        return {
            "Status": false,
            "Reason": "Invalid type on name.",
            "Expected": "string"
        }
    }
    if (!checkType(url, 'string')) {
        return {
            "Status": false,
            "Reason": "Invalid type on url.",
            "Expected": "string"
        }
    }
    if (!checkType(category, 'Array')) {
        return {
            "Status": false,
            "Reason": "Invalid type on category.",
            "Expected": "Array"
        }
    }

    db.push(
        {
            "Name": name,
            "URL": url,
            "Category": category
        }
    );
}

// Remove osmation
function removeOsmation(db, name, url, category) {
    if (!checkType(db, 'Array')) {
        return {
            "Status": false,
            "Reason": "Invalid type on db.",
            "Expected": "Array"
        }
    }
    if (!checkType(name, 'string')) {
        return {
            "Status": false,
            "Reason": "Invalid type on name.",
            "Expected": "string"
        }
    }
    if (!checkType(url, 'string')) {
        return {
            "Status": false,
            "Reason": "Invalid type on url.",
            "Expected": "string"
        }
    }
    if (!checkType(category, 'Array')) {
        return {
            "Status": false,
            "Reason": "Invalid type on category.",
            "Expected": "Array"
        }
    }

    var _removed = db.splice(
        db.indexOf(
            {
                "Name": name,
                "URL": url,
                "Category": category
            }
        )
    );
    if (_removed !== -1) {
        return {
            "Status": true,
            "Returns": _removed
        }
    }
    return {
        "Status": false,
        "Reason": '{"Name": $name, "URL": $url, "Category": $category} Not found in db.',
        "Expected": "Entry present."
    }
}

// Edit osmation
function editOsmation(db, old_name, new_name, url, category = []) {
    if (!checkType(db, 'Array')) {
        return {
            "Status": false,
            "Reason": "Invalid type on db.",
            "Expected": "Array"
        }
    }
    if (!checkType(old_name, 'string')) {
        return {
            "Status": false,
            "Reason": "Invalid type on name.",
            "Expected": "string"
        }
    }
    if (!checkType(new_name, 'string')) {
        return {
            "Status": false,
            "Reason": "Invalid type on name.",
            "Expected": "string"
        }
    }
    if (!checkType(url, 'string')) {
        return {
            "Status": false,
            "Reason": "Invalid type on url.",
            "Expected": "string"
        }
    }
    if (!checkType(category, 'Array')) {
        return {
            "Status": false,
            "Reason": "Invalid type on category.",
            "Expected": "Array"
        }
    }

    var present = 0;
    for (let x; x < db.length; x++) {
        if (db[x].URL == url) {
            present = 1;
            break;
        }
    }

    if (present) {
        return {
            "Status": false,
            "Reason": "$url is present in db already.",
            "Expected": "Absence of $url in db."
        }
    }

    var repl = 0;

    for (let x; x < db.length; x++) {
        if (db[x].Name == old_name) {
            repl = 1;
            db[x] = {
                "Name": new_name,
                "URL": url,
                "Category": category
            }
            break;
        }
    }

    if (repl) {
        return {
            "Status": true,
            "Returns": db
        }
    }

    return {
        "Status": false,
        "Reason": "Entry with $old_name not found.",
        "Expected": "An entry with key $old_name."
    }
}

// Create omio file
function createOmio(db) {
    if (!checkType(db, 'Array')) {
        return {
            "Status": false,
            "Reason": "Invalid type on db.",
            "Expected": "Array"
        }
    }
    header = {
        "Omio Version": "2.0.1",
        "Extra Data": {
            "Omio spec": "https://github.com/aerocyber/osmata-spec/blob/main/README.md"
        }
    };
    data = JSON.stringify(db);
    footer = {
        "End of DB": true
    }
    return {
        "Status": true,
        "Returns": {
            "Header": header,
            "Data": data,
            "Footer": footer
        }
    }
}

module.exports = { 
    addOsmation: addOsmation,
    removeOsmation: removeOsmation, 
    editOsmation: editOsmation,
    createOmio: createOmio
};
