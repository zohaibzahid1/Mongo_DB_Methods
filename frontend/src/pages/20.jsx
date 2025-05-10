import React, { useState } from 'react';

function TwentyOperationsPage() {
  // 1. Create Index
  const [indexField, setIndexField] = useState('');
  const [isUnique, setIsUnique] = useState(false);
  const [createIndexResult, setCreateIndexResult] = useState(null);

  // 2. Drop Index
  const [dropIndexName, setDropIndexName] = useState('');
  const [dropIndexResult, setDropIndexResult] = useState(null);

  const handleCreateIndex = async (e) => {
    e.preventDefault();
    // Example: { name: 1 }
    const field = {};
    field[indexField] = 1;
    const options = isUnique ? { unique: true } : {};
    const res = await fetch('http://localhost:3000/api/createIndex', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ field, options }),
    });
    const data = await res.json();
    setCreateIndexResult(data);
  };

  const handleDropIndex = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/dropIndex', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ indexName: dropIndexName }),
    });
    const data = await res.json();
    setDropIndexResult(data);
  };
  const [indexesResult, setIndexesResult] = useState(null);

  // 4. FindOneAndUpdate
  const [fuaName, setFuaName] = useState('');
  const [fuaNewName, setFuaNewName] = useState('');
  const [fuaResult, setFuaResult] = useState(null);

  // 5. FindOneAndDelete
  const [fodName, setFodName] = useState('');
  const [fodResult, setFodResult] = useState(null);

  // ...existing handlers...

  const handleGetIndexes = async () => {
    const res = await fetch('http://localhost:3000/api/getIndexes');
    const data = await res.json();
    setIndexesResult(data);
  };

  const handleFindOneAndUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/findOneAndUpdate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filter: { name: fuaName },
        update: { $set: { name: fuaNewName } },
        options: { returnDocument: 'after' }
      }),
    });
    const data = await res.json();
    setFuaResult(data);
  };

  const handleFindOneAndDelete = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/findOneAndDelete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filter: { name: fodName }
      }),
    });
    const data = await res.json();
    setFodResult(data);
  };


  return (
    <div>
      <h2>MongoDB Operations (16-20)</h2>
      {/* 1. Create Index */}
      <form onSubmit={handleCreateIndex}>
        <input
          value={indexField}
          onChange={e => setIndexField(e.target.value)}
          placeholder="Field (e.g. name)"
          required
        />
        <label>
          <input
            type="checkbox"
            checked={isUnique}
            onChange={e => setIsUnique(e.target.checked)}
          />
          Unique
        </label>
        <button type="submit">Create Index</button>
      </form>
      {createIndexResult && <pre>{JSON.stringify(createIndexResult, null, 2)}</pre>}

      {/* 2. Drop Index */}
      <form onSubmit={handleDropIndex}>
        <input
          value={dropIndexName}
          onChange={e => setDropIndexName(e.target.value)}
          placeholder='Index Name (e.g. "name_1")'
          required
        />
        <button type="submit">Drop Index</button>
      </form>
      {dropIndexResult && <pre>{JSON.stringify(dropIndexResult, null, 2)}</pre>}

      {/* More operations will be added here as you request */}
      {/* 3. Get Indexes */}
      <button onClick={handleGetIndexes}>Get Indexes</button>
      {indexesResult && <pre>{JSON.stringify(indexesResult, null, 2)}</pre>}

      {/* 4. FindOneAndUpdate */}
      <form onSubmit={handleFindOneAndUpdate}>
        <input
          value={fuaName}
          onChange={e => setFuaName(e.target.value)}
          placeholder="Current name"
          required
        />
        <input
          value={fuaNewName}
          onChange={e => setFuaNewName(e.target.value)}
          placeholder="New name"
          required
        />
        <button type="submit">Find One And Update</button>
      </form>
      {fuaResult && <pre>{JSON.stringify(fuaResult, null, 2)}</pre>}

      {/* 5. FindOneAndDelete */}
      <form onSubmit={handleFindOneAndDelete}>
        <input
          value={fodName}
          onChange={e => setFodName(e.target.value)}
          placeholder="Name to delete"
          required
        />
        <button type="submit">Find One And Delete</button>
      </form>
      {fodResult && <pre>{JSON.stringify(fodResult, null, 2)}</pre>}
    
      
    </div>
  );
}

export default TwentyOperationsPage;