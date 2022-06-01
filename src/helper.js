// helper functions

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomElem(array) {
    return array[randomInt(array.length)]
}