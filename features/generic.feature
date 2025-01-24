# customer_incident_submission.feature
Feature: Customer Incident Submission
  As a customer
  I want to submit an incident report
  So that I can get help with product or service issues

  Background:
    Given I am logged into the customer portal
    And I am on the new incident submission page

  Scenario: Submit product-related incident
    When I select "Product faulty or unsafe" as the Incident Type
    And I select "Broken on arrival" as the Incident SubType
    And I fill in the product details:
      | Field        | Value                     |
      | Product      | Sample Product            |
      | What         | Product arrived damaged   |
      | Where        | Home delivery             |
      | When         | 2025-01-23                |
      | Proof        | damage_photo.jpg          |
    And I fill in contact information:
      | Field        | Value                    |
      | First Name   | John                     |
      | Last Name    | Smith                    |
      | Email        | john.smith@example.com   |
      | Phone        | +1234567890              |
    And I select "Manual" as the address mode
    And I fill in the address details:
      | Field          | Value            |
      | Country        | United States    |
      | State          | California       |
      | City           | San Francisco    |
      | Street Address | 123 Main St      |
      | Postal Code    | 94105            |
    And I select "Refund" as preferred resolution method
    And I review and accept terms and conditions
    When I submit the incident
    Then I should see a confirmation message
    And I should see "Your incident report will be analyzed" in What's Next section