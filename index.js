'use strict';


/** identity: will return the input of whatever aguement is given to it.
* it will not change the value in any way
*
* @param {any data type} input: the value that will be returned by the function
*/

function identity(input){
    return input;
}
module.exports.identity = identity;
/** typeof: will return the type of value that is given to it.
*  It is able to distinguish data types like arrays and dates from
* objects.
*
*@param {any data type} any: the value that will have it's data type
* returned.
*/

function typeOf(any){
    if (Array.isArray(any)){
        return 'array';
    } else if (any === null){
        return 'null';
    } else if (any instanceof Date){
        return 'date';
    } else {
        return (typeof any);
    }
}
module.exports.typeOf = typeOf;
/** first: will retrieve the first number of values from the array given to it
* and return those values in their own array.
* the number is dependant on the second arguement given to it. if no number is
* given, it will only take one value from the array.
*
*@param {array} arr: The array which the value will be taken from
*@param {num} num: (optional) the amount of values that will be taken from
* the array
*/

function first(arr, num){
    if (!Array.isArray(arr)){
        return [];
    } 
    if (!num || typeof num !== 'number'){
        return arr[0];
    } else if (num > arr.length){
        return arr;
    } else {
        return arr.splice(0, num);
    }
}
module.exports.first = first;
/** last: will take a specified amount of values from the back of an array
* and return those values in a new array. The amount taken is dependant
* on the second arguement given to it. If no number is given it will return
* only one value taken from the end of the array.
*
*@param {array} arr: The array which the value will be taken from.
*@param {number} num: (optional) the amount of values that will be taken from
* the array
*/

function last(arr, num){
    if (!Array.isArray(arr) || num < 0){
        return [];
    } else if (!num || typeof num !== 'number'){
        return arr[arr.length-1];
    }
    else if (num > arr.length){
        return arr;
    } else {
        return arr.splice(arr.length - num, num);
    }
}
module.exports.last = last;
/** each: Will take an object or array and a function and will call the function
* for each element in the array or for each value in the object. It can sort
* between an array and an object so it does not need to be specified.
*
*@param {array or object} collection: the object or array for the functions to
* be acted on. If the collection is empty, the function will not be performed.
*@param {function} func: The function that will act on the collection. This
* function will be given the value, the index, and the collection being acted
* on as arguements.
* The function will take the current element, followed by the
* index, then the collection the function is cycling through.
*/

function each(collection, func){
    if (Array.isArray(collection)){
        for (var i = 0; i < collection.length; i++){
          func(collection[i], i, collection);
        }
    }else{
     for (var key in collection){
          func(collection[key], key, collection);
     }   
    }
}
module.exports.each = each;
/** indexOf: This will take an array and a value and check the array for the
* given value, if the value is found in the array, it will return the index
* of the first value given to it, otherwise it will return -1 if the value is
* not found.
*
*@param {array} arr: The array which will be searched for the value.
*@param {any data type} val: The value which will the function will search for.
*/

function indexOf(arr, val){
    for (var i = 0; i < arr.length; i++){
        if (arr[i] === val){
               return i;
       } else if (i == arr.length-1 && arr[arr.length-1] !== val){
       return -1;
     }
    }
}
module.exports.indexOf = indexOf;
/** filter: This will take an array and a function and checks the array for
* any values that return true from that function. The values that pass as true
* will be returned in a new array.
*
*@param {array} arr: The array which the function will act on.
*@param {function} func: The function that will be performed on the array.
* The function will take the current element, followed by the
* index, then the collection the function is cycling through.
*/

function filter(arr, func){
    var tempArr = [];
    each(arr, function(element, index, array){
        if (func(element, index, array)){
            tempArr.push(element);
        }
    });
    return tempArr;
}
module.exports.filter = filter;
/** reject: This will take an array and a function and checks for any values
* that return false from that function. The values that pass as false will
* be returned in a new array.
*
*@param {array} arr: This is the array that the function will act on.
*@param {function} func: This is the function that will be performed on the array.
* The function will take the current element, followed by the
* index, then the collection the function is cycling through.
*/

function reject(arr, func){
    var tempArr = [];
    filter(arr, function(element,index,array){
        if (!func(element,index,array)){
            tempArr.push(element);
        }
    });
    return tempArr;
}
module.exports.reject = reject;
/** partition: This will take in an array and a function, it will return
* a single array with two seperate arrays inside. Any values from the original
* array that passed true through the function will be inside the first array,
* and any that passed as false will be inside the second array.
*
*@param {array} arr: This is the array that the function will act on.
*@param {function} func: this is the function that will be performed on the array.
* The function will take the current element, followed by the
* index, then the collection the function is cycling through.
*/

function partition(arr, func){
    var finalArr = [[],[]];
    each(arr, function(element,index,array){
        func(element,index,array) ? finalArr[0].push(element) : finalArr[1].push(element);
    });
return finalArr;
}
module.exports.partition = partition;
/** unique: This will take an array as it's arguement and will return the array
* with any duplicate values removed.
*
*@param {array} arr: This is the array that will be checked for duplicates.
*/

function unique(arr){
    var tempArr = [];
 each(arr, function(element,index,array){
     if (indexOf(tempArr, element) < 0){
         tempArr.push(element);
     }
 });
    return tempArr;
}
module.exports.unique = unique;
/** map: This will take in either an object or array and a function. 
* The function will be performed on every element in the collection and the
* resulting values will be returned in an array.
*
*@param {object or array} collection: This is the collection that the function
* will cycle through.
*@param {function} func: The function that will be performed on every value.
* The function will take the current element, followed by the
* index, then the collection the function is cycling through.
*/

function map(collection, func){
    var newArr = [];
    each(collection, function(element,index,collection){
        newArr.push(func(element, index, collection));
    });
    return newArr;
}
module.exports.map = map;
/** pluck: This will take in an array of objects and a value. It will cycle
* through the objects and return a new array with any values that have the
* key name of the value that was passed in.
*
*@param {array of objects} arr: This the the array with objects that will be
*individually searched.
*@param {object key} val: This is the key for which values will be taken from
* the objects and returned.
*/

function pluck(arr, val){
    var tempArr = [];
    map(arr, function(element, index, array){
    if (element[val]){
        tempArr.push(element[val]);
    }
});
return tempArr;
}
 module.exports.pluck = pluck;
/** contains: This will take an array and a value and search the array for
* if the value is found, it will return a boolean whether the array contains
* it or not.
*
*@param {array} arr: The array which will be searched for the value.
*@param {value} val: The value that the array will be searched for.
*/

function contains(arr, val){
    if (!val){
        return false;
    }
    return indexOf(arr, val) > -1 ? true :  false;
}
module.exports.contains = contains;
/** every: This will take an object or array and a function. The function will
* be performed on every element in the array and will return true if all
* elements of the collection return a boolean from the function and false if
* even a single element is false. If no function is given, it will check if
* the elements in the collection are truthy or falsy values and return true
* if they are all truthy or false if even a single one is falsy.
*
*@param {array or object} collection: The collection that will be cycled through
* for truth or false values.
*@param {function} func: the function that will be performed on every element
* of the collection. The function will take the current element, followed by the
* index, then the collection the function is cycling through.
*/

function every(collection, func){
    var final = true;
    each(collection, function(element, index, array){
        if (!func && !element){
            final = false;
        } else if (func !== undefined && !func(element, index, array)) {
            final = false;
        }
    });
    return final;
} 
module.exports.every = every;
/** some: This will take in an object or an array and a function, the function
* will be performed on every element of the array and will return true if
* even a single element passes as true. If there is no function given it will
* check the collection for truthy and falsy values, if even a single one is
* truthy, the function returns true.
*
*@param {array or object} collection: The collection of values which the
* function will act on
*@param {function} func: The function which will be performed on every element
* of the collection.
* The function will take the current element, followed by the
* index, then the collection the function is cycling through.
*/

function some(collection, func){
   var final = false;
   each(collection, function(element, index, collection){
        if (!func && element){
            final = true;
        } else if (func !== undefined && func(element, index, collection)){
            final = true;
        }
    });
return final;
}
module.exports.some = some;
/** reduce: Will take an array, a function, and a starting seed. The 
* function will act on every element in the array with the arguements
* previous value, element, and index, with everytime the function returning the 
* prevoius value updating to it's latest. With this function it is possible to
* condense an array of numbers down by adding them all together or by conjoining
* strings and having something in between. This function returns a single value.
*
*@param {array} arr: The array which the function will cycle through.
*@param {function} func: The function which will be performed on the elements,
* this takes the previous value, the current element, and the current index as
* it's arguements.
*@param {value} seed: This is the starting value which the function will take
* if no seed is given, the first element of the array is used.
*/

function reduce(arr, func, seed){
    let total = seed, i = 0;
    if (total === undefined){
        total = arr[0];
        i = 1;
    }
for (; i < arr.length; i++){
    total = func(total, arr[i], i, arr);
}
return total;
}

module.exports.reduce = reduce;
/** extend: This will take objects as it's arguements and returns the first with
* all subsequent object's values inside of it. This can take any number of
* arguements but the first object will be the one they are conjoined into.
*
*@param {object} obj: This is the first object which the subsequent values will
* be added into
*@param {objects} : Past the first arguement, any additional objects will have
* it's values added to the first.
*/

function extend(obj){
    var args = Array.from(arguments);
    each(args, function(element, index, array){
        each(element, function(element,index,collection){
            args[0][index] = element;
        });
    });
    return args[0];
}
module.exports.extend = extend;