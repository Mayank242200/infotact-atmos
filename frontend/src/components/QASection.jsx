import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function QASection() {
  const [questions, setQuestions] = useState([]);
  const [text, setText] = useState("");

  const teamId = localStorage.getItem("teamId"); // ✅ REAL teamId

  const submit = () => {
    if (!text.trim()) return;

    socket.emit("submit_question", {
      question: text,
      teamId, // ✅ correct ObjectId
    });

    setText("");
  };

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
      <h3>Live Q&A</h3>

      <div className="qa-box">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask a question"
        />
        <button onClick={submit}>Submit</button>
      </div>

      {questions.map((q) => (
        <div key={q._id} className="qa-item">
          {q.question}
          <button
            className="upvote-btn"
            onClick={() => socket.emit("upvote_question", q._id)}
          >
            👍 {q.upvotes}
          </button>
        </div>
      ))}
    </div>
  );
}
