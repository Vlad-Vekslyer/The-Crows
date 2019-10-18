FROM node

WORKDIR /game

ENV DB_HOST=card_gang
ENV DB_USER=root
ENV ENV=PROD
ENV PORT=3001
ENV HOST=0.0.0.0

COPY ./ /game/
RUN npm install

EXPOSE 3001

CMD [ "bash", "prod.bash" ]
