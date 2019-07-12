'use strict';

import 'dotenv/config';
import https from 'https';
import fs from 'fs';
import path from 'path';

import {RoutingActions} from '../routes';


const host = process.env.HOST;
const port = process.env.PORT;

const certDir  =  path.join(__dirname, '..', 'cert');

const  options = {
    key: fs.readFileSync(`${certDir}/privkey.pem`),
    cert: fs.readFileSync(`${certDir}/fullchain.pem`),
};



const server = https.createServer(options,(req, res) => {

    let jsonString;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,gToken");
    res.setHeader('Content-Type', 'application/json');


    req.on('data', (data) => { // Пришла информация - записали.
        jsonString = data;
    });

    req.on('end', () => {// Информации больше нет - передаём её дальше.
        req.body = jsonString;
        RoutingActions(req, res);
    });

});

server.listen(port, host, () => {
    console.log("Server started on port:" + port);
});



