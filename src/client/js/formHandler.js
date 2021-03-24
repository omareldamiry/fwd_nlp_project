function handleSubmit(event) {
    event.preventDefault();

    let formText = document.getElementById('name').value;
    let results = document.querySelector('#results');
    
    if(!Client.checkForUrl(formText)) {
      console.log(`::: ${formText} is NOT a url :::`);
      results.innerHTML = "Invalid url. please enter a valid url";
      return;
    }

    console.log("::: Form Submitted :::");
    
    // fetch('http://localhost:8081/test')
    // .then(res => res.json())
    // .then(function(res) {
    //     document.getElementById('results').innerHTML = res.message
    // });

    results.innerHTML = "Loading ...";
    postData('http://localhost:8081/add-url', { url: formText })
    .then(data => {
      console.log("::: Results are fetched :::");
      results.innerHTML = data.result;
    });
}

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}



export { handleSubmit }