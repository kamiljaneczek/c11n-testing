# manage_products.feature
Feature: Manage Products
  As a manager
  I want to manage the products
  So that I can provide feedback and support

  Scenario: Create a new product
    Given I am logged in as a manager
    When I go to Products landing page
    When I open the product creation form
    Then I should see the product details
    When I record the product details:
      | Field               | Value               |
      | Name                | New Product         |
      | Description         | A new product       |
    And I submit the product
    Then the product should be created
