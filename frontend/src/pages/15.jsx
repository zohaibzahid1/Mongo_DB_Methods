import React, { useState } from 'react';

function FifteenOperationsPage() {
  // 1. Update Many
  const [updateManyResult, setUpdateManyResult] = useState(null);

  // 2. Replace One
  const [replaceName, setReplaceName] = useState('');
  const [replaceAge, setReplaceAge] = useState('');
  const [replaceResult, setReplaceResult] = useState(null);

  // 3. Delete One
  const [deleteName, setDeleteName] = useState('');
  const [deleteResult, setDeleteResult] = useState(null);

  const handleUpdateMany = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/updateMany', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filter: { age: { $lt: 18 } },
        update: { minor: true }
      }),
    });
    const data = await res.json();
    setUpdateManyResult(data);
  };

  const handleReplaceOne = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/replaceOne', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filter: { name: replaceName },
        replacement: { name: replaceName, age: Number(replaceAge) }
      }),
    });
    const data = await res.json();
    setReplaceResult(data);
  };

  const handleDeleteOne = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/deleteOne', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filter: { name: deleteName }
      }),
    });
    const data = await res.json();
    setDeleteResult(data);
  };
  // 4. Delete Many
  const [deleteManyField, setDeleteManyField] = useState('');
  const [deleteManyValue, setDeleteManyValue] = useState('');
  const [deleteManyResult, setDeleteManyResult] = useState(null);

  // 5. Aggregate
  const [aggregateResult, setAggregateResult] = useState(null);

  // ...existing handlers...

  const handleDeleteMany = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/deleteMany', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filter: { [deleteManyField]: deleteManyValue }
      }),
    });
    const data = await res.json();
    setDeleteManyResult(data);
  };

  const handleAggregate = async (e) => {
    e.preventDefault();
    // Example pipeline: match age > 18, group by city, count
    const pipeline = [
      { $match: { age: { $gt: 18 } } },
      { $group: { _id: "$city", count: { $sum: 1 } } }
    ];
    const res = await fetch('http://localhost:3000/api/aggregate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pipeline }),
    });
    const data = await res.json();
    setAggregateResult(data);
};

  return (
    <div>
      <h2>MongoDB Operations (11-15)</h2>
      {/* 1. Update Many */}
      <form onSubmit={handleUpdateMany}>
        <button type="submit">Update All Minors (age &lt; 18)</button>
      </form>
      {updateManyResult && <pre>{JSON.stringify(updateManyResult, null, 2)}</pre>}

      {/* 2. Replace One */}
      <form onSubmit={handleReplaceOne}>
        <input
          value={replaceName}
          onChange={e => setReplaceName(e.target.value)}
          placeholder="Name to replace"
          required
        />
        <input
          value={replaceAge}
          onChange={e => setReplaceAge(e.target.value)}
          placeholder="New age"
          type="number"
          required
        />
        <button type="submit">Replace One</button>
      </form>
      {replaceResult && <pre>{JSON.stringify(replaceResult, null, 2)}</pre>}

      {/* 3. Delete One */}
      <form onSubmit={handleDeleteOne}>
        <input
          value={deleteName}
          onChange={e => setDeleteName(e.target.value)}
          placeholder="Name to delete"
          required
        />
        <button type="submit">Delete One</button>
      </form>
      {deleteResult && <pre>{JSON.stringify(deleteResult, null, 2)}</pre>}

        {/* 4. Delete Many */}
      <form onSubmit={handleDeleteMany}>
        <input
          value={deleteManyField}
          onChange={e => setDeleteManyField(e.target.value)}
          placeholder="Field (e.g. inactive)"
          required
        />
        <input
          value={deleteManyValue}
          onChange={e => setDeleteManyValue(e.target.value)}
          placeholder="Value (e.g. true)"
          required
        />
        <button type="submit">Delete Many</button>
      </form>
      {deleteManyResult && <pre>{JSON.stringify(deleteManyResult, null, 2)}</pre>}

      {/* 5. Aggregate */}
      <form onSubmit={handleAggregate}>
        <button type="submit">Aggregate: Group by City (age &gt; 18)</button>
      </form>
      {aggregateResult && <pre>{JSON.stringify(aggregateResult, null, 2)}</pre>}

      {/* More operations will be added here as you request */}
    </div>
  );
}

export default FifteenOperationsPage;