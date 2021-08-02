import { app } from "./app";
import config = require('config')

const expressConfig: {host:string, port: string} = config.get('express')

app.listen(expressConfig.port, () =>{
    console.log(`"server started at http://${expressConfig.host}:${expressConfig.port}"`)
return expressConfig.host
} );
