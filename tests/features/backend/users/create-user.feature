Feature: Create a new user
  As a user
  I want to create a new user
  So that I can add a new user to the system 

  Scenario: Create a new user
    Given I send a POST request to "/user" with body:
      """
      {
        "name": "John Doe",
        "email": "john@doe.com"
      }
      """
    Then the response status code should be 201
    And the response body should be:
      """
      {
        "id": "number"
      }
      """
