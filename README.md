# https-express
A simple boilerplate express server using https

## How to run
This will run the server with http and https.
```
npm install
npm start
```
### Customization options
* Running HTTP xor HTTPS
If you just want to run the server on http
```
npm run http
```
If you just want to run the server on https
```
npm run https
```
* Adding a port option
```
npm run http --port=3000
```
or
```
npm run https --port=3000
```
But you cannot run 
```
npm start --port=3000
```
since you will not be able to start to different express instances on port 3000. It won't fail, but it won't take into account the argument. Two environment variables are available to customize. They are
```
HTTP_PORT
HTTPS_PORT
```

## Generating a self signed certificate
### Requirements
* [OpenSSL](https://www.digitalocean.com/community/tutorials/openssl-essentials-working-with-ssl-certificates-private-keys-and-csrs)

### Command to run
```
openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem
```

## Using [Let's Encrypt](https://letsencrypt.org) to generate a certificate
### Requirements
* [Certbot](https://certbot.eff.org)
* Domain Name

### Commands I used (Ubuntu 16.04)
``` shell
sudo certbot certonly --standalone -d {domain}.com -d www.{domain}.com # Generates a standalone certificate for your domain
sudo chmod 755 /etc/letsencrypt/live /etc/letsencrypt/archive # Allows nodejs to read the certificate and private key
sudo iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to 3001 # Redirects traffic from the https port (443) to the port that your server is running on
```
