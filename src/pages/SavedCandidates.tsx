import { useState, useEffect } from "react";

const SavedCandidates = () => {
  // Define the Candidate interface
  interface Candidate {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    location: string;
    email: string;
    company: string;
    bio: string;
  }

  // State to store saved candidates
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from localStorage when the page loads
  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setSavedCandidates(savedCandidates);
  }, []);

  // Function to remove a candidate from saved candidates
  const removeCandidate = (login: string): void => {
    const updatedCandidates = savedCandidates.filter((candidate: Candidate) => candidate.login !== login);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <div className="saved-container">
      <h1>Saved Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates saved yet!</p>
      ) : (
        <table className="saved-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                <td>
                  <img src={user.avatar_url} alt={`${user.login}'s avatar`} width="50" />
                </td>
                <td>{user.login}</td>
                <td>{user.location || "N/A"}</td>
                <td>{user.email || "N/A"}</td>
                <td>{user.company || "N/A"}</td>
                <td>{user.bio || "N/A"}</td>
                <td>
                  <button 
                    onClick={() => removeCandidate(user.login)} 
                    className="remove-button"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;
