import * as https from 'https';
import * as qs from 'querystring';

export default class HTTPClient {
    static async request(
        method: string,
        hostname: string,
        path: string,
        headers?: {},
        requestBody?: {}
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            const req = https.request(
                {
                    method,
                    hostname,
                    path,
                    headers
                },
                (res) => {
                    if (res.statusCode < 200 || res.statusCode > 299) {
                        reject(`[${res.statusCode}]: ${res.statusMessage}`);
                    } else {
                        const chunks = [];

                        res.on('data', (chunk) => {
                            chunks.push(chunk);
                        });

                        res.on('end', () => {
                            const body = Buffer.concat(chunks);
                            resolve(JSON.parse(body.toString()));
                        });
                    }
                }
            );

            if (requestBody) {
                req.write(qs.stringify(requestBody));
            }

            req.end();
        });
    }
}
