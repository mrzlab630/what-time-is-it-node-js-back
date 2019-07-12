'use strict';

import 'dotenv/config';

import path from 'path';
import CreateGeoNameDB from '../src/create-geo-name-db';



const crtGeoNameDB = async (req, res) =>{

    const files     =   ['GeoLite2-City-CSV.zip','GeoLite2-City-CSV.zip.md5'];


    const createDbTables = async () => {

        try {

            const dir       =  path.join(__dirname, '..', 'public', 'uploads');
            const connectDb = {
                                    host:process.env.DB_PSTG_HOST,
                                    database:process.env.DB_PSTG_NAME,
                                    port:process.env.DB_PSTG_PORT,
                                    user:process.env.DB_PSTG_USER,
                                    password:process.env.DB_PSTG_PASS,
                                };

            const createGeoNameToBD = new CreateGeoNameDB(connectDb,
                                                            ['en','ru'],
                                                            dir);

            const rew = await createGeoNameToBD.go();

            

            console.log(rew);


            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rew));


        }catch (e) {
            console.log(`err`,e);

            return {error:e}
        }



    };


    createDbTables();




};

export default crtGeoNameDB;