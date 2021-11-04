/**
* Copyright ©️ 2021 aerocyber 
* https://github.com/aerocyber/osmata.js
* Licensed under the terms of MIT License. 
*/ 

// Check: name in data
function checkforName(data, name){
    if ((name === null)||(name === undefined)){
        return {
            "Status": "Error",
            "Detail": "name is required"
        };
    }
    if ((data === undefined)||(data === null)){
        return {
            "Status": "Error",
            "Detail": "data is required"
        };
    }
    if (typeof(data) != "object"){
        return {
            "Status": "Error",
            "Detail": "data must be an array"
        };
    }

    for (let x = 0; x < data.length; x++) {
        if (data[x]["Name"] == name){
            return {
                "Status": "Success",
                "Detail": data[x]
            };
        }
    }
    return {
        "Status": "Fail",
        "Detail": name + " is not found"
    };
}

// Check: url in data
function checkforUrl(data, url){
    if ((data === null)||(url === undefined)){
        return {
            "Status": "Error",
            "Detail": "url is required"
        };
    }
    if ((data === undefined)||(data === null)){
        return {
            "Status": "Error",
            "Detail": "data is required"
        };
    }
    if (typeof(data) != "object"){
        return {
            "Status": "Error",
            "Detail": "data must be an array"
        };
    }

    for (let x = 0; x < data.length; x++) {
        if (data[x]["Url"] == url){
            return {
                "Status": "Success",
                "Detail": data[x]
            };
        }
    }
    return {
        "Status": "Fail",
        "Detail": url + " is not found"
    };
}

// Feature Add Osmation
function osmate(data, name, url, category) {
    let chname = checkforName(data, name);
    let churl = checkforUrl(data, url);
    if (chname["Status"] == "Success") {
        return {
            "Status": "Fail",
            "Detail": name + " is existing"
        };
    } else if (churl["Status"] == "Success") {
        return {
            "Status": "Fail",
            "Detail": url + " is existing"
        };
    } else if (chname["Status"] == "Error"){
        return {
            "Status": "Error",
            "Detail": chname["Detail"]
        };
    } else if (churl["Status"] == "Error") {
        return {
            "Status": "Error",
            "Detail": churl["Detail"]
        };
    } else {
        let cat;
        if ((typeof(category) != "object") || (category === undefined) || (category === null)) {
            cat = [];
        } else {
            cat = category;
        }
        let db = {
            "Name": name,
            "Url": url,
            "Category": cat
        };
        _ = data.push(db);
        return {
            "Status": "Success",
            "Detail": data
        };
    }
}

// Feature Remove Osmation 
function deosmate(name, data){
    let chname = checkforName(data, name);
    if (chname["Status"] == "Fail") {
        return {
            "Status": "Fail",
            "Detail": name + " is not existing"
        };
    } else if (chname["Status"] == "Error"){
        return {
            "Status": "Error",
            "Detail": chname["Detail"]
        };
    } else {
        delete data[data.indexOf(chname["Detail"])];
        return {
            "Status": "Success",
            "Detail": data
        };
    }
}

// Feature Retrieve Osmata spec version followed 
function getSpecVersion(){
    return {
        "Status": "Success", 
        "Detail": "osmata-spec version 1.0"
    };
}

// Feature Get Url by name
function getUrl(name, data){
    let chname = checkforName(data, name);
    if (chname["Status"] == "Fail") {
        return {
            "Status": "Fail",
            "Detail": name + " is not existing"
        };
    } else if (chname["Status"] == "Error"){
        return {
            "Status": "Error",
            "Detail": chname["Detail"]
        };
    } else {
        return {
            "Status": "Success",
            "Detail": data[data.indexOf(chname["Detail"])]
        };
    }
}

// Feature Edit name
function editName(data, oldName, newName){
    let chnameold = checkforName(data, oldName);
    let chnamenew = checkforName(data, newName);
    if (chnameold["Status"] == "Success") {
        return {
            "Status": "Fail",
            "Detail": oldName + " is existing"
        };
    } else if (chnamenew["Status"] == "Success") {
        return {
            "Status": "Fail",
            "Detail": newName + " is existing"
        };
    } else if (chnameold["Status"] == "Error"){
        return {
            "Status": "Error",
            "Detail": chnameold["Detail"]
        };
    } else if (chnamenew["Status"] == "Error") {
        return {
            "Status": "Error",
            "Detail": chnamenew["Detail"]
        };
    } else {
        data[data.indexOf(chnameold["Detail"])] = newName;
        return {
            "Status": "Success",
            "Detail": data
        };
    }
}

// Feature Edit Url
function editUrl(data, name, newUrl){
    let churlold = checkforName(data, name);
    let churlnew = checkforUrl(data, newUrl);
    if (churlold["Status"] == "Fail") {
        return {
            "Status": "Fail",
            "Detail": name + " is not existing"
        };
    } else if (churlnew["Status"] == "Success") {
        return {
            "Status": "Fail",
            "Detail": newUrl + " is existing"
        };
    } else if (churlold["Status"] == "Error"){
        return {
            "Status": "Error",
            "Detail": churlold["Detail"]
        };
    } else if (churlnew["Status"] == "Error") {
        return {
            "Status": "Error",
            "Detail": churlnew["Detail"]
        };
    } else {
        data[data.indexOf(churlold["Detail"])] = newUrl;
        return {
            "Status": "Success",
            "Detail": data
        };
    }
}
