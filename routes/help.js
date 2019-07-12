'use strict';


const help = (req, res) =>{


    const info = {
                    info:{
                        queries:[
                            {
                                getCityData:{
                                    query:"POST",
                                    type:"string",
                                    length:{
                                        min:4,
                                        max:false
                                    }
                                },
                                getIpData:{
                                    query:"GET",
                                },
                            }
                        ]
                    }
                };


    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(info));
};

export default help;