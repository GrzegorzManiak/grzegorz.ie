import Fastify from "fastify";
import dotenv from "dotenv";
import fs from "fs";

// Load environment variables from .env file
let env = dotenv.config({ path: "./config.env" }).parsed;
env = env as { [key: string]: string };

// Get the cert.pem and key.pem files from the certs folder
const certs: {key:Buffer, cert:Buffer} = {
    cert: fs.readFileSync(env.Cert),
    key: fs.readFileSync(env.Key)
};

// Initialize the server
const app = Fastify({
    logger: false,
    https: certs
});

(async() => {
        
    // Get the port from the environment variables
    const port = env.Port;

    app.listen(port, (error:any) => {
        if (error) console.error(error);
        else console.log(`Server listening on port: ${port}`);
    });
})();

// Catch any pages that are not found   
app.all('/*', (req:any, res:any) => {
    console.log(req.url);       
    res.status(200).send('test');
});