FROM playwright/chrome:playwright-1.40.1
USER root
RUN mkdir /tests
COPY . /tests
WORKDIR /tests
RUN npm install

RUN npx playwright test
# FROM frankescobar/allure-docker-service:2.21.0
# WORKDIR /tests/allure-results

# RUN npx playwright test && allure generate --clean && allure open