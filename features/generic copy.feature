# service_incident_submission.feature
Feature: Customer Service Incident Submission
  As a customer
  I want to report a service-related issue
  So that I can get resolution for service problems

  Scenario: Submit service-related incident
    Given I am logged into the customer portal
    And I am on the new incident submission page
    When I select "Customer service issue" as the Incident Type
    And I select "Poor service" as the Incident SubType
    And I fill in the service details:
      | Field                 | Value                               |
      | What happened?       | Service representative was rude      |
      | Where did it happen? | Phone call                           |
      | When did it happen?  | 2025-01-23                           |
      | Channel              | Phone                                |
    And I complete the contact information form
    And I select "Compensation" as preferred resolution method
    And I review and accept terms and conditions
    When I submit the incident
    Then I should see a confirmation message
    And the incident should be routed to the service complaints queue
# dispatcher_incident_processing.feature
