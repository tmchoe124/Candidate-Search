import React, { useState, useEffect } from "react";

interface User {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  location: string;
  email: string;
  company: string;
  bio: string;
}

const CandidateSearch: React.FC = () => {
  const [randomUser, setRandomUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRandomUser();
  }, []);

  const fetchRandomUser = async () => {
    try {
      const randomId = Math.floor(Math.random() * 100000) + 1;
      const response = await fetch(
        `https://api.github.com/users?since=${randomId}&per_page=1`
      );
      if (response.status === 403) {
        setError("Rate limit exceeded. Please try again later.");
        return;
      }
      const data = await response.json();
      setRandomUser(data[0]);
    } catch (error) {
      console.error("Error fetching random user", error);
      setError("Failed to fetch a random user.");
    }
  };

  const saveCandidate = (user: User) => {
    const savedCandidates: User[] = JSON.parse(
      localStorage.getItem("savedCandidates") || "[]"
    );
    localStorage.setItem(
      "savedCandidates",
      JSON.stringify([...savedCandidates, user])
    );
    alert(`${user.login} has been saved!`);

    fetchRandomUser();
  };

  const skipCandidate = () => {
    fetchRandomUser();
  };

  return (
    <div className="candidate-search-container">
      <h1 className="title">Candidate Search</h1>

      {error && <p className="error">{error}</p>}

      <div className="candidate-card">
        {randomUser && (
          <>
            <img
              className="avatar"
              src={randomUser.avatar_url}
              alt={`${randomUser.login}'s avatar`}
            />
            <h2>
              {randomUser.login} <span>({randomUser.login})</span>
            </h2>
            <p>Location: {randomUser.location || "N/A"}</p>
            <p>Email: {randomUser.email || "N/A"}</p>
            <p>Company: {randomUser.company || "N/A"}</p>
            <p>Bio: {randomUser.bio || "N/A"}</p>
            <div className="buttons">
              <button
                className="btn save"
                onClick={() => saveCandidate(randomUser)}
              >
                +
              </button>
              <button className="btn skip" onClick={skipCandidate}>
                -
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CandidateSearch;