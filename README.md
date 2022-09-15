# osmata.js

JS bindings for osmata.

## About

Version (latest): 0.1.0
Author: aerocyber
Npm version: 0.1.0
LICENSE: MIT License.
Full License text: See LICENSE file or [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install osmata
```

## Docs

osmata.js acan take care of adding an osmation, editing an osmation, deleting an osmation and creating an omio JSON structure.

### Usage

```javascript
import {
  addOsmation,
  removeOsmation,
  editOsmation,
  createOmio,
} from "osmata.js";
```

### Add data (Osmation): `addOsmation()` function

Function call as: <br>
`addOsmation(db, name, url, category)`

Parameters: <br>

`db`: An `Array` that holds all the other database records (Osmations). <br>

`name` : A `String` that is unique and to which the Osmation URL is matched against. <br>

`url` : A `String` that is unique which is to be stored and is matched against `name`. <br>

`category` : An `Array` that holds the categories to which the Osmation (record) belongs to for those apps that support sorting based on category. If not given, will have an `empty Array` as default value.<br>

### Remove data (Osmation): `removeOsmation()`

Function call as: <br>
`removeOsmation(db, name, url, category)`

Parameters: <br>

`db`: An `Array` that holds all the other database records (Osmations). <br>

`name` : A `String` that is unique and to which the Osmation URL is matched against. <br>

`url` : A `String` that is unique which is to be stored and is matched against `name`. <br>

`category` : An `Array` that holds the categories to which the Osmation (record) belongs to for those apps that support sorting based on category. <br>

### Edit data (Osmation): `editOsmation`

Function call as: <br>
`editOsmation(db, old_name, new_name, url, category = [])`

Parameters: <br>

`db`: An `Array` that holds all the other database records (Osmations). <br>

`old_name` : A `String` that is unique and to which the Osmation URL was matched against and is to be replaced with. <br>

`old_name` : A `String` that is unique and to which the Osmation URL is to be matched against and replaces the old name. <br>

`url` : A `String` that is unique which is to be stored and is matched against `name`. <br>

`category` : An `Array` that holds the categories to which the Osmation (record) belongs to for those apps that support sorting based on category. If not given, will have an `empty Array` as default value.<br>

### Create Omio Structure: `createOmio()`

Function call as: <br>
`createOmio(db)`

Parameters: <br>

`db`: An `Array` that holds all the other database records (Osmations). <br>
