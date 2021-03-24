function checkForUrl(inputText) {
    console.log("::: Running checkForUrl :::", inputText);
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regexp = new RegExp(expression);
    
    return regexp.test(inputText);
}

export { checkForUrl }