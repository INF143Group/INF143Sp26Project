FROM ghcr.io/engineer-man/piston

USER root

RUN mkdir -p /piston/data/isolate

# Cache bust - change this number to force rebuild
ARG CACHE_BUST=2

# Start server, install runtimes via API, then stop
RUN node /piston_api/src/index.js & \
    sleep 8 && \
    curl -s -X POST http://localhost:8080/api/v2/runtimes -H "Content-Type: application/json" -d '{"language":"python","version":"3.10.0"}' && \
    curl -s -X POST http://localhost:8080/api/v2/runtimes -H "Content-Type: application/json" -d '{"language":"java","version":"15.0.2"}' && \
    curl -s -X POST http://localhost:8080/api/v2/runtimes -H "Content-Type: application/json" -d '{"language":"c++","version":"10.2.0"}' && \
    sleep 60 && \
    kill %1 || true

ENTRYPOINT []
CMD ["/bin/sh", "-c", "mkdir -p /piston/data/jobs && node /piston_api/src/index.js"]