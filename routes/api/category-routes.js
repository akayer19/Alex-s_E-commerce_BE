const router = require('express').Router(); // Importing the Router module from Express to create route handlers
const { Category, Product } = require('../../models'); // Importing the Category and Product models from the models directory

// The `/api/categories` endpoint

router.get('/', async (req, res) => { // Route for fetching all categories
  try {
    const categories = await Category.findAll({ // Finding all categories from the database
      include: [{ model: Product }], // Including associated products with each category
    });
    res.json(categories); // Sending the fetched categories as JSON response
  } catch (err) { // Handling any errors that occur during database operation
    res.status(500).json(err); // Sending a 500 status code along with the error message as JSON response
  }
});

router.get('/:id', async (req, res) => { // Route for fetching a single category by ID
  try {
    const category = await Category.findByPk(req.params.id, { // Finding a category by its primary key (ID)
      include: [{ model: Product }], // Including associated products with the category
    });
    if (!category) { // Checking if the category exists
      res.status(404).json({ message: 'Category not found' }); // Sending a 404 status code and error message if category is not found
      return;
    }
    res.json(category); // Sending the fetched category as JSON response
  } catch (err) { // Handling any errors that occur during database operation
    res.status(500).json(err); // Sending a 500 status code along with the error message as JSON response
  }
});

router.post('/', async (req, res) => { // Route for creating a new category
  try {
    const newCategory = await Category.create(req.body); // Creating a new category with the provided request body
    res.status(201).json(newCategory); // Sending a 201 status code (resource created) along with the newly created category as JSON response
  } catch (err) { // Handling any errors that occur during database operation
    res.status(400).json(err); // Sending a 400 status code along with the error message as JSON response
  }
});

router.put('/:id', async (req, res) => { // Route for updating a category by ID
  try {
    const updatedCategory = await Category.update(req.body, { // Updating the category with the provided request body
      where: { id: req.params.id }, // Specifying the category to update based on its ID
    });
    if (!updatedCategory[0]) { // Checking if the category was successfully updated
      res.status(404).json({ message: 'Category not found' }); // Sending a 404 status code and error message if category is not found
      return;
    }
    res.json({ message: 'Category updated successfully' }); // Sending a success message as JSON response
  } catch (err) { // Handling any errors that occur during database operation
    res.status(400).json(err); // Sending a 400 status code along with the error message as JSON response
  }
});

router.delete('/:id', async (req, res) => { // Route for deleting a category by ID
  try {
    const deletedCategory = await Category.destroy({ // Deleting the category from the database
      where: { id: req.params.id }, // Specifying the category to delete based on its ID
    });
    if (!deletedCategory) { // Checking if the category was successfully deleted
      res.status(404).json({ message: 'Category not found' }); // Sending a 404 status code and error message if category is not found
      return;
    }
    res.json({ message: 'Category deleted successfully' }); // Sending a success message as JSON response
  } catch (err) { // Handling any errors that occur during database operation
    res.status(500).json(err); // Sending a 500 status code along with the error message as JSON response
  }
});

module.exports = router; // Exporting the router with defined category routes
