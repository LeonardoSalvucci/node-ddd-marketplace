import request from 'supertest';
import { AfterAll, BeforeAll, Given, Then } from 'cucumber';
import { Backend } from '../../../src/apps/express/Backend';
import assert = require('assert');

let _request: request.Test;
let application: Backend;
let _response: request.Response;

Given('I send a GET request to {string}', (route: string) => {
  _request = request(application.httpServer).get(route);
})

Then('the response status code should be {int}', async (statusCode: number) => {
  _response = await _request.expect(statusCode);
});

Given('I send a POST request to {string} with body:', (route: string, body: string) => {
  _request = request(application.httpServer).post(route).send(JSON.parse(body));
});

Then('the response body should be:', (body: string) => {
  const bodyParsed = JSON.parse(body);
  for (let key in bodyParsed) {
    assert(_response.body[key] && typeof _response.body[key] === bodyParsed[key]);
  }
});

BeforeAll(async () => {
  application = new Backend();
  await application.start();
});

AfterAll(async () => {
  await application.stop();
});