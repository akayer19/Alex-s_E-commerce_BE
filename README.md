# E-Commerce Backend Hub

## Description
This project serves as a back-end hub solution for an e-commerce application, offering a set of APIs built with Express.js, a popular Node.js web application framework. The APIs provided by this project enable the management of various aspects of the e-commerce platform, including categories, products, and tags.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [MIT License](https://opensource.org/licenses/MIT) 
- [Contributing](#contributing)
- [Tests](#tests)
- [Screenshot](#screenshot)
- [Questions](#questions)

## Installation
To install and run this application locally, follow these steps:
1. 'git clone https://github.com/akayer19/Alex-s_E-commerce_BE.git'
2. Navigate to the project directory
3. 'npm install'
4. Create a .env file in the project root and add the following environment variables:
    DB_NAME=your_database_name
    DB_USER=your_mysql_username
    DB_PASSWORD=your_mysql_password
5. 'npm run seed'

## Usage
To start the server, run the following command:
'node server.js'


## License
![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)

This project is licensed under the MIT License. 
See the [License](LICENSE) file for details.
 

## Contributing
Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests to improve this project.

## Tests
To test the API endpoints, you can use a tool like Insomnia Core or Postman. Ensure that the server is running locally before sending requests to the endpoints.

Categories
- GET /api/categories: Get all categories.
- GET /api/categories/:id: Get a single category by ID.
- POST /api/categories: Create a new category.
- PUT /api/categories/:id: Update a category by ID.
- DELETE /api/categories/:id: Delete a category by ID.
Products
- GET /api/products: Get all products.
- GET /api/products/:id: Get a single product by ID.
- POST /api/products: Create a new product.
- PUT /api/products/:id: Update a product by ID.
- DELETE /api/products/:id: Delete a product by ID.
Tags
- GET /api/tags: Get all tags.
- GET /api/tags/:id: Get a single tag by ID.
- POST /api/tags: Create a new tag.
- PUT /api/tags/:id: Update a tag by ID.
- DELETE /api/tags/:id: Delete a tag by ID.

## Screenshot
![Screenshot](./utils/screenshot.png)

## Questions
- If you have any questions, you can reach me on GitHub: <a href="https://github.com/akayer19" target="_blank">GitHub Profile</a>
- For additional questions, contact me via email: akayeauto@gmail.com
    