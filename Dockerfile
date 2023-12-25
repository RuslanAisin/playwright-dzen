FROM mcr.microsoft.com/playwright:v1.40.0-jammy
USER root
RUN mkdir /tests
COPY . /tests
WORKDIR /tests
RUN add-apt-repository ppa:mc3man/trusty-media -y
RUN apt-get update && apt-get upgrade -y
RUN apt-get install gstreamer0.10-ffmpeg
RUN npm install
RUN npx @playwright/test install
RUN npx playwright install-deps
RUN npx playwright test
