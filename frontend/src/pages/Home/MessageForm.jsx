import { useState } from "react";
import { sendMessage } from "../../api/blogapi";
import SubmitButton from "../../components/ux/SubmitButton";

function MessageForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, surname, email, message }
    setLoading(true);

    try {
      const response = await sendMessage(data);

      setName("");
      setSurname("");
      setEmail("");
      setMessage("");

      setToast(true);
      setTimeout(() => setToast(false), 3000);

      setLoading(false);
    } catch (error) {
      console.error("Message not sent.");
      setError("Failed to send message.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="relative overflow-x-hidden px-1">
        {loading && <LoadingMessage />}
        <p
          className={`p-2.5 bg-gray-100 absolute top-2 right-2 rounded-md text-green-500 shadow ${
            toast ? "translate-x-[0px]" : "translate-x-[calc(100%+20px)]"
          } transition`}
        >
          Message sent successfully!
        </p>
        <div className="flex flex-row gap-2.5 mb-2.5">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="focus:border-2 focus:border-[var(--text-color)]"
          />
          <input
            type="text"
            name="surname"
            id="surname"
            placeholder="Surname..."
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="focus:border-2 focus:border-[var(--text-color)]"
          />
        </div>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="focus:border-2 focus:border-[var(--text-color)]"
        />
        <br />
        <textarea
          className="mt-2.5 focus:border-2 focus:border-[var(--text-color)]"
          name="message"
          id="message"
          rows={5}
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <br />
        {error && <p className="text-red-500 italic text-sm">{error && error}</p>}
        <SubmitButton className="bg-[var(--btn-color)] font-bold text-[var(--secondary-text-color)] px-6 py-2 rounded-md w-fit self-start hover:bg-[var(--btn-hover)] hover:scale-[102%]">
          Send
        </SubmitButton>
      </form>
    </>
  );
}

function LoadingMessage() {
  return (
    <div className="absolute size-full top-0 left-0 grid place-items-center backdrop-blur-md rounded-md">
      <h2 className="animate-pulse">Sending message, please wait...</h2>
    </div>
  )
}

export default MessageForm;
