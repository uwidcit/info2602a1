FROM gitpod/workspace-full

USER gitpod
RUN npm i -g live-server
RUN npm i -g mocha
RUN npm install

USER root