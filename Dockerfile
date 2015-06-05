FROM    centos:centos6

# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN     yum install -y npm

RUN   mkdir /src
COPY ./package.json /src/package.json
# Bundle app source

# Install app dependencies
WORKDIR /src

RUN npm install
RUN npm install -g bower
COPY . /src
RUN bower install --allow-root

EXPOSE  8080
CMD ["node", "/src/bin/www"]
