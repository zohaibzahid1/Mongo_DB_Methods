import React, { useState } from 'react';

function TenOperationsPage() {
  // 1. Find with skip
  const [skip, setSkip] = useState('');
  const [findSkipResult, setFindSkipResult] = useState(null);

  const handleFindSkip = async (e) => {
  e.preventDefault();
  // Make sure skip is a number and not empty
  console.log('reeached here');
  const skipValue = skip ? skip : 0;
  const res = await fetch(`http://localhost:3000/api/findSkip?skip=${skipValue}`);
  if (!res.ok) {
    setFindSkipResult({ error: `Error: ${res.status}` });
    return;
  }
  const data = await res.json();
  setFindSkipResult(data);
};

  // 2. Find with sort
  const [sortOrder, setSortOrder] = useState('-1');
  const [findSortResult, setFindSortResult] = useState(null);

  const handleFindSort = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/findSort?field=age&order=${sortOrder}`);
    const data = await res.json();
    setFindSortResult(data);
  };
  // 3. Distinct
  const [distinctField, setDistinctField] = useState('');
  const [distinctResult, setDistinctResult] = useState(null);

  const handleDistinct = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/distinct?field=${distinctField}`);
    const data = await res.json();
    setDistinctResult(data);
  };
   // 4. Count Documents
  const [countField, setCountField] = useState('');
  const [countValue, setCountValue] = useState('');
  const [countResult, setCountResult] = useState(null);

  const handleCountDocuments = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (countField) params.append('field', countField);
    if (countValue) params.append('value', countValue);
    const res = await fetch(`http://localhost:3000/api/countDocuments?${params.toString()}`);
    const data = await res.json();
    setCountResult(data);
  };
  // 5. Update One
  const [updateName, setUpdateName] = useState('');
  const [updateAge, setUpdateAge] = useState('');
  const [updateResult, setUpdateResult] = useState(null);

  const handleUpdateOne = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/updateOne', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: updateName, age: updateAge }),
    });
    const data = await res.json();
    setUpdateResult(data);
  };

  return (
    <div>
      <h2>MongoDB Operations (6-10)</h2>
      {/* 1. Find with Skip */}
      <form onSubmit={handleFindSkip}>
        <input
          value={skip}
          onChange={e => setSkip(e.target.value)}
          placeholder="Skip"
          type="number"
          required
        />
        <button type="submit">Find with Skip</button>
      </form>
      {findSkipResult && <pre>{JSON.stringify(findSkipResult, null, 2)}</pre>}

      {/* 2. Find with Sort */}
      <form onSubmit={handleFindSort}>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="-1">Age Descending</option>
          <option value="1">Age Ascending</option>
        </select>
        <button type="submit">Find with Sort</button>
      </form>
      {findSortResult && <pre>{JSON.stringify(findSortResult, null, 2)}</pre>}
         {/* 3. Distinct */}
      <form onSubmit={handleDistinct}>
        <input
          value={distinctField}
          onChange={e => setDistinctField(e.target.value)}
          placeholder="Field (e.g. city)"
          required
        />
        <button type="submit">Distinct</button>
      </form>
      {distinctResult && <pre>{JSON.stringify(distinctResult, null, 2)}</pre>}
          {/* 4. Count Documents */}
      <form onSubmit={handleCountDocuments}>
        <input
          value={countField}
          onChange={e => setCountField(e.target.value)}
          placeholder="Field (e.g. active)"
          required
        />
        <input
          value={countValue}
          onChange={e => setCountValue(e.target.value)}
          placeholder="Value (e.g. true)"
          required
        />
        <button type="submit">Count Documents</button>
      </form>
      {countResult && <pre>{JSON.stringify(countResult, null, 2)}</pre>}
      {/* 5. Update One */}
      <form onSubmit={handleUpdateOne}>
        <input
          value={updateName}
          onChange={e => setUpdateName(e.target.value)}
          placeholder="Name to update"
          required
        />
        <input
          value={updateAge}
          onChange={e => setUpdateAge(e.target.value)}
          placeholder="New age"
          type="number"
          required
        />
        <button type="submit">Update One</button>
      </form>
      {updateResult && <pre>{JSON.stringify(updateResult, null, 2)}</pre>}

      {/* More operations will be added here as you request */}
    </div>
  );
}

export default TenOperationsPage;