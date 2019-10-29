FROM node

WORKDIR /game

ENV DB_USER=root
ENV DB_HOST=card_gang
ENV ENV=PROD
ENV HOST=0.0.0.0

COPY ./ /game/

CMD [ "npm", "start" ]
