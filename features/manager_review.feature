# manager_review.feature
Feature: Manager Review
  As a manager
  I want to review the incidents in the queue
  So that I can provide feedback and support

  Scenario: Review incident in the queue
    Given I am logged in as a manager
    And I have an incident in the queue
    When I open the incident for review
    Then I should see the incident details
    When I record the review details:
      | Field               | Value               |
      | NPS                 | 9                   |
      | Customer Sentiment  | Satisfied           |
    And I submit the follow-up
    Then the incident should be marked as completed

