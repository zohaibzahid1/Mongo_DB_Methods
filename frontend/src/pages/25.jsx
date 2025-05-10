import React, { useState } from 'react';

function TwentyFiveOperationsPage() {
  // 1. findOneAndReplace
  const [forName, setForName] = useState('');
  const [forAge, setForAge] = useState('');
  const [forResult, setForResult] = useState(null);

  // 2. renameCollection
  const [oldName, setOldName] = useState('');
  const [newName, setNewName] = useState('');
  const [renameResult, setRenameResult] = useState(null);

  // 3. drop
  const [dropName, setDropName] = useState('');
  const [dropResult, setDropResult] = useState(null);

  // 4. listCollections
  const [collections, setCollections] = useState(null);

  const handleFindOneAndReplace = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/findOneAndReplace', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filter: { name: forName },
        replacement: { name: forName, age: Number(forAge) }
      }),
    });
    const data = await res.json();
    setForResult(data);
  };

  const handleRenameCollection = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/renameCollection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldName, newName }),
    });
    const data = await res.json();
    setRenameResult(data);
  };

  const handleDropCollection = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/dropCollection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collectionName: dropName }),
    });
    const data = await res.json();
    setDropResult(data);
  };

  const handleListCollections = async () => {
    const res = await fetch('http://localhost:3000/api/listCollections');
    const data = await res.json();
    setCollections(data);
  };
  const [bulkWriteResult, setBulkWriteResult] = useState(null);

  const handleBulkWrite = async (e) => {
    e.preventDefault();
    // Example operations: insertOne and updateOne
    const operations = [
      { insertOne: { document: { name: "nobita" } } },
      { updateOne: { filter: { name: "zohaib" }, update: { $set: { age: 29 } } } }
    ];
    const res = await fetch('http://localhost:3000/api/bulkWrite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ operations }),
    });
    const data = await res.json();
    setBulkWriteResult(data);
  };


  return (
    <div>
      <h2>MongoDB Operations (21-25)</h2>

      {/* 1. findOneAndReplace */}
      <form onSubmit={handleFindOneAndReplace}>
        <input
          value={forName}
          onChange={e => setForName(e.target.value)}
          placeholder="Name to replace"
          required
        />
        <input
          value={forAge}
          onChange={e => setForAge(e.target.value)}
          placeholder="New age"
          type="number"
          required
        />
        <button type="submit">Find One And Replace</button>
      </form>
      {forResult && <pre>{JSON.stringify(forResult, null, 2)}</pre>}

      {/* 2. renameCollection */}
      <form onSubmit={handleRenameCollection}>
        <input
          value={oldName}
          onChange={e => setOldName(e.target.value)}
          placeholder="Old Collection Name"
          required
        />
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder="New Collection Name"
          required
        />
        <button type="submit">Rename Collection</button>
      </form>
      {renameResult && <pre>{JSON.stringify(renameResult, null, 2)}</pre>}

      {/* 3. drop */}
      <form onSubmit={handleDropCollection}>
        <input
          value={dropName}
          onChange={e => setDropName(e.target.value)}
          placeholder="Collection Name to Drop"
          required
        />
        <button type="submit">Drop Collection</button>
      </form>
      {dropResult && <pre>{JSON.stringify(dropResult, null, 2)}</pre>}

      {/* 4. listCollections */}
      <button onClick={handleListCollections}>List Collections</button>
      {collections && <pre>{JSON.stringify(collections, null, 2)}</pre>}
      {/* 5. bulkWrite */}
      <form onSubmit={handleBulkWrite}>
        <button type="submit">Bulk Write (Insert nobita, Update zohaib)</button>
      </form>
      {bulkWriteResult && <pre>{JSON.stringify(bulkWriteResult, null, 2)}</pre>}
    
    </div>
  );
}

export default TwentyFiveOperationsPage;