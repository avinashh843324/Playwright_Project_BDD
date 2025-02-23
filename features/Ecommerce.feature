Feature: Ecommerce validation
@Regression
Scenario: Placing the Order
Given a login to Ecommerce application with "avinashkumar.nilu.ak@gmail.com" and "Milton@01748"
When Add product to cart
Then Verify "Zara coat 3" is displayed in the cart
When Enter valid details and place the Order
Then Verify order in present in the Order history
