## What it is and what it's for.

<br>
<br>

### It's a API for searching in GeoLite2 database.

## uses in [what-time-is-it](https://github.com/mrzlab630/what-time-is-it-reactjs-front)

## Development

**yarn install / npm install**
<br>
**yarn start / npm start**
<br>
open **http://localhost:4419**
<br>
<br>

## Queries

### ! You should send in a HEADERS: gToken

* **/api/v1/help** -- GET
* **/api/v1/crtgeonamedb** -- GET -- download GeoLite2-City-CSV.zip from https://dev.maxmind.com/geoip/geoip2/geolite2/ and create Postgresql database
* **/api/v1/getcitydata** -- POST -- to find data by a partial city name.
<br> 
send: ``{
   action:'getcitydata',
   nocache:new Date().getTime(),
  data:{
       city:'Paris'
       }``
       <br>
* **/api/v1/getipdata** -- GET -- show data by IP


<br> 
<br> 

## .env


* HOST=8.8.8.8 (default fo detect default city)
* PORT=4419
* DB_PSTG_HOST=localhost
* DB_PSTG_USER=geo_data_db
* DB_PSTG_NAME=geo_data_db
* DB_PSTG_PASS=PASS
* DB_PSTG_PORT=5432
* CRT_GEO_NAME_DB_PASS=PASS
* GTOKEN=PASS

## Donation
If this project help you reduce time to develop, you can give me a cup of coffee :)
<br><br>
[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3FYLY9YVBTSEL)
<br>
<br>

## License

The MIT License.
<br>
<br>

## By

**mrZ** - mrz@mrzlab630.pw