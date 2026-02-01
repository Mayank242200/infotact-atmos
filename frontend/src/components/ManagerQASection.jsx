import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";
import { socket } from "../socket";

export default function ManagerQASection() {
  const [questions, setQuestions] = useState([]);

  // 🔹 INITIAL FETCH
useEffect(() => {
  apiFetch("/kudos").then((data) => {
    console.log("KUDOS FETCHED:", data);
    setKudos(data);
  });
}, []);


  // 🔹 REALTIME
  useEffect(() => {
    socket.on("question_added", (q) => {
      setQuestions((prev) => [...prev, q]);
    });

    socket.on("question_upvoted", (q) => {
      setQuestions((prev) =>
        prev.map((x) => (x._id === q._id ? q : x))
      );
    });

    return () => {
      socket.off("question_added");
      socket.off("question_upvoted");
    };
  }, []);

  return (
    <div>
      {questions.length === 0 && <p>No questions yet.</p>}
      {questions
        .sort((a, b) => b.upvotes - a.upvotes)
        .map((q) => (
          <div key={q._id} className="qa-item">
            <span>{q.question}</span>
            <strong>👍 {q.upvotes}</strong>
          </div>
        ))}
    </div>
  );
}
