'use strict';



const Error404 = (req, res) => {

    const text = {
                        error:"Something went wrong. Please contact webmaster"
                    };
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(JSON.stringify(text))
};

export default Error404;