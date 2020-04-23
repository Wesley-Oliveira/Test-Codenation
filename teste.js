//import axios from 'axios';
const axios = require("axios");
const fs = require("fs");
const sha1 = require ('js-sha1');

let api = axios.create();

api.get('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=4377bf0ac07198445741acfbfab433ec877b6124')
    .then(function(response) {
        let numero_casas = response.data.numero_casas;
        let token = response.data.token;
        let cifrado = response.data.cifrado.toLowerCase();
        let decifrado = response.data.decifrado;
        let resumo_criptografico = response.data.resumo_criptografico;

        // Decriptando
        for(var i = 0; i < cifrado.length; i++)
        {
            let valor = cifrado.charCodeAt(i);

            if(valor <= 122 && valor >= 97)
            {
                if(valor == 97)
                {
                    decifrado += String.fromCharCode(119)
                }
                else if(valor == 98)
                {
                    decifrado += String.fromCharCode(120)
                }
                else if(valor == 99)
                {
                    decifrado += String.fromCharCode(121)
                }
                else if(valor == 100)
                {
                    decifrado += String.fromCharCode(122)
                }
                else
                {
                    if(numero_casas - valor > 0)
                    {   
                        decifrado += String.fromCharCode(numero_casas - valor)
                    }
                    else
                    {
                        decifrado += String.fromCharCode((numero_casas - valor)*-1)
                    }                    
                }
            }
            else
            {
                decifrado += String.fromCharCode(valor);
            }
        }

        //Criando SH1
        sha1(decifrado);
        var hash = sha1.create();
        hash.update(decifrado);
        resumo_criptografico = hash.hex();

        const customer = {
            numero_casas,
            token,
            cifrado,
            decifrado,
            resumo_criptografico
        }

        //Conversão e escrita no arquivo
        const jsonString = JSON.stringify(customer)
        fs.writeFile('./answer.json', jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })
    })
    .catch(function(error) {
        console.warn(error);
    })

//api.post('')
