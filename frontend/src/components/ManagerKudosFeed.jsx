import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";
import { socket } from "../socket";

export default function ManagerKudosFeed() {
  const [kudos, setKudos] = useState([]);

  // 🔹 INITIAL FETCH
useEffect(() => {
  apiFetch("/kudos").then((data) => {
    console.log("KUDOS FETCHED:", data);
    setKudos(data);
  });
}, []);


  // 🔹 REALTIME
  useEffect(() => {
    socket.on("new_kudos", (data) => {
      setKudos((prev) => [data, ...prev]);
    });

    return () => socket.off("new_kudos");
  }, []);

  return (
    <div>
      {kudos.length === 0 && <p>No kudos yet.</p>}
      {kudos.map((k) => (
        <div key={k._id} className="kudos-item">
          {k.message}
        </div>
      ))}
    </div>
  );
}
