import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";
import { socket } from "../socket";

export default function KudosFeed() {
  const [kudos, setKudos] = useState([]);
  const [message, setMessage] = useState("");

  const submit = async () => {
    await apiFetch("/kudos", "POST", { message });
    setMessage("");
  };

  useEffect(() => {
    socket.on("new_kudos", (data) => {
      setKudos(prev => [data, ...prev]);
    });

    return () => socket.off("new_kudos");
  }, []);

  return (
    <div>
      <h3>Kudos</h3>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={submit}>Send</button>

      {kudos.map(k => <p key={k._id}>{k.message}</p>)}
    </div>
  );
}
