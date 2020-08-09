
const router = require('express').Router();
const { deleteCategory, updateCategory, createCategory, getCategory } = require('../database/categories');

router.get('/', async (apiRequest, apiResponse) => {
    apiResponse.send(await getCategory());
});

// we name our parameters apiRequest and apiResponse here but
// there is no strong reason these variables could not be named `req` and `res` or `request` and `response`
// the reason for this naming is so we are thinking about "api" tonight
router.post('/', async (apiRequest, apiResponse) => {
    const newCategory = apiRequest.body;
    await createCategory(newCategory);
    apiResponse.send({
        message: 'New category created.',
        allCategory: await getCategory(),
        thanks: true
    });
});

// endpoint to delete a category
router.delete('/:categoryId', async (apiRequest, apiResponse) => {
    await deleteCategory(apiRequest.params.categoryId);
    apiResponse.send({ message: 'Category deleted.' });
});

// endpoint to update a category
router.put('/:id', async (apiRequest, apiResponse) => {
    const updatedCategory = apiRequest.body;
    console.log({ updatedCategory })
    await updateCategory(apiRequest.params.id, updatedCategory);
    apiResponse.send({ message: 'Category updated.' });
});

module.exports = router;



