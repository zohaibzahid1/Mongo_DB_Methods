import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createDocument } from './functions.js'; // Import your function
import { createManyDocuments } from './functions.js'; // Import your function
import { findDocuments } from './functions.js'; // Import your function
import { findOneDocument } from './functions.js'; // Import your function
import { findLimitDocuments } from './functions.js';
import { findSkipDocuments } from './functions.js';
import { findSortDocuments } from './functions.js';
import { findDistinctValues } from './functions.js';
import { countDocuments } from './functions.js';
import { updateOneDocument } from './functions.js';
import { updateManyDocuments } from './functions.js';
import { replaceOneDocument } from './functions.js';
import { deleteOneDocument } from './functions.js';
import { deleteManyDocuments, aggregateDocuments } from './functions.js';
import { createIndex, dropIndex } from './functions.js';




const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

const connectDB = async () => {
  try {  
    const conn = await mongoose.connect("mongodb+srv://l227899:danish123@carloo-db.s53udpu.mongodb.net/?retryWrites=true&w=majority&appName=carloo-db");
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the process if connection fails
  }
};

connectDB();

//1)
app.post('/api/insertOne', createDocument);
// 2)
app.post('/api/insertMany', createManyDocuments);
// 3)
app.get('/api/find', findDocuments);
// 4) 
app.get('/api/findOne', findOneDocument);
// 5)
app.get('/api/findLimit', findLimitDocuments);
// 6)
app.get('/api/findSkip', findSkipDocuments);
// 7)
app.get('/api/findSort', findSortDocuments);
// 8)
app.get('/api/distinct', findDistinctValues);
// 9)
app.get('/api/countDocuments', countDocuments);
// 10)
app.put('/api/updateOne', updateOneDocument);
// 11)
app.put('/api/updateMany', updateManyDocuments);
// 12)
app.put('/api/replaceOne', replaceOneDocument);
// 13)
app.delete('/api/deleteOne', deleteOneDocument);

app.delete('/api/deleteMany', deleteManyDocuments);
app.post('/api/aggregate', aggregateDocuments);
app.post('/api/createIndex', createIndex);
app.post('/api/dropIndex', dropIndex);


import { getIndexes, findOneAndUpdateDocument, findOneAndDeleteDocument } from './functions.js';
app.get('/api/getIndexes', getIndexes);
app.post('/api/findOneAndUpdate', findOneAndUpdateDocument);
app.post('/api/findOneAndDelete', findOneAndDeleteDocument);


import { findOneAndReplaceDocument, renameCollection, dropCollection, listCollections } from './functions.js';

app.post('/api/findOneAndReplace', findOneAndReplaceDocument);
app.post('/api/renameCollection', renameCollection);
app.post('/api/dropCollection', dropCollection);
app.get('/api/listCollections', listCollections);

import { bulkWriteDocuments } from './functions.js';

app.post('/api/bulkWrite', bulkWriteDocuments);







app.listen(3000, () => console.log('Server running on port 3000'));