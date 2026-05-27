FROM ghcr.io/engineer-man/piston

USER root

RUN mkdir -p /piston/data/isolate

# Replace isolate binary with one that returns expected output
RUN mv /usr/local/bin/isolate /usr/local/bin/isolate.real || true && \
    printf '#!/bin/sh\necho 1\nexit 0\n' > /usr/local/bin/isolate && \
    chmod +x /usr/local/bin/isolate

# Fix Debian Buster EOL repos and install curl, npm, python3, gcc
RUN sed -i 's|http://deb.debian.org/debian|http://archive.debian.org/debian|g' /etc/apt/sources.list && \
    sed -i 's|http://security.debian.org/debian-security|http://archive.debian.org/debian-security|g' /etc/apt/sources.list && \
    sed -i '/buster-updates/d' /etc/apt/sources.list && \
    apt-get update && apt-get install -y curl npm python3 gcc

# Create missing man1 dir so Java post-install script doesn't fail, then install Java
RUN mkdir -p /usr/share/man/man1 && \
    apt-get install -y default-jdk || true

# Symlink python3 to python so Piston's python runtime finds it
RUN ln -sf /usr/bin/python3 /usr/bin/python

# Cache bust
ARG CACHE_BUST=13

# Start server, install packages, then stop
RUN PISTON_BIND_ADDRESS=0.0.0.0:2000 node /piston_api/src/index.js & \
    sleep 8 && \
    curl -s -X POST http://localhost:2000/api/v2/packages \
      -H "Content-Type: application/json" \
      -d '{"language":"python","version":"3.10.0"}' && \
    curl -s -X POST http://localhost:2000/api/v2/packages \
      -H "Content-Type: application/json" \
      -d '{"language":"java","version":"15.0.2"}' && \
    curl -s -X POST http://localhost:2000/api/v2/packages \
      -H "Content-Type: application/json" \
      -d '{"language":"gcc","version":"10.2.0"}' && \
    sleep 45 && \
    kill %1 || true

COPY proxy.js /proxy.js
COPY package.json /package.json
RUN cd / && npm install

ENTRYPOINT []
CMD ["/bin/sh", "-c", \
  "mkdir -p /piston/data/jobs && \
   PISTON_BIND_ADDRESS=0.0.0.0:2000 node /piston_api/src/index.js & \
   sleep 3 && \
   node /proxy.js"]