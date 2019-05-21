const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const zlib = require('zlib');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

const port = 8080;

function readFileAsStream(fileName) {
    return fs.createReadStream(`./public/${fileName}`);
}

function getFileExtension(fileName) {
    return fileName.split('.')[1];
}

function extractFileNameFromPath(path) {
    return path.split('/')[1];
}

const extensionsContentTypes = {
    css: {
        'Content-Type': 'text/css'
    },
    js: {
        'Content-Type': 'application/javascript',
    }
};

http
    .createServer((req, res) => {
        const parsedUrl = url.parse(req.url);
        const pathname = parsedUrl.pathname;

        if (req.method === 'GET') {
            if (pathname === '/') {
                const index = fs.createReadStream('./public/index.html');
                
                index.pipe(res);
                return; 
            } else {
                const fileName = extractFileNameFromPath(pathname);
                const fileStream = readFileAsStream(fileName);
                const extension = getFileExtension(fileName);
                const header = extensionsContentTypes[extension];

                res.writeHead(200, header);
                fileStream.pipe(res);
            }
        }
    })
    .listen(port);

console.log(`Web Server started at port: ${port}`);