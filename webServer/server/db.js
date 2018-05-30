import http from 'http';

export default {
    getAll: async(body) => await request({ method: 'GET',    path: '/todo', body }),
    add:    async(body) => await request({ method: 'POST',   path: '/todo', body }),
    update: async(body) => await request({ method: 'PATCH',  path: `/todo/${body.id}`, body }),
    delete: async(body) => await request({ method: 'DELETE', path: `/todo/${body.id}`, body }),
};

const request = (data) => new Promise((resolve, rej) => {
    const payload = JSON.stringify(data.body) || '{}';
    const options = {
        hostname: 'localhost',
        port:     3001,
        path:     data.path,
        method:   data.method || 'GET',
        headers: {
           'Content-Type': 'application/json',
           'Content-Length': Buffer.byteLength(payload),
       },
    };
    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            try {
                resolve(JSON.parse(data));
            } catch (e) {
                resolve(data);
            }
        });
    });
    req.on('error', (e) => {
        rej(e);
    });
    req.write(payload);
    req.end();
});
