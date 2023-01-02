function checkInput(inputObject, regex) {
    if (!regex.test(inputObject)) {
        return false;
    }
    else {
        return true;
    }
}

module.exports = checkInput;