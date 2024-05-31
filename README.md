# Docker
docker build -t front-end . 
docker run --name front-end-container -d -p 3000:3000 front-end

# React
npm start

# Branches
main  -> prod
local -> local

# How to create SSL certificate
it will expire 2026

https://www.youtube.com/watch?v=neT7fmZ6sDE
https://github.com/FiloSottile/mkcert


-->  mkcert -install
-->  mkcert -cert-file C:\Users\mauro.oliveri\PROJECTS\KPIs_form_frontend\SSL_certificate\cert.pem -key-file C:\Users\mauro.   oliveri\PROJECTS\KPIs_form_frontend\SSL_certificate\key.pem localhost 192.168.1.221 172.17.231.51
