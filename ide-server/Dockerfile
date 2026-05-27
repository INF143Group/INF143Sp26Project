FROM ghcr.io/engineer-man/piston

USER root

RUN mkdir -p /piston/data/isolate

RUN mv /usr/local/bin/isolate /usr/local/bin/isolate.real || true && \
    printf '#!/bin/sh\n\
BOX_ID=1\n\
for arg in "$@"; do\n\
  case "$arg" in -b*) BOX_ID="${arg#-b}" ;; esac\n\
done\n\
BOX_DIR="/piston/data/isolate/${BOX_ID}"\n\
META="/tmp/${BOX_ID}-metadata.txt"\n\
case "$*" in\n\
  *--init*)\n\
    mkdir -p "${BOX_DIR}/box"\n\
    printf "exitcode:0\\ntime:0.000\\ntime-wall:0.000\\nmax-rss:0\\ncsw-voluntary:0\\ncsw-forced:0\\n" > "${META}"\n\
    echo "${BOX_DIR}"\n\
    ;;\n\
  *--run*)\n\
    while [ "$1" != "--" ] && [ $# -gt 0 ]; do shift; done\n\
    [ "$1" = "--" ] && shift\n\
    CODEFILE=$(find /piston/data/jobs -name "*.code" -newer /tmp 2>/dev/null | head -1)\n\
    JOBDIR=$(dirname "$CODEFILE")\n\
    if [ -n "$JOBDIR" ] && [ "$JOBDIR" != "." ]; then\n\
      (cd "$JOBDIR" && "$@")\n\
    else\n\
      "$@"\n\
    fi\n\
    EXIT=$?\n\
    printf "exitcode:%d\\ntime:0.000\\ntime-wall:0.000\\nmax-rss:0\\ncsw-voluntary:0\\ncsw-forced:0\\n" $EXIT > "${META}"\n\
    exit $EXIT\n\
    ;;\n\
  *--cleanup*)\n\
    rm -rf "${BOX_DIR}"\n\
    rm -f "${META}"\n\
    ;;\nesac\n' > /usr/local/bin/isolate && \
    chmod +x /usr/local/bin/isolate

RUN sed -i 's|http://deb.debian.org/debian|http://archive.debian.org/debian|g' /etc/apt/sources.list && \
    sed -i 's|http://security.debian.org/debian-security|http://archive.debian.org/debian-security|g' /etc/apt/sources.list && \
    sed -i '/buster-updates/d' /etc/apt/sources.list && \
    apt-get update && apt-get install -y curl npm gcc

RUN apt-get install -y wget build-essential libssl-dev zlib1g-dev \
    libncurses5-dev libncursesw5-dev libreadline-dev libsqlite3-dev \
    libgdbm-dev libdb5.3-dev libbz2-dev libexpat1-dev liblzma-dev \
    libffi-dev && \
    wget https://www.python.org/ftp/python/3.10.0/Python-3.10.0.tgz && \
    tar -xf Python-3.10.0.tgz && \
    cd Python-3.10.0 && \
    ./configure --enable-optimizations && \
    make -j$(nproc) && \
    make altinstall && \
    cd / && rm -rf Python-3.10.0 Python-3.10.0.tgz && \
    ln -sf /usr/local/bin/python3.10 /usr/bin/python3.10 && \
    ln -sf /usr/bin/python3.10 /usr/bin/python3 && \
    ln -sf /usr/bin/python3.10 /usr/bin/python

RUN mkdir -p /usr/share/man/man1 && \
    apt-get install -y default-jdk || true

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

ARG CACHE_BUST=25

ENTRYPOINT []
CMD ["/bin/sh", "-c", \
  "mkdir -p /piston/data/jobs /piston/data/isolate && \
   PISTON_BIND_ADDRESS=0.0.0.0:2000 node /piston_api/src/index.js & \
   sleep 3 && \
   node /proxy.js"]