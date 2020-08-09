const { getDatabase } = require('./mongo-common');
// https://docs.mongodb.com/manual/reference/method/ObjectId/
const { ObjectID } = require('mongodb');

const getUserName = require('git-user-name');
console.log(getUserName());

// a "collection" in mongo is a lot like a list which is a lot like an Array
const collectionName = 'categories';

async function createCategory(category) {
    const database = await getDatabase();
    category.addedBy = getUserName()
    // for `insertOne` info, see https://docs.mongodb.com/manual/reference/method/js-collection/
    const { insertedId } = await database.collection(collectionName).insertOne(category);
    return insertedId;
}

async function getCategory() {
    const database = await getDatabase();
    // `find` https://docs.mongodb.com/manual/reference/method/db.collection.find/#db.collection.find
    return await database.collection(collectionName).find({}).toArray();
}

async function deleteCategory(id) {
    const database = await getDatabase();
    // https://docs.mongodb.com/manual/reference/method/ObjectId/
    // for `deleteOne` info see  https://docs.mongodb.com/manual/reference/method/js-collection/
    await database.collection(collectionName).deleteOne({
        _id: new ObjectID(id),
    });
}

async function updateCategory(id, category) {
    const database = await getDatabase();

    // `delete` is new to you. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
    delete category._id;
    category.updatedBy = getUserName()
    // https://docs.mongodb.com/manual/reference/method/db.collection.update/
    await database.collection(collectionName).update(
        { _id: new ObjectID(id), },
        {
            $set: {
                ...category,
            },
        },
    );
}

// export the functions that can be used by the main app code
module.exports = {
    createCategory,
    getCategory,
    deleteCategory,
    updateCategory,
};
