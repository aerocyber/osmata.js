# osmata.js

JS bindings for osmata.

## About

```
Version (latest): 1.0.0
Author: aerocyber
Npm version: 1.0.0
LICENSE: MIT License.
Full License text: See LICENSE file or [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)
```

## Installation

```bash
npm install osmata
```

## Docs

osmata.js can take care of most of the records-related actions: add, delete. 

### Usage

```javascript
import { Osmation, Records } from "osmata";

let osmataObj = Osmation('name', 'https://example.com', ['categories', 'are', 'arrays']);
let Rec = Records();
Rec.addRecord(osmataObj);
```

## Classes

### Osmation

This class is used for creating a record (internally referred to as element/record).
Requires a `name` and `url`. `categories` is optional and if absent, will use an empty `Array`.

Usage:

```js
var osmationObj = new Osmation("name", "https://example.com");
```

### Records

This class returns an object that can do various tasks.

Usage:
```js
let records = new Records();
```

#### Add data

Data can be added using the `addRecord` method.
`addRecord` requires a record of type `Osmation` which can be created using the class `Osmation`. [See above](#osmation)

Usage:
```js
records.addRecord(osmationObj);
```

If success, returns nothing, else returns an Object with the keys: `Status`, `Remark` and `Return`.

#### Remove Data

Removal of data can be done on the basis of `name` and `url`.

If success, returns nothing, else returns an Object with the keys: `Status`, `Remark` and `Return`.

##### removeRecordByName

Accepting `name`, it looks into the records. If found, removes the record with the found `name`.

Usage:
```js
records.removeRecordByName("name");
```

##### removeRecordByUrl

Accepting `name`, it looks into the records. If found, removes the record with the found `name`.

Usage:
```js
records.removeRecordByUrl(url);
```

#### Edit data

First, remove the data. Then, add the new data.

#### Filter by categories.

It is possible to fetch multiple records at once based on categories by using `filterByCategory` method. Accepts `categories` of type `Array`.

Usage:
```js
let dataset = records.filterByCategory([]);
```

**Note**
It is to be noted that if an empty `Array` is provided, instead of an `Object` with the `category` as key and matching records as value, an `Array` of ALL records will be returned.

If success, returns nothing, else returns an Object with the keys: `Status`, `Remark` and `Return`.

#### Get data

It is possible to get data based on `name` and `url`.

If success, returns nothing, else returns an Object with the keys: `Status`, `Remark` and `Return`.

##### getByName

Get data based on `name`. Accepts `name` which must be `string`.

Usage:
```js
let dataByName = records.getByName("name");
```

##### getByUrl

Get data based on `url`. Accepts `url` which must be `string`.

Usage:
```js
let DataByUrl = records.getByUrl("https://example.com");
```
