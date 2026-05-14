FROM ghcr.io/engineer-man/piston

USER root

RUN mkdir -p /piston/data/isolate

ENTRYPOINT []
CMD ["/bin/sh", "-c", "find / -path /proc -prune -o -path /usr/local/lib -prune -o -print 2>/dev/null | head -100"]