import React, { useState } from 'react';
import './GitHubApp.css'; // import the CSS file
import axios from 'axios';

const GitHubApp = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [repoName, setRepoName] = useState('');
  const [prNumber, setPRNumber] = useState('');
  const [tests, setTests] = useState([]);
  const [repos, setRepos] = useState([]);

  
  const initializeRepo = async () => {
    // make API call to initialize the GH Repository
    const response = await axios.post('/api/initialize', { repoUrl });
    if(response.data.success) {
      // Let's assume tests are returned after initialization
      setTests(response.data.tests);
      setRepos(response.data.tests);
    } else {
      alert('Initialization failed');
    }
  };
  
  const updateMappings = async () => {
    // make API call to update mappings for the GH Repository
    const response = await axios.post('/api/updateMappings', { repoName });
    if(response.data.success) {
      alert('Mappings updated successfully');
    } else {
      alert('Failed to update mappings');
    }
  };
  
  const runTests = async () => {
    // make API call to run selected tests
    const response = await axios.post('/api/runTests', { repoName });
    if(response.data.success) {
      alert('Tests run successfully');
    } else {
      alert('Failed to run tests');
    }
  };

  const showSelectedTests = async () => {
    // make API call to run selected tests
    const response = await axios.post('/api/getTests', { repoName });
    if(response.data.success) {
      alert('Tests run successfully');
    } else {
      alert('Failed to run tests');
    }
  };
  
  return (
    <div className="app">
      <h1 className="app-header">Regression Test Selector</h1>
      <div className="repos">
        <h2>Initialize Source</h2>
        <ul>
          {repos.map((repo, index) => <li key={index}>{repo}</li>)}
        </ul>
      </div>
      <div className="input-group">
        <input 
          className="input-field"
          type="text" 
          placeholder="Enter GitHub Repo URL" 
          value={repoUrl} 
          onChange={e => setRepoUrl(e.target.value)} 
        />
        <button className="btn" onClick={initializeRepo}>Initialize Repository</button>
      </div>
      <div className="input-group">
        <input 
          className="input-field"
          type="text" 
          placeholder="Enter Repository Name" 
          value={repoName} 
          onChange={e => setRepoName(e.target.value)} 
        />
        <button className="btn" onClick={updateMappings}>Update Mappings</button>
      </div>
      <div className="tests">
        <h2>Select Tests</h2>
        <ul>
          {tests.map((test, index) => <li key={index}>{test}</li>)}
        </ul>
      </div>
      <div className="input-group">
        <input 
          className="input-field"
          type="text" 
          placeholder="Enter Pull Request Number" 
          value={prNumber} 
          onChange={e => setPRNumber(e.target.value)} 
        />
        <button className="btn" onClick={showSelectedTests}>View Selected Tests</button>
        <button className="btn" onClick={runTests}>Run Selected Tests</button>
      </div>
    </div>
  );
};

export default GitHubApp;
