FROM ghcr.io/engineer-man/piston

USER root

RUN mkdir -p /piston/data/isolate

# Fix Debian Buster EOL repos and install curl
RUN sed -i 's|http://deb.debian.org/debian|http://archive.debian.org/debian|g' /etc/apt/sources.list && \
    sed -i 's|http://security.debian.org/debian-security|http://archive.debian.org/debian-security|g' /etc/apt/sources.list && \
    sed -i '/buster-updates/d' /etc/apt/sources.list && \
    apt-get update && apt-get install -y curl

# Cache bust
ARG CACHE_BUST=5

# Check what packages are available
RUN node /piston_api/src/index.js & \
    sleep 8 && \
    echo "=== GET /api/v2/runtimes ===" && \
    curl -s http://localhost:2000/api/v2/runtimes && \
    echo "=== GET /api/v2/packages ===" && \
    curl -s http://localhost:2000/api/v2/packages && \
    kill %1 || true

ENTRYPOINT []
CMD ["/bin/sh", "-c", "mkdir -p /piston/data/jobs && node /piston_api/src/index.js"]