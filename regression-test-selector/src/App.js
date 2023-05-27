import React, { useState } from 'react';
import './GitHubApp.css'; // import the CSS file
import axios from 'axios';

const GitHubApp = () => {
  const [showConfigForm, setShowConfigForm] = useState(false);
  const [repoName, setRepoName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [monitoringURL, setMonitoringURL] = useState('');
  const [message, setConfigMessage] = useState('');
  const [showRTSForm, setShowRTSForm] = useState(false);
  const [rtsMsg, setRTSMessage] = useState('');
  const [prNumber, setPRNumber] = useState('');


  const handleConfigFormSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/configure?repoName=${repoName}&branchName=${branchName}&monitoringURL=${monitoringURL}`;
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setConfigMessage('Configuration successful!');
      } else {
        setConfigMessage('Configuration failed!');
      }
    } catch (error) {
      setConfigMessage('Configuration failed!');
    }
  };
  const handleRTSFormSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/rts?repoName=${repoName}&branchName=${branchName}&pr=${prNumber}`
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setRTSMessage(response.data);
      } else {
        setRTSMessage('Test selection failed!');
      }
    } catch (error) {
      setRTSMessage('Test selection failed!');
    }
  };

  return (
    <div className="app">
      <h1 className="app-header">Regression Test Selector</h1>
      <div className="input-group">
        <button className="btn" onClick={() => { setShowConfigForm(!showConfigForm); setConfigMessage('') }} >
          {showConfigForm ? 'Back to Home' : 'Initialize Microservices'}
        </button>
        {showConfigForm && (
          <form onSubmit={handleConfigFormSubmit}>
            <input
              className="input-field"
              type="text"
              placeholder="Enter Repository Name"
              value={repoName}
              onChange={e => setRepoName(e.target.value)}
            />
            <input
              className="input-field"
              type="text"
              placeholder="Enter Branch Name"
              value={branchName}
              onChange={e => setBranchName(e.target.value)}
            />
            <input
              className="input-field"
              type="text"
              placeholder="Enter Monitoring URL"
              value={monitoringURL}
              onChange={e => setMonitoringURL(e.target.value)}
            />
            <button className="btn">Initialize</button>
          </form>
        )}
        {message && <p>{message}</p>}
      </div>
      <div className="input-group">
        <button className="btn" onClick={() => { setShowRTSForm(!showRTSForm); setConfigMessage('') }} >
          {showRTSForm ? 'Back to Home' : 'Get Selected Tests'}
        </button>
        {showRTSForm && (
          <form onSubmit={handleRTSFormSubmit}>
            <input
              className="input-field"
              type="text"
              placeholder="Enter Repository Name"
              value={repoName}
              onChange={e => setRepoName(e.target.value)}
            />
            <input
              className="input-field"
              type="text"
              placeholder="Enter Branch Name"
              value={branchName}
              onChange={e => setBranchName(e.target.value)}
            />
            <input
              className="input-field"
              type="text"
              placeholder="Enter PR Number"
              value={repoName}
              onChange={e => setPRNumber(e.target.value)}
            />
            <button className="btn">Get Tests</button>
          </form>
        )}
        {rtsMsg && <p>{rtsMsg}</p>}
      </div>
    </div>
  );
};

export default GitHubApp;
