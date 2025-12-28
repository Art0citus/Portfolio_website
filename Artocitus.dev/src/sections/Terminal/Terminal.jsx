import { useEffect, useRef, useState } from "react";
import { COMMANDS } from "./commands";

const ASCII_LOGO = `
 █████╗ ██████╗ ████████╗ ██████╗  ██████╗ ██╗████████╗██╗   ██╗███████╗
██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔════╝ ██║╚══██╔══╝██║   ██║██╔════╝
███████║██████╔╝   ██║   ██║   ██║██║      ██║   ██║   ██║   ██║███████╗
██╔══██║██╔══██╗   ██║   ██║   ██║██║      ██║   ██║   ██║   ██║╚════██║
██║  ██║██║  ██║   ██║   ╚██████╔╝╚██████╔╝██║   ██║   ╚██████╔╝███████║
╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝  ╚═════╝ ╚═╝   ╚═╝    ╚═════╝ ╚══════╝
`;

const PROMPT = "artocitus@portfolio:~$";

export const Terminal = () => {
  const [history, setHistory] = useState([
    "Welcome to Artocitus CLI",
    "Type `help` to get started",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  // autofocus
 const focusInput = () => {
  inputRef.current?.focus();
};


  const runCommand = (command) => {
    const cmd = command.trim().toLowerCase();

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    const output = COMMANDS[cmd]
      ? COMMANDS[cmd]()
      : `Command not found: ${cmd}\nType 'help'`;

    setHistory((prev) => [...prev, `${PROMPT} ${command}`, output]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    runCommand(input);
    setInput("");
  };

  return (
    <section
      id="terminal"
      className="py-32 px-6 flex justify-center items-center"
    >
      <div className="w-full max-w-4xl bg-black/80 border border-border rounded-2xl shadow-2xl font-mono text-green-400">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface/80 rounded-t-2xl">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="w-3 h-3 bg-yellow-500 rounded-full" />
          <span className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="ml-3 text-xs text-muted-foreground">
            Artocitus CLI
          </span>
        </div>

        {/* Body */}
        <div className="p-6 text-sm space-y-2">
          {/* ✅ ASCII LOGO (THIS WAS MISSING) */}
          <pre className="text-primary mb-6 whitespace-pre">
{ASCII_LOGO}
          </pre>

          {/* Command History */}
          {history.map((line, i) => (
            <pre key={i} className="whitespace-pre-wrap">
              {line}
            </pre>
          ))}

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <span className="text-primary">{PROMPT}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-green-400"
              autoComplete="off"
            />
          </form>
        </div>
      </div>
    </section>
  );
};
