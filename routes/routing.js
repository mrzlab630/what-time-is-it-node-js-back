'use strict';

import 'dotenv/config';


import url from 'url';
import {
    getCityData,
        crtGeoNameDB,
        getIpData,
        help,
        apiQueryNotFound,
        Error404} from './index';
import CreateGeoNameDB from '../src/create-geo-name-db';

const RoutingActions = (req, res) => {

    try {

        if (!req.headers.gtoken) {
            throw new Error(`{"error":{"message":"gToken not found"}}`);
            return;
        }

        const urlParsed = url.parse(req.url, true);
        let pathname = urlParsed.pathname;

        if (!pathname) {
            Error404(req, res);
        }

        switch (pathname.toLowerCase()) {
            case '/api':
            case '/api/':
                apiQueryNotFound(req, res);
                return;

            case '/api/v1':
            case '/api/v1/':
            case '/api/v1/help':
                help(req, res);
                return;

            case '/api/v1/crtgeonamedb':
            case '/api/v1/crtgeonamedb/':

                 if (req.headers.gtoken !== process.env.CRT_GEO_NAME_DB_PASS) {
                    throw new Error(`{"error":{"message":"gToken not correct"}}`);
                    return;
                }

                crtGeoNameDB(req, res);
                return;

            case '/api/v1/getcitydata/':
            case '/api/v1/getcitydata':

                getCityData(req, res);

                return;

            case '/api/v1/getipdata/':
            case '/api/v1/getipdata':

                getIpData(req, res);

                return;

            default:
                Error404(req, res);
                return;
        }


    }catch (err) {
        res.end(err.message);
    }
};


export default RoutingActions;