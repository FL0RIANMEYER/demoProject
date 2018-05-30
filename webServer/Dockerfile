FROM nearform/centos7-s2i-nodejs:8.9

COPY . /service
WORKDIR /service


CMD ["npm", "install", "&&", "npm", "start"] 
