FROM node:16.14.2-alpine

WORKDIR ./backend/bin/www

# # Copy all the files from your repo to the working directory
# COPY . .
COPY ./backend ./bin/www/
COPY ./frontend/build/ ./public


# ENV PORT=5000
# ENV DB_USERNAME=property_hero
# ENV DB_PASSWORD=password
# ENV DB_DATABASE=property_hero_app
# ENV DB_HOST=localhost
ENV JWT_SECRET=secret
ENV JWT_EXPIRES_IN=604800

ENV NODE_ENV=production

CMD ["npm", "start"]
