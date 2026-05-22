FROM ghcr.io/engineer-man/piston

USER root

RUN mkdir -p /piston/data/isolate

# Fix Debian Buster EOL repos and install curl + npm
RUN sed -i 's|http://deb.debian.org/debian|http://archive.debian.org/debian|g' /etc/apt/sources.list && \
    sed -i 's|http://security.debian.org/debian-security|http://archive.debian.org/debian-security|g' /etc/apt/sources.list && \
    sed -i '/buster-updates/d' /etc/apt/sources.list && \
    apt-get update && apt-get install -y curl npm

# Cache bust
ARG CACHE_BUST=6

# Start server, install packages, then stop
RUN node /piston_api/src/index.js & \
    sleep 8 && \
    curl -s -X POST http://localhost:2000/api/v2/packages -H "Content-Type: application/json" -d '{"language":"python","version":"3.10.0"}' && \
    curl -s -X POST http://localhost:2000/api/v2/packages -H "Content-Type: application/json" -d '{"language":"java","version":"15.0.2"}' && \
    curl -s -X POST http://localhost:2000/api/v2/packages -H "Content-Type: application/json" -d '{"language":"gcc","version":"10.2.0"}' && \
    sleep 120 && \
    kill %1 || true

COPY proxy.js /proxy.js
COPY package.json /package.json
RUN cd / && npm install

ENTRYPOINT []
CMD ["/bin/sh", "-c", \
  "mkdir -p /piston/data/jobs && \
   node /piston_api/src/index.js & \
   sleep 3 && \
   node /proxy.js"]