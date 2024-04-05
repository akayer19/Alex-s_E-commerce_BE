const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Get all products
router.get('/', async (req, res) => {
  try {
    // Fetch all products including their associated category and tags
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.json(products); // Return the found products as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get one product by id
router.get('/:id', async (req, res) => {
  try {
    // Find a product by its id, including its associated category and tags
    const product = await Product.findByPk(req.params.id, { 
      include: [{ model: Category }, { model: Tag }],
    });
    if (!product) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.json(product); // Return the found product as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // If there are product tags, create pairings in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // If no product tags, just respond with the product data
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

// Update product
router.put('/:id', (req, res) => {
  // Update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        // Find all product tags associated with the product
        ProductTag.findAll({
          where: { product_id: req.params.id },
        }).then((productTags) => {
          // Create a filtered list of existing tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            // Filter out tag_ids that are already associated with the product
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // Find product tags to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // Run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

// Delete product by id
router.delete('/:id', async (req, res) => {
  try {
    // Delete product with the specified id
    const affectedRows = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (affectedRows > 0) {
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'No product found with this id' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
