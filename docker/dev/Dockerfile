FROM node:14

# this will be the directory that docker sync, syncs to
VOLUME /root/app
WORKDIR /root/app

# needed for entry point below
COPY ./docker/dev/.profile /root

# Port that the app is running on
EXPOSE 4500

# Port for debugging the node app
EXPOSE 9229

# Command to first run inside the container when it starts up
ENTRYPOINT ["/bin/bash", "--init-file", "/root/.profile"]