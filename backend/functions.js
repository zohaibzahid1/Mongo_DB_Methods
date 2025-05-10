import mongoose from 'mongoose';

// Define schema and model if not already defined
const ExampleSchema = new mongoose.Schema({
    name: String,
    age: { type: Number, default: 0 },
     minor: { type: Boolean, default: false },
    city: { type: String}
});
const Example = mongoose.models.Example || mongoose.model('Example', ExampleSchema);

// Function for insertOne
export const createDocument = async (req, res) => {
  try {
    const { name } = req.body;
    const doc = new Example({ name });
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Function for insertMany
export const createManyDocuments = async (req, res) => {
  try {
    const { documents } = req.body;
    const docs = await Example.insertMany(documents);
    res.status(201).json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const findDocuments = async (req, res) => {
  try {
    const minAge = parseInt(req.query.minAge, 10);
    const docs = await Example.find({ age: { $gte: minAge } });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const findOneDocument = async (req, res) => {
  try {
    const { name } = req.query;
    const doc = await Example.findOne({ name });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const findLimitDocuments = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10);
    const docs = await Example.find().limit(limit);
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Function for find().skip()
export const findSkipDocuments = async (req, res) => {
  try {
    console.log('findSkipDocuments called');
    const skip = parseInt(req.query.skip, 10);
    
    const docs = await Example.find().skip(skip);
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const findSortDocuments = async (req, res) => {
  try {
    // Default to descending by age if not specified
    const sortField = req.query.field || 'age';
    const sortOrder = parseInt(req.query.order, 10) || -1;
    const docs = await Example.find().sort({ [sortField]: sortOrder });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Function for distinct
export const findDistinctValues = async (req, res) => {
  try {
    const field = req.query.field;
    const values = await Example.distinct(field);
    res.json(values);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Function for countDocuments
export const countDocuments = async (req, res) => {
  try {
    // Example: count by active=true, or allow any field via query
    const { field, value } = req.query;
    let filter = {};
    if (field && value !== undefined) {
      // Try to convert value to boolean/number if possible
      let parsedValue = value;
      if (value === 'true') parsedValue = true;
      else if (value === 'false') parsedValue = false;
      else if (!isNaN(Number(value))) parsedValue = Number(value);
      filter[field] = parsedValue;
    }
    const count = await Example.countDocuments(filter);
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Function for updateOne
export const updateOneDocument = async (req, res) => {
  try {
    const { name, age } = req.body;
    const result = await Example.updateOne(
      { name },
      { $set: { age } }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateManyDocuments = async (req, res) => {
  try {
    // Example: { age: { $lt: 18 } }, { minor: true }
    const { filter, update } = req.body;
    const result = await Example.updateMany(filter, { $set: update });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Function for replaceOne
export const replaceOneDocument = async (req, res) => {
  try {
    const { filter, replacement } = req.body;
    const result = await Example.replaceOne(filter, replacement);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function for deleteOne
export const deleteOneDocument = async (req, res) => {
  try {
    const { filter } = req.body;
    const result = await Example.deleteOne(filter);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Function for deleteMany
export const deleteManyDocuments = async (req, res) => {
  try {
    const { filter } = req.body;
    const result = await Example.deleteMany(filter);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function for aggregate
export const aggregateDocuments = async (req, res) => {
  try {
    const { pipeline } = req.body;
    const result = await Example.aggregate(pipeline);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Function for createIndex
export const createIndex = async (req, res) => {
  try {
    const { field, options } = req.body;
    // Example: field = { name: 1 }, options = { unique: true }
    const result = await Example.collection.createIndex(field, options);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function for dropIndex
export const dropIndex = async (req, res) => {
  try {
    const { indexName } = req.body;
    // Example: indexName = "name_1"
    const result = await Example.collection.dropIndex(indexName);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Function for getIndexes
export const getIndexes = async (req, res) => {
  try {
    const indexes = await Example.collection.indexes();
    res.json(indexes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function for findOneAndUpdate
export const findOneAndUpdateDocument = async (req, res) => {
  try {
    const { filter, update, options } = req.body;
    const doc = await Example.findOneAndUpdate(filter, update, { ...options, new: true });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function for findOneAndDelete
export const findOneAndDeleteDocument = async (req, res) => {
  try {
    const { filter } = req.body;
    const doc = await Example.findOneAndDelete(filter);
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Function for findOneAndReplace
export const findOneAndReplaceDocument = async (req, res) => {
  try {
    const { filter, replacement } = req.body;
    const doc = await Example.findOneAndReplace(filter, replacement, { new: true });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function for renameCollection
export const renameCollection = async (req, res) => {
  try {
    const { oldName, newName } = req.body;
    const result = await mongoose.connection.db.renameCollection(oldName, newName);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function for drop collection
export const dropCollection = async (req, res) => {
  try {
    const { collectionName } = req.body;
    const result = await mongoose.connection.db.dropCollection(collectionName);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function for listCollections
export const listCollections = async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json(collections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Function for bulkWrite
export const bulkWriteDocuments = async (req, res) => {
  try {
    const { operations } = req.body;
    const result = await Example.bulkWrite(operations);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};