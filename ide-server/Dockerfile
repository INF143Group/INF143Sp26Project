FROM ghcr.io/engineer-man/piston

USER root

RUN mkdir -p /piston/data/isolate

# Start server in background, install runtimes, then stop
RUN node /piston_api/src/index.js & \
    sleep 5 && \
    npx piston install python 3.10.0 && \
    npx piston install java 15.0.2 && \
    npx piston install c++ 10.2.0 && \
    kill %1 || true

ENTRYPOINT []
CMD ["/bin/sh", "-c", "mkdir -p /piston/data/isolate && node /piston_api/src/index.js"]