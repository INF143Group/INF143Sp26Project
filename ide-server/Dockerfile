FROM ghcr.io/engineer-man/piston

USER root

RUN mkdir -p /piston/data/isolate

ENTRYPOINT []
CMD ["/bin/sh", "-c", "find / -name 'run' -o -name 'index.js' -o -name 'server.js' 2>/dev/null | grep -v proc"]