import React, { useEffect, useState } from 'react';

const AdvancedCounter = () => {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);
  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState(false);

 
  const increment = () => {
    const newCount = count + step;
    setCount(newCount);
    setHistory(prev => [...prev, newCount]);
  };

  const decrement = () => {
    const newCount = count - step;
    setCount(newCount);
    setHistory(prev => [...prev, newCount]);
  };

  // For the Reset count 
  const reset = () => {
    setCount(0);
    setHistory([0]);
    setSaved(false);
  };

  useEffect(() => {
    localStorage.setItem('counterValue', count);
    setSaved(true);

    const timeout = setTimeout(() => {
      setSaved(false);
    }, 1000);

    // for Cleanup
    return () => clearTimeout(timeout); 
  }, [count]);


  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowUp') increment();
      if (e.key === 'ArrowDown') decrement();
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [count, step]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-lg space-y-4">
      <h1 className="text-2xl font-bold text-center">Advanced Counter</h1>

      <div className="text-center text-xl">Current Count: {count}</div>

      <div className="flex justify-center gap-4">
        <button onClick={decrement} className="px-4 py-2 bg-red-500 text-white rounded">Decrement</button>
        <button onClick={increment} className="px-4 py-2 bg-green-500 text-white rounded">Increment</button>
        <button onClick={reset} className="px-4 py-2 bg-gray-400 text-white rounded">Reset</button>
      </div>

      <div className="flex flex-col items-center">
        <label htmlFor="step">Step Value:</label>
        <input
          id="step"
          type="number"
          value={step}
          onChange={(e) => setStep(parseInt(e.target.value) || 1)}
          className="border px-2 py-1 w-20 text-center"
        />
      </div>

      {saved && <p className="text-green-600 text-center">Changes saved.</p>}

      <div>
        <h2 className="font-semibold">Count History:</h2>
        <ul className="list-disc ml-6">
          {history.map((value, index) => (
            <li key={index}>Count: {value}</li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-center text-gray-500">Use ArrowUp and ArrowDown keys to control the counter.</p>
    </div>
  );
};

export default AdvancedCounter;