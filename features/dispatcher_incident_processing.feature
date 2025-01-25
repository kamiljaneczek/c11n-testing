# dispatcher_incident_processing.feature
Feature: Dispatcher Incident Processing
  As a dispatcher
  I want to assess incident eligibility
  So that valid incidents can be properly routed

  Background:
    Given I am logged in as a dispatcher
    And there is a new incident in the dispatch queue

  Scenario: Process eligible product incident
    When I open the incident for eligibility check
    Then I should see the incident details in read-only mode
    When I set eligibility type to "Eligible"
    And I submit the eligibility decision
    Then the incident should be routed to the Product work queue
    And the incident status should be updated to "In Progress"

  Scenario: Reject spam incident
    When I open the incident for eligibility check
    And I set eligibility type to "Spam"
    And I submit the eligibility decision
    Then the incident should be marked as "Rejected"
    And the customer should be notified of the rejection
