FROM dockerfile/nodejs



#ONBUILD COPY package.json /src
# ONBUILD RUN npm install
COPY . /src
WORKDIR /src
#COPY ./start.sh /run/start.sh
RUN npm install
RUN bower install --allow-root ---config.interactive=false
#CMD [ "sh", "../start.sh" ]
CMD ["npm", "start"]
