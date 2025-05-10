import React, { useState } from 'react';

function FiveOperationsPage() {
  // 1. Insert One
  const [name, setName] = useState('');
  const [insertResult, setInsertResult] = useState(null);

  // 2. Insert Many
  const [manyNames, setManyNames] = useState('');
  const [insertManyResult, setInsertManyResult] = useState(null);

  // 3. Find (by minimum age)
  const [minAge, setMinAge] = useState('');
  const [findResult, setFindResult] = useState(null);

  const handleInsertOne = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/insertOne', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    setInsertResult(data);
  };

  const handleInsertMany = async (e) => {
    e.preventDefault();
    // Split comma-separated names and trim whitespace
    const namesArray = manyNames.split(',').map(n => ({ name: n.trim() })).filter(n => n.name);
    const res = await fetch('http://localhost:3000/api/insertMany', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documents: namesArray }),
    });
    const data = await res.json();
    setInsertManyResult(data);
  };

  const handleFind = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/find?minAge=${minAge}`);
    const data = await res.json();
    setFindResult(data);
  };
  //4
  const [findOneName, setFindOneName] = useState('');
  const [findOneResult, setFindOneResult] = useState(null);

  const handleFindOne = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/findOne?name=${encodeURIComponent(findOneName)}`);
    const data = await res.json();
    setFindOneResult(data);
  };
  // 5. Find with limit
  const [limit, setLimit] = useState('');
  const [findLimitResult, setFindLimitResult] = useState(null);

  const handleFindLimit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/findLimit?limit=${limit}`);
    const data = await res.json();
    setFindLimitResult(data);
  };

  return (
    <div>
      <h2>MongoDB Operations (1-5)</h2>

      {/* 1. Insert One */}
      <form onSubmit={handleInsertOne}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <button type="submit">Insert One</button>
      </form>
      {insertResult && <pre>{JSON.stringify(insertResult, null, 2)}</pre>}

      {/* 2. Insert Many */}
      <form onSubmit={handleInsertMany}>
        <input
          value={manyNames}
          onChange={e => setManyNames(e.target.value)}
          placeholder="Comma separated names (e.g. Bob, Charlie)"
          required
        />
        <button type="submit">Insert Many</button>
      </form>
      {insertManyResult && <pre>{JSON.stringify(insertManyResult, null, 2)}</pre>}

      {/* 3. Find (by minimum age) */}
      <form onSubmit={handleFind}>
        <input
          value={minAge}
          onChange={e => setMinAge(e.target.value)}
          placeholder="Minimum age"
          type="number"
          required
        />
        <button type="submit">Find (age ≥ minAge)</button>
      </form>
      {findResult && <pre>{JSON.stringify(findResult, null, 2)}</pre>}

      {/* 4. Find One (by name) */}
      <form onSubmit={handleFindOne}>
        <input
          value={findOneName}
          onChange={e => setFindOneName(e.target.value)}
          placeholder="Name to find"
          required
        />
        <button type="submit">Find One</button>
      </form>
      {findOneResult && <pre>{JSON.stringify(findOneResult, null, 2)}</pre>}
    {/* 5. Find with Limit */}
      <form onSubmit={handleFindLimit}>
        <input
          value={limit}
          onChange={e => setLimit(e.target.value)}
          placeholder="Limit"
          type="number"
          required
        />
        <button type="submit">Find with Limit</button>
      </form>
      {findLimitResult && <pre>{JSON.stringify(findLimitResult, null, 2)}</pre>}
    
    </div>
  );
}
export default FiveOperationsPage;
// Do not export yet, will export after all 5 are added