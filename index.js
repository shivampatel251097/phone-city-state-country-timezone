"use strict";

const timeZoneMap = require('./data/cityMap.json');

// Find by field

const findTimeZoneByField = function(searchField, searchString){
    const filteredDataByField = timeZoneMap.filter((elem) => elem[searchField.toLowerCase()].toLowerCase() === searchString.toLowerCase());
    if(filteredDataByField && filteredDataByField.length) {
        return filteredDataByField;
    }
    else{
        return [];
    }
}

const lookupByCountry = function(searchString){
    return findTimeZoneByField('country',searchString);
}

const lookupByProvince = function(searchString){
    return findTimeZoneByField('province',searchString);
}

const lookupByCity = function(searchString){
    return findTimeZoneByField('city',searchString);
}

const lookupByISOCode = function(searchString){
    return lookupByMultipleFields(['iso2', 'iso3'],searchString);
}

// function findPartialMatch(itemsToSearch, searchString) {
//     const searchItems = searchString.split(" ");
//     const isPartialMatch = searchItems.every((elem) => {
//         return itemsToSearch.includes(elem.toLowerCase());
//     });
//     return isPartialMatch;
// }

const lookupByMultipleFields = function(searchFields, searchString) {
    const filteredDataByMultipleField = timeZoneMap.filter((elem) => {
        const searchFieldValues = searchFields.map((entity) => elem[entity.toLowerCase()]).join().toLowerCase();
        const searchItems = searchString.split(' ');
        // return findPartialMatch(searchFieldValues, searchString);
        return searchItems.every((elem) => searchFieldValues.includes(elem.toLowerCase()));
    });
    if(filteredDataByMultipleField && filteredDataByMultipleField.length) {
        return filteredDataByMultipleField;
    }
    else{
        return [];
    }

}

console.log(lookupByISOCode('IND'));

module.exports = {
lookupByCity,
lookupByCountry,
lookupByISOCode,
lookupByMultipleFields,
lookupByProvince,
timeZoneMap
};