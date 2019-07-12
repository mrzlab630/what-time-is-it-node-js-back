'use strict';

import 'dotenv/config';
import { Client } from 'pg';


const ConnectToPostgres = async (query,callBack) =>{
    try {

        console.log('Get connection to db...');

        const client = new Client({
                                        user: process.env.DB_PSTG_USER,
                                        host: process.env.DB_PSTG_HOST,
                                        database: process.env.DB_PSTG_NAME,
                                        password: process.env.DB_PSTG_PASS,
                                        port: process.env.DB_PSTG_PORT,
                                    });

        await client.connect();

        const res = await client.query(query);


        if(res.error){
            throw new Error(res);
            return;
        }

        await client.end();

        callBack(res);

    }catch (e) {
        callBack({error:{id:'postgres',data:e}})
    }
};


export default ConnectToPostgres;