FROM iojs:2.0.0

WORKDIR /src

#ONBUILD COPY package.json /src
# ONBUILD RUN npm install
COPY . 
#COPY ./start.sh /run/start.sh
RUN npm install
RUN bower-install --allow-root ---config.interactive=false
#CMD [ "sh", "../start.sh" ]
CMD ["npm", "start"]
