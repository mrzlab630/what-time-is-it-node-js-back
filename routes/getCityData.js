import 'dotenv/config';
import ConnectToPostgres from "../src/connection-postgres";


const getCityData = async (req, res) =>{

    try {

        if(!req.headers.gtoken){
            throw new Error(`{"error":{"message":"gToken not found"}}`);
            return;
        }

        if (req.headers.gtoken !== process.env.GTOKEN) {
            throw new Error(`{"error":{"message":"gToken not correct"}}`);
            return;
        }

        if(!req.body){
            throw new Error(`{"error":{"message":"query not found"}}`);
            return;
        }

        const postData = JSON.parse(req.body);

        const foundCityCallBack = (d) =>{

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(d.rows));
        };

        const city = postData.data.city.trim();

        const foundCityQuery = `SELECT * FROM locations_en WHERE LOWER(city_name) LIKE LOWER('${city}%')`;


      await ConnectToPostgres(foundCityQuery,foundCityCallBack);




    }catch (err) {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(err.message);
    }


};



export default getCityData;