# Сборка докера 

ARG build_dir=/build_application


FROM node:14

ARG build_dir
ENV DEPLOYMENT_URL="http://localhost:8080"


WORKDIR $build_dir

COPY . .
RUN yarn install
RUN yarn build


FROM node:14

RUN apt-get update && apt-get -y install cron

EXPOSE 8080

RUN useradd -r -s /bin/false apollon_standalone \
    && mkdir /opt/apollon_standalone \
    && touch /var/log/cron.log \
    && chmod 622 /var/log/cron.log

RUN service cron start
RUN chown -R apollon_standalone /opt/apollon_standalone

USER apollon_standalone
WORKDIR /opt/apollon_standalone

RUN mkdir diagrams

ARG build_dir

COPY --chown=apollon_standalone:apollon_standalone --from=0 $build_dir .

RUN crontab delete-stale-diagrams.cronjob.txt

WORKDIR /opt/apollon_standalone/build/server

CMD [ "node", "./src/main/server.js" ]
