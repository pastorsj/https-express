# https-express
A simple boilerplate express server using https

## How to run
```
npm install
npm start
```

## Generating a self signed certificate
### Requirements
* OpenSSL

### Command to run
```
openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem
```