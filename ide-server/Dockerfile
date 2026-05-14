FROM ghcr.io/engineer-man/piston

USER root

RUN mkdir -p /piston/data/isolate

ENTRYPOINT []
CMD ["/bin/sh", "-c", "find /usr/local/bin /srv /app /home -type f 2>/dev/null && cat /proc/1/cmdline 2>/dev/null || echo 'not found'"]