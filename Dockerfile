FROM mcr.microsoft.com/playwright:v1.40.0-jammy
USER root
RUN mkdir /tests
COPY . /tests
WORKDIR /tests
# ENV DEBIAN_FRONTEND=noninteractive
# RUN apt-get update && apt-get install -y ubuntu-restricted-extras
# RUN apt-get update && apt-get install -y \
#     gstreamer1.0-tools \
#     gstreamer1.0-plugins-base \
#     gstreamer1.0-plugins-good
# https://yandex.ru/support/browser-beta/working-with-files/video.html - совет яндекса
RUN apt-get install -y ffmpeg-plugin-browser libgstreamer1.0-0 gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-libav
RUN npm install
RUN npx @playwright/test install
RUN npx playwright install-deps
RUN npx playwright test
