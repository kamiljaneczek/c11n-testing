# incident_follow_up.feature
Feature: Incident Follow-up
  As a case worker
  I want to conduct follow-up calls
  So that we can gather customer feedback

  Scenario: Complete follow-up call with positive feedback
    Given I am logged in as a case worker
    And I have a resolved incident requiring follow-up
    When I open the follow-up call form
    Then I should see the customer contact information
    When I record the follow-up details:
      | Field               | Value               |
      | NPS                 | 9                   |
      | Customer Sentiment  | Satisfied           |
    And I submit the follow-up
    Then the incident should be marked as completed
