import React, { useState } from "react";
import axios from "axios";
import "./Section1.css";

function Section1() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [games, setGames] = useState([]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `https://lichess.org/api/user/${username}`
      );
      console.log(response);
      setProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGames = async () => {
    try {
      const response = await axios.get(
        `https://lichess.org/api/games/user/${username}`
      );
      //   const response = JSON.stringify(responseres, null, 2)
      console.log(response);
      setGames(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">

      <p>##If there is any delay in showing the data then please wait as some time there might be some problem in api... ##  </p>
      <input
        type="text"
        className="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="btn" onClick={fetchProfile}>
        Get Profile
      </button>
      <button className="btn" onClick={fetchGames}>
        Get Games
      </button>

      {profile && (
        <div>
          <h2 className="name">Name of the Player : {profile.username}</h2>

          <table className="table1">
            <thead>
              <tr>
                <th>.</th>
                <th>Games</th>
                <th>prog</th>
                <th>rating</th>
                <th>rd</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>blitz</th>
                <td>{profile.perfs.blitz.games}</td>
                <td>{profile.perfs.blitz.prog}</td>
                <td>{profile.perfs.blitz.rating}</td>
                <td>{profile.perfs.blitz.rd}</td>
              </tr>

              <tr>
                <th>bullet</th>
                <td>{profile.perfs.bullet.games}</td>
                <td>{profile.perfs.bullet.prog}</td>
                {/* <td>{profile.perfs.blitz.prov}</td> */}
                <td>{profile.perfs.bullet.rating}</td>
                <td>{profile.perfs.bullet.rd}</td>
              </tr>

              <tr>
                <th>correspondence</th>
                <td>{profile.perfs.correspondence.games}</td>
                <td>{profile.perfs.correspondence.prog}</td>
                {/* <td>{profile.perfs.blitz.prov}</td> */}
                <td>{profile.perfs.correspondence.rating}</td>
                <td>{profile.perfs.correspondence.rd}</td>
              </tr>

              <tr>
                <th>classical</th>
                <td>{profile.perfs.classical.games}</td>
                <td>{profile.perfs.classical.prog}</td>
                {/* <td>{profile.perfs.blitz.prov}</td> */}
                <td>{profile.perfs.classical.rating}</td>
                <td>{profile.perfs.classical.rd}</td>
              </tr>

              <tr>
                <th>rapid</th>
                <td>{profile.perfs.rapid.games}</td>
                <td>{profile.perfs.rapid.prog}</td>
                {/* <td>{profile.perfs.blitz.prov}</td> */}
                <td>{profile.perfs.rapid.rating}</td>
                <td>{profile.perfs.rapid.rd}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

{games.length > 0 && (
        <div>
          <h2>Game History</h2>
          <table className='table2'>
            <thead>
              <tr>
                <th>Moves</th>
                <th>Status</th>
                <th>Opponent</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game, index) => (
                <tr key={index}>
                  <td>{game.moves}</td>
                  <td>{game.status}</td>
                  <td>{game.players.black.userId === username ? game.players.white.userId : game.players.black.userId}</td>
                  <td>{new Date(game.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Section1;
