/**
* Copyright ©️ 2021 aerocyber 
* https://github.com/aerocyber/osmata.js
* Licensed under the terms of MIT License. 
*/ 

// Check: name in data
function checkforName(data, name){
    if ((data === null)||(name === undefined)){
        return {
            "Status": "Fail",
            "Detail": "name is required"
        }
    }
}

// Feature Add Osmation
function osmate(data, name, url, category) {}

// Feature Remove Osmation 
function deosmate(name, data){}

// Feature Retrieve Osmata spec version followed 
function getSpecVersion(){
    return {
        "Status": "Success", 
        "Detail": "osmata-spec version 1.0"
    };
}

// Feature Get Url by name
function getUrl(name, data){}

// Feature Edit name
function editName(data, oldName, newName){}

// Feature Edit Url
function editUrl(data, name, newUrl){}
