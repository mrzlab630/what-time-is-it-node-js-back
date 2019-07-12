'use strict';

const apiQueryNotFound = (req, res) =>{

    res.writeHead(502);
    res.end(`{"error":{"message":"use /api/v1","url":"/api/v1"}}`);
};


export default apiQueryNotFound;