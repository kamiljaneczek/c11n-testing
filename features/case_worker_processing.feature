# case_worker_processing.feature
Feature: Case Worker Incident Processing
  As a case worker
  I want to process and resolve incidents
  So that customers receive appropriate solutions

  Background:
    Given I am logged in as a case worker
    And I have an assigned incident

  Scenario: Process refund resolution
    When I open the incident
    And I review the incident details
    And I select "Refund" as the resolution method
    Then I should see the payment processing form
    When I confirm the refund amount
    Then a payment process case should be created
    And the incident status should be updated

  Scenario: Process replacement with shipping
    When I open the incident
    And I review the incident details
    And I select "Replacement" as the resolution method
    Then I should see the shipment form
    When I enter shipping details:
      | Field             | Value                  |
      | Shipping Service  | Express Delivery       |
      | Shipment Notes    | Replace with new item  |
    And I submit the shipping request
    Then a shipment case should be created
    And the customer should receive tracking information
# incident_follow_up.feature
