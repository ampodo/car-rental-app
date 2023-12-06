
Car rental application with booking logic. Please register as a regular user and then sign up to test this application. This app has an admin mode and a regular user mode. As an admin, I can add new cars to the grid home page with specific characteristics. 

After the user books a car, he must fulfill all the details for shipment and pay with a dummy stripe.

STRIPE TEST CARD NUMBERS : 4242 4242 4242 4242

Then he will be redirected to the profile page where he will be able to cancel the booking and see all the history of bookings, also he can update the password on the profile page.

**********************

Redux toolkit capabilities are utilized in this application for managing user- and loading-related states. The user-related state is handled through a dedicated Redux slice named 'users,' which includes action like 'SetCurrentUser' to update the current user. Additionally, the loading-related state is managed using Redux action, such as 'SetLoading' to provide a seamless experience while asynchronous operations, like fetching user data, are in progress.

**********************

This app uses serverless authentication and employs token validation to ensure the security and integrity of a user log-in and log-out process. Each time the user logs in, a new JWT token is generated with a unique set of characters.



![Car grid](https://github.com/ampodo/car-rental-app/blob/main/gird%20card.png)
