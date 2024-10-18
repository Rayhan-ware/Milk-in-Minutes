Milk In Minutes – prompts
Develop a single page application using Angular and Angular materials - Milk In Minutes, that allows customers to make an online request for milk, cheese, butter or yogurt of their choice.
The dairy products are displayed with attractive images and crisp details, allowing the users to select the item of their choice and provide the order details.
The app should seek confirmation from the users before allowing them to navigate away from the order view without submitting the details.
The app can search and filter the items by the user's preference for a quick selection.
The site administrator can view the incoming order requests.
The app should redirect user to first validate his identity as site administrator before providing access to the order request view.


Design Landing View
The landing view of the app must display the images of various dairy products like milk, cheese, yogurt and butter.
The data must be fetched using json-server.
This view must be the default view.
These items should be selectable by the user.
Upon selection, the user should be navigated to the order view.
The landing view must also allow users to search/filter these items by their preference.
Search allows user to search by item name.
Filtering allows user to filter items by category.



Design Order View
The user will be navigated to the order view once he selects the item on the landing view.
The view should display the details of the item selected.
This view should also allow users to provide the details required for placing order for the selected item.
The details should include the item details as well as the customer details.
The details should be persisted, and the customer should be acknowledged after the order is successfully placed.
The app will request confirmation from the user to leave the view, if the user attempts to navigate away from this view without submitting the request.


Design Login View
The user should be navigated to the login view if he attempts navigation to the dairy-products- order view.
The view should request the user to enter the security code to login as Administrator.
Upon successful validation, the user should be navigated to the dairy-products-requests view.


Design Dairy-Products-Requests View
This view will display all the dairy products order requests received in tabular format.
This view has restricted access and is accessible only to the site administrator.