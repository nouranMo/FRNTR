# FRNTR - Premium Furniture E-commerce Store

![FRNTR Logo](readmescreenshots/logo.png)

Welcome to FRNTR, an exceptional online store that offers high-quality furniture at affordable prices. Our project showcases a static website that incorporates various front-end features, all designed to elevate your shopping experience. With the implementation of EJS, MongoDB, ExpressJS, and NodeJS technologies, we have crafted a robust and user-friendly web application. By leveraging the power of these tools, we ensure seamless navigation, efficient data storage, and dynamic rendering of content. Explore FRNTR and indulge in a premium furniture shopping experience like no other.

## User Pages

### Navigation Partial:
Partial Description: Includes a search bar to easily find items and a robust navigation bar for seamless browsing.

- **Unique Feature**: The cart and wishlist only appear when a user is logged in. The login process includes a sidebar that enhances the aesthetic appeal. Additionally, the signup process sends an email verification to ensure authentication. The forgot password functionality also requires email verification for secure password recovery. At the top, we have a bar that includes "Summer Sale: Discount 10% off. Shop Now," where the percentage off is received from the backend by checking the highest offer.

![Navigation Bar](readmescreenshots/navigation.png)

### Footer Partial:
Partial Description: Includes the contact information and a fully functional newsletter subscription area integrated with the MailChimp API.

- **Unique Feature**: The newsletter subscription is seamlessly integrated with the MailChimp API for efficient communication with customers.

![Footer](readmescreenshots/footer.png)

### Home Page:
Page Description: The page is fully responsive and designed with a professional theme.

- **Unique Aspects**: Includes an automated slideshow and a responsive UI. Also features a chatbot powered by Dialogflow for enhanced customer support.

![Home Page](readmescreenshots/homepage.png)
![Home Page2](readmescreenshots/homepage1.png)

### Products Page:
Page Description: The page is fully responsive and includes sorting and filtering options.

- **Unique Aspects**: The sort, search, and filter options are seamlessly integrated to help users find their perfect item. Users can add items to the cart and wishlist directly from this page if they are logged in. Additionally, the page showcases hover animations on all products, providing different angles for each item.

![Products Page](readmescreenshots/productspage.png)

### Item Page:
Page Description: The page is fully responsive and provides smooth transitions between item pictures. It also displays similar items from the backend.

- **Unique Aspects**: Users can add items to the cart and wishlist only if they are logged in. Additionally, users can submit reviews for products, but the reviews need to be manually accepted by admins before appearing. The page also features hover animations on all products, displaying different angles for each item.

![Item Page](readmescreenshots/itempage.png)
![Item Page2](readmescreenshots/itempage1.png)

### Account Page:
Page Description: Allows users to edit their details and addresses, with easy navigation to access the wishlist and cart.

- **Unique Aspects**: The account page provides a user-friendly interface for users to manage their personal information and easily access their wishlist and cart.

![Account Page](readmescreenshots/accountpage.png)

### Cart Page:
Page Description: Displays the items added to the cart by the user.

- **Unique Aspects**: Users can view and modify the items in their cart, update quantities, and proceed to checkout. The cart page provides a seamless and intuitive shopping experience.

[Link to Cart Page](https://frntr.store/user/cartPage)
![Cart Page](readmescreenshots/cartpage.png)

### Wishlist Page:
Page Description: Displays the items added to the user's wishlist.

- **Unique Aspects**: Users can view their wishlist and easily add or remove items. The wishlist page allows users to save items for future purchase or reference.

[Link to Wishlist Page](https://frntr.store/user/wishlist)
![Wishlist Page](readmescreenshots/wishlistpage.png)

### Checkout Page:
Page Description: Allows users to complete their purchase and proceed with the order.

- **Unique Aspects**: The checkout page provides a secure and streamlined process for users to enter their shipping and payment information. It ensures a smooth transition from product selection to finalizing the order.

[Link to Checkout Page](https://frntr.store/checkout)
![Checkout Page](readmescreenshots/checkoutpage.png)


## Admin Pages (Accessible only to admins)

### Dashboard:
Page Description: The page is responsive and displays details on total orders, total users, and total products. It also includes statistics on the top 5 most sold items.

- **Unique Aspects**: The dashboard showcases hover animations on all products, displaying different angles for each item.

![Dashboard](readmescreenshots/dashboard.png)

### Products Page:
Page Description: Allows admins to browse through paginated products, search for products by name, and add or delete individual products.

- **Unique Aspects**: The page supports pagination and enables admins to search for products using their names. The search and sort queries can be combined to easily find specific products.

![Products Page](readmescreenshots/adminproductspage.png)
![Products Page2](readmescreenshots/adminproductspage2.png)

### Add Product:
Page Description: The page uses the same EJS file as the edit product page, with conditions to display the appropriate form.

- **Unique Aspects**: The page utilizes the Dropzone JavaScript library to simplify the process of adding and removing images dynamically. This improves the functionality compared to the standard file input method, which does not allow deletion of individual images.

![Add Product](readmescreenshots/addproduct.png)

### Edit Product:
Page Description: The page uses the same EJS file as the add product page, with conditions to display the appropriate form.

- **Unique Aspects**: The page utilizes the Dropzone JavaScript library to simplify the process of adding and removing images dynamically. This improves the functionality compared to the standard file input method.

[Link to Edit Product Page](https://frntr.store/adminproduct/addeditproduct)
![Edit Product](readmescreenshots/editproduct.png)

### Orders Page:
Page Description: Displays all the orders done with the address details, cart details and total amount paid.

- **Unique Aspects**: The page showcases hover animations on all products, displaying different angles for each item.

[Link to Orders Page](https://frntr.store/admin/orders)
![Orders Page](readmescreenshots/orders.png)

### Customers Page:
Page Description: Displays a list of all users with the ability to edit and delete user information.

- **Unique Aspects**: The page supports pagination, allowing admins to easily navigate through a large number of users. Admins can search for users by email addresses and change the role of users to either admin or client with a simple click.

[Link to Customers Page](https://frntr.store/admin/customers)
![Customers Page](readmescreenshots/customers.png)
![Edit User](readmescreenshots/edituser.png)
![Make Admin](readmescreenshots/makeadmin.png)

### Statistics Page:
Page Description: Displays a list of the top 10 best-selling items and top 10 worst-selling items to provide admins with insights on trending products.

- **Unique Aspects**: The page showcases hover animations on all products, displaying different angles for each item.

[Link to Statistics Page](https://frntr.store/admin/statistics)
![Statistics Page](readmescreenshots/statistics.png)

### Reviews Page:
Page Description: Displays customer reviews for each item, allowing admins to moderate and manage reviews.

link: https://frntr.store/admin/reviews
![Reviews Page](readmescreenshots/reviews.png)

### Hot Offers:
Page Description: Displays all items with special offers in the database.

- **Unique Aspects**: The page showcases hover animations on all products, displaying different angles for each item.

link: https://frntr.store/admin/offer
![Hot Offers Page](readmescreenshots/offers.png)

## Check Out Our Web Application

Experience the convenience of online furniture shopping through our web application. Click on the following link to check it out:

[frntr.store](https://frntr.store)

## Repository Transfer

Please note that we have transferred from our old repository at [https://github.com/GeorgeAyy/Web-Ninjas-El-Cyber](https://github.com/GeorgeAyy/Web-Ninjas-El-Cyber) to this new repository.

## Contact Us

Need help or have a question? Feel free to reach out to us!

[![George Aziz](https://img.shields.io/badge/George%20Aziz-Contact-blue)](mailto:george2100977@miuegypt.edu.eg)
[![Zeina Hesham](https://img.shields.io/badge/Zeina%20Hesham-Contact-blue)](mailto:Zeina2101569@miuegypt.edu.eg)
[![Nouran Mohamed](https://img.shields.io/badge/Nouran%20Mohamed-Contact-blue)](mailto:nouran2110183@miuegypt.edu.eg)
[![Yassmin Ezzat](https://img.shields.io/badge/Yassmin%20Ezzat-Contact-blue)](mailto:yassmin2104022@miuegypt.edu.eg)
[![Farrah Hany](https://img.shields.io/badge/Farrah%20Hany-Contact-blue)](mailto:farah2102625@miuegypt.edu.eg)

Thank you for choosing FRNTR for your furniture needs. We are committed to delivering premium products and exceptional customer service.
