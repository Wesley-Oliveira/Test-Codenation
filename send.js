const axios = require("axios");
const fs = require("fs")
const path = require('path');
const FormData = require('form-data');

const url = "https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=4377bf0ac07198445741acfbfab433ec877b6124"

const jsonFile = path.resolve('./answer.json');
const formdata = FormData();        
    formdata.append('answer', fs.createReadStream(jsonFile));

axios.post(url, formdata, {
    headers: formdata.getHeaders()
})
.then(response => {
    console.log(response);
}).catch(error => {
    console.error(error);
});