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

    results.innerHTML = "Loading ...";
    postData('http://localhost:8081/add-url', { url: formText })
    .then(data => {
      console.log("::: Results are fetched :::");
      results.innerHTML = data.result;
    });
}

async function postData(url = '', data = {}) {

  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return response.json();
}



export { handleSubmit }