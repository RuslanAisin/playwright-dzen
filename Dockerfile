FROM mcr.microsoft.com/playwright:v1.40.0-jammy
USER root
RUN mkdir /tests
COPY . /tests
WORKDIR /tests
RUN npm install
RUN npm install playwright-video @ffmpeg-installer/ffmpeg
RUN npx @playwright/test install
RUN npx playwright install-deps
RUN npx playwright test || exit 1
