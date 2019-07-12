const dbStructure = {
    info:'data for GeoLite2-City-CSV from https://dev.maxmind.com/geoip/geoip2/geoip2-enterprise-csv-database/#IP_Geolocation_Usage',
    data: {
        location:{
            type:'Locations Files',
            prefix:'locations_',
            table:[
                {
                    name:'geoname_id',
                    type:'integer',
                    info:'A unique identifier for the a location as specified by GeoNames. This ID can be used as a key for the Location file.'
                },
                {
                    name:'locale_code',
                    type:'CHARACTER VARYING(100)',
                    info:'The locale that the names in this row are in. This will always correspond to the locale name of the file.'
                },
                {
                    name:'continent_code',
                    type:'CHARACTER VARYING(2)',
                    info:'The continent code for this location.'
                },
                {
                    name:'continent_name',
                    type:'CHARACTER VARYING(100)',
                    info:'The continent name for this location in the file’s locale.'
                },
                {
                    name:'country_iso_code',
                    type:'CHARACTER VARYING(2)',
                    info:'A two-character ISO 3166-1 country code for the country associated with the location.'
                },
                {
                    name:'country_name',
                    type:'CHARACTER VARYING(100)',
                    info:'The country name for this location in the file’s locale.'
                },
                {
                    name:'subdivision_1_iso_code',
                    type:'CHARACTER VARYING(3)',
                    info:'A string of up to three characters containing the region-portion of the ISO 3166-2 code for the first level region associated with the IP address. Some countries have two levels of subdivisions, in which case this is the least specific. For example, in the United Kingdom this will be a country like “England”, not a county like “Devon”.'
                },
                {
                    name:'subdivision_1_name',
                    type:'CHARACTER VARYING(100)',
                    info:'The subdivision name for this location in the file’s locale. As with the subdivision code, this is the least specific subdivision for the location.'
                },
                {
                    name:'subdivision_2_iso_code',
                    type:'CHARACTER VARYING(3)',
                    info:'A string of up to three characters containing the region-portion of the ISO 3166-2 code for the second level region associated with the IP address. Some countries have two levels of subdivisions, in which case this is the most specific. For example, in the United Kingdom this will be a a county like “Devon”, not a country like “England”.'
                },
                {
                    name:'subdivision_2_name',
                    type:'CHARACTER VARYING(100)',
                    info:'The subdivision name for this location in the file’s locale. As with the subdivision code, this is the most specific subdivision for the location.'
                },
                {
                    name:'city_name',
                    type:'CHARACTER VARYING(100)',
                    info:'The city name for this location in the file’s locale.'
                },
                {
                    name:'metro_code',
                    type:'CHARACTER VARYING(100)',
                    info:'The metro code associated with the location. These are only available for networks in the US. MaxMind provides the same metro codes as used by Google Marketing Platform.'
                },
                {
                    name:'time_zone',
                    type:'CHARACTER VARYING(100)',
                    info:'The time zone associated with location, as specified by the IANA Time Zone Database, e.g., “America/New_York”.'
                },
                {
                    name:'is_in_european_union',
                    type:'boolean',
                    info:'This is 1 if the country associated with the location is a member state of the European Union. It is 0 otherwise.'
                }]
        },
        blocksIP: {
            type:'Blocks IP',
            prefix:'blocks_ip_',
            table:[
                {
                    name:'network',
                    type:'CHARACTER VARYING(100)',
                    info:'This is the IPv4 or IPv6 network in CIDR format such as “2.21.92.0/29” or “2001:4b0::/80”.'
                },
                {
                    name:'geoname_id',
                    type:'integer',
                    info:'A unique identifier for the network’s location as specified by GeoNames. This ID can be used to look up the location information in the Location file.'
                },
                {
                    name:'registered_country_geoname_id',
                    type:'integer',
                    info:'The registered country is the country in which the ISP has registered the network. This column contains a unique identifier for the network’s registered country as specified by GeoNames. This ID can be used to look up the location information in the Location file.'
                },
                {
                    name:'represented_country_geoname_id',
                    type:'integer',
                    info:'The represented country is the country which is represented by users of the IP address. For instance, the country represented by an overseas military base. This column contains a unique identifier for the network’s registered country as specified by GeoNames. This ID can be used to look up the location information in the Location file.'
                },
                {
                    name:'is_anonymous_proxy',
                    type:'boolean',
                    info:'Deprecated'
                },
                {
                    name:'is_satellite_provider',
                    type:'boolean',
                    info:'Deprecated'
                },
                {
                    name:'postal_code',
                    type:'CHARACTER VARYING(100)',
                    info:'A postal code close to the user’s location. We return the first 3 characters for Canadian postal codes. We return the first 2-4 characters (outward code) for postal codes in the United Kingdom.'
                },
                {
                    name:'latitude',
                    type:'decimal',
                    info:'The approximate latitude of the postal code, city, subdivision or country associated with the IP address.'
                },
                {
                    name:'longitude',
                    type:'decimal',
                    info:'The approximate longitude of the postal code, city, subdivision or country associated with the IP address.'
                },
                {
                    name:'accuracy_radius',
                    type:'integer',
                    info:'The approximate accuracy radius, in kilometers, around the latitude and longitude for the geographical entity (country, subdivision, city or postal code) associated with the IP address. We have a 67% confidence that the location of the end-user falls within the area defined by the accuracy radius and the latitude and longitude coordinates.'
                },
            ]
        }
    }
};









export default dbStructure;