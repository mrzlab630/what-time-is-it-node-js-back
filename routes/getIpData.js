'use strict';

import 'dotenv/config';
import requestIp from 'request-ip';
import ConnectToPostgres from '../src/connection-postgres';



const getIpData = async (req, res) =>{

    try {

        if(!req.headers.gtoken){
            throw new Error(`{"error":{"message":"gToken not found"}}`);
            return;
        }
        if (req.headers.gtoken !== process.env.GTOKEN) {
            throw new Error(`{"error":{"message":"gToken not correct"}}`);
            return;
        }

   //     const postData = req.body ? JSON.parse(req.body) : null;

        const defIp = process.env.HOST;

        const ipIn = requestIp.getClientIp(req);

        const ipO = ipIn ? ipIn  : defIp ;

        const ip  = ipO === '192.168.2.17' ? defIp.split('.', 2).join('.') : ipO.split('.', 3).join('.');

        const foundIpCallBack = (d) =>{

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(d.rows));
        };


        const foundIpQuery = `SELECT t1.*, t2.* FROM locations_en t1 
                                INNER JOIN (SELECT * FROM blocks_ip_ip4 WHERE network LIKE '${ip}%' LIMIT 1) 
                                t2 ON t1.geoname_id = t2.geoname_id`;


        const foundIp = await ConnectToPostgres(foundIpQuery,foundIpCallBack);






    }catch (err) {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(err.message);
    }



};


export default getIpData;