# dispatcher_incident_processing-noteligible.feature
Feature: Dispatcher Incident Processing
  As a dispatcher
  I want to assess incident eligibility
  So that valid incidents can be properly routed

  Background:
    Given I am logged in as a dispatcher
    And there is a new Service related incident in the dispatch queue

   Scenario: Process not eligible service incident
    When I open the incident for eligibility check
    Then I should see the incident details
    When I set eligibility type to "Not eligible"
    Then the incident status should be updated to Resolved-Ineligible  