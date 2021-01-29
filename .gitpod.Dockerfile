FROM gitpod/workspace-full-vnc

USER root

ENV DEBIAN_FRONTEND=noninteractive

# RUN sudo apt-get -q update && \
#     sudo apt-get install -y chromium-browser && \
#     sudo rm -rf /var/lib/apt/lists/*

RUN sudo apt-get update -q \
 && sudo apt-get install -yq \
   chromium-browser \
 && sudo rm -rf /var/lib/apt/lists/*