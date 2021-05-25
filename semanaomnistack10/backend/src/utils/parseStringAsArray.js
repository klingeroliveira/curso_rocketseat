
module.exports = function parseStringAsArray(arrayAsString){
    //separa em um array a string, separadas por ','
    //e o map percorre a string e faz um trim
    return arrayAsString.split(',').map(tech => tech.trim());
}