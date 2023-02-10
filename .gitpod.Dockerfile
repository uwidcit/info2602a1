FROM gitpod/workspace-full
                    
USER gitpod

USER root
RUN sudo apt-get update
RUN npm install -g newman
