/**
 *
 * 1.download geolite2 (https://dev.maxmind.com/geoip/geoip2/geolite2/)
 *  GeoLite2 City CSV from https://geolite.maxmind.com/download/geoip/database/GeoLite2-City-CSV.zip
 *
 * 2. unzip GeoLite2-City-CSV.zip
 *
 * 3.create db
 * 3. insert geolite2 to db
 */

'use strict';

import fs from 'fs';
import request from 'request-promise';
import path from 'path';
import zipper from 'zip-local';
import { Client } from 'pg';

import dbStructure from './structure-db';

export default class CreateGeoNameDB {

    constructor(connectDb ={},
                locations=['en'],
                dir,
                download                = CreateGeoNameDB.__download,
                postgresConnection      = CreateGeoNameDB.__postgresConnection,
                createTableStructure    = CreateGeoNameDB.__createTableStructure,
                unZipArchiveInDir       = CreateGeoNameDB.__unZipArchiveInDir,
                createDbTables          = CreateGeoNameDB.__createDbTables,
                importDataToDb          = CreateGeoNameDB.__importDataToDb,
                ){

        this.url   = 'https://geolite.maxmind.com/download/geoip/database';
        this.file  = 'GeoLite2-City-CSV.zip';
        this.dir   = dir;

        this.host           = connectDb.host;
        this.database       = connectDb.database;
        this.port           = connectDb.port;
        this.user           = connectDb.user;
        this.password       = connectDb.password;
        this.locations      = [...locations,'ipv4','ipv6'];

        this.dbStructure    = dbStructure;

        this.postgresConnection   = postgresConnection;
        this.createTableStructure = createTableStructure;
        this.unZipArchiveInDir    = unZipArchiveInDir;
        this.download             = download;
        this.createDbTables       = createDbTables;
        this.importDataToDb       = importDataToDb;

    }

    static   async  __download(){

        try {

            const urlFile   = `${this.url}/${this.file}`;
            const dirFile   = `${this.dir}/${this.file}`;


            const {statusCode,body}     =  await request({uri:urlFile,
                                                method: "GET",
                                                encoding:null,
                                                resolveWithFullResponse: true });


            if(statusCode !== 200){
                throw 'file no found';
            }


            fs.writeFileSync(dirFile, body);

            if(!fs.existsSync(dirFile)) {
                throw "File not found";
            }

            return {
                id:'download',
                status:fs.existsSync(dirFile),
                url:urlFile,
                dir:this.dir,
                file:this.file,
                size:fs.statSync(dirFile).size
            }


        }catch (error) {
            return ({error:{id:'download',data:error}})
        }



    }

    static   async __postgresConnection(host = 'localhost',database,port = 5432,user,password,query){

        try{

            this.host           = host;
            this.database       = database;
            this.port           = port;
            this.user           = user;
            this.password       = password;
            this.query          = query;


            if(!this.database){
                throw 'not data base name'
            }
            if(!this.user){
                throw 'not user'
            }
            if(!this.password){
                throw 'not password'
            }
            if(!this.query){
                throw 'not query'
            }

            const client = new Client({
                user: this.user,
                host: this.host,
                database: this.database,
                password: this.password,
                port: this.port,
            });

            await client.connect();

            const res = await client.query(this.query);

            if(res.error){
                throw res.error;
            }

            await client.end();

            return res;

        }catch (error) {
            return ({error:{id:'postgresConnection',data:error}})
        }
    }

    static __createTableStructure(tableNames,dbStructure){

        try {

            this.tableNames = tableNames;

            if (!this.tableNames || typeof this.tableNames !== `object` && this.tableNames.length === 0) {
                throw 'tableNames none found'
            }

            this.dbStructure = dbStructure;

            if (!this.dbStructure) {
                throw 'dbStructure none found'
            }

            let querytablData = [];
            let crtLocation = [];
            let tablesDelete = [];

            this.tableNames.forEach(itm => {

                let tablNamePrefix    = (itm === 'ip4' || itm === 'ip6') ? this.dbStructure.data.blocksIP.prefix : this.dbStructure.data.location.prefix;
                let tableData         = (itm === 'ip4' || itm === 'ip6') ? this.dbStructure.data.blocksIP.table  : this.dbStructure.data.location.table;

                tableData.forEach(itmD => {
                    querytablData.push(`${itmD.name} ${itmD.type}`);
                });


                let queryCrt = `CREATE TABLE IF NOT EXISTS ${tablNamePrefix + itm} ( ${querytablData.join(',')});`;

                crtLocation.push({
                    table: tablNamePrefix + itm,
                    data: queryCrt
                });
                tablesDelete.push(tablNamePrefix + itm);

                querytablData = [];

            });


            return {create: crtLocation, delete: tablesDelete};

        }catch (error) {
            return ({error:{id:'createTableStructure',data:error}})
        }

    }

    static __unZipArchiveInDir(){

        try {

            if(!this.dir)    {
                throw 'dir null';
            }
            if(!this.file)  {
                throw 'file null';
            }

            if (!fs.existsSync(this.dir)){
                throw 'no dir';
            }

            if (!fs.existsSync(this.file)){
                throw 'no file';
            }

            zipper.sync.unzip(`${this.dir}/${this.file}`).save(this.dir);

            const unzippedfs = zipper.sync.unzip(`${this.dir}/${this.file}`).memory();

            return {
                id:'unZip',
                file:`${this.dir}/${this.file}`,
                status:true,
                unZipFiles:unzippedfs.contents()
            };


        }catch (error) {
            return ({error:{id:'unZipArchiveInDir',data:error}})
        }

    }

    static async  __createDbTables(host = 'localhost',database,port = 5432,user,password,locations=['en']){

        try{

            this.host           = host;
            this.database       = database;
            this.port           = port;
            this.user           = user;
            this.password       = password;
            this.dbStructure    = dbStructure;
            this.locations      = locations;





            if(!this.dbStructure){
                throw 'dbStructure none found'
            }

            const createTableStructure =  this.createTableStructure(['ip6','ip4',...this.locations],this.dbStructure);

            const deleteTables = createTableStructure.delete;
            const createTables = createTableStructure.create;

            const clean = await this.postgresConnection(this.host,this.database,this.port,this.user,this.password,
                `DROP TABLE IF EXISTS ${deleteTables.join(',')};`);

            if(clean.error){
                throw clean.error;
            }


            let create = [];

            for (let i=0, len=createTables.length; i<len; i++) {


                let result =   await this.postgresConnection(this.host,this.database,this.port,this.user,this.password,createTables[i].data);

                if(result.error){
                    throw result.error;
                }

                create.push({
                    table:createTables[i].table,
                    result
                });

            }

            return {clean,create,status:true};


        }catch (error) {
            return ({error:{id:'createDbTables',data:error}})
        }


    }

    static async  __importDataToDb(fileListForImport){

        try{

            this.fileListForImport       = fileListForImport;


            if(!this.fileListForImport ){
                throw 'no files list for import';
            }


            const fileListForImportObjArr = [];


            this.fileListForImport.forEach(itm =>{

                if(path.extname(itm) === '.csv'){

                    let location = path.basename(itm, '.csv').split("-").pop().toLowerCase();


                    fileListForImportObjArr.push({
                        location,
                        file:`${this.dir}/${itm}`,
                        table:  (location === 'ipv6' || location === 'ip6')   ?
                                                                                    `blocks_ip_ip6` :
                                (location === 'ipv4' || location === 'ip4')   ?     `blocks_ip_ip4` :
                                                                                                     `locations_${location}`
                    });
                }


            });



            if(!fileListForImportObjArr || fileListForImportObjArr.length === 0){
                throw 'none csv files found'
            }


            const locationToImport = this.locations.map(itmQ =>{
                return fileListForImportObjArr.filter(itmW => itmQ === itmW.location);
            });



            const res = [];

            for (let fileToDb of locationToImport){

                const queryImport = `COPY ${fileToDb[0].table} FROM '${fileToDb[0].file}' DELIMITER ',' CSV HEADER;`;

                let importToDB = await this.postgresConnection(this.host,this.database,this.port,this.user,this.password,queryImport);

                res.push({...fileToDb,status:importToDB});



            }


            return res;




        }catch (error) {
            return ({error:{id:'importDataToDb',data:error}})
        }


    }






    async go(){

        try {

            console.log(`start download...`);

          const  downloadZip    =  await this.download();

          if(!downloadZip.status){
              throw downloadZip;
          }

            console.log(`download -- ok`);

            console.log(`start unZip`);

            const unZip         = await this.unZipArchiveInDir();

            if(!unZip.status){
                throw unZip;
            }


        const  {unZipFiles} = unZip;

            console.log(`unZip -- ok`);


        const crTables     = await this.createDbTables(  this.host,
                                                            this.database,
                                                            this.port,
                                                            this.user,
                                                            this.password,
                                                                this.locations);


            if(!crTables.status){
                throw crTables;
            }

            console.log(`create tables in db`);

            console.log(`start import data to db`);

          const importToDb      = await this.importDataToDb(unZipFiles);

            console.log(`fin`);

            return importToDb;


        }catch (error) {
            return ({error:{id:'go',data:error}})
        }

    }


}









