import { useCallback, useEffect, useRef, useState } from "react";
import { buildGreeting, genId, getResponse, nowTime, pick, SIM_VOICE_POOL } from "./chat";

export default function useConversation({ user, memories, routine, reminders, games, supportNetwork, currentTime }) {
  const [messages, setMessages] = useState(() => buildGreeting(user, currentTime));
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [streamingId, setStreamingId] = useState(null);
  const [voiceState, setVoiceState] = useState("idle");
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [aiContext, setAiContext] = useState("greeting");

  const endRef = useRef(null);
  const recRef = useRef(null);
  const simTimerRef = useRef(null);
  const transcriptRef = useRef("");
  const doneRef = useRef(false);
  const dataRef = useRef({});
  const aiContextRef = useRef("greeting");
  const inputRef = useRef("");
  const thinkingRef = useRef(false);
  const voiceRef = useRef("idle");

  useEffect(() => {
    inputRef.current = input;
  }, [input]);

  useEffect(() => {
    thinkingRef.current = thinking;
  }, [thinking]);

  useEffect(() => {
    voiceRef.current = voiceState;
  }, [voiceState]);

  useEffect(() => {
    aiContextRef.current = aiContext;
  }, [aiContext]);

  useEffect(() => {
    dataRef.current = { user, memories, routine, reminders, games, supportNetwork, currentTime };
  }, [user, memories, routine, reminders, games, supportNetwork, currentTime]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking, voiceState, streamingId]);

  useEffect(
    () => () => {
      window.clearTimeout(simTimerRef.current);
      if (recRef.current) {
        try {
          recRef.current.stop();
        } catch {
          /* noop */
        }
      }
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    },
    []
  );

  const reply = useCallback((text) => {
    if (thinkingRef.current) return;
    setThinking(true);
    const delay = 850 + Math.random() * 650;
    window.setTimeout(() => {
      const data = { ...dataRef.current, aiContext: aiContextRef.current };
      const res = getResponse(text, data);
      const id = genId("a");
      setMessages((prev) => [
        ...prev,
        {
          id,
          role: "ai",
          text: res.text,
          time: nowTime(),
          actions: res.actions || [],
          chips: res.chips || [],
          context: res.context,
          stream: true,
        },
      ]);
      aiContextRef.current = res.context;
      setAiContext(res.context);
      setStreamingId(id);
      setThinking(false);
      setVoiceState("idle");
    }, delay);
  }, []);

  const submit = useCallback(
    (content) => {
      if (thinkingRef.current) return;
      const value = (content === undefined ? inputRef.current : content).trim();
      if (!value) return;
      setInput("");
      setMessages((prev) => [...prev, { id: genId("u"), role: "user", text: value, time: nowTime() }]);
      reply(value);
    },
    [reply]
  );

  const finishVoice = useCallback(
    (raw) => {
      if (doneRef.current) return;
      doneRef.current = true;
      window.clearTimeout(simTimerRef.current);
      const transcript = (raw || "").trim() || pick(SIM_VOICE_POOL);
      transcriptRef.current = transcript;
      setVoiceTranscript(transcript);
      setVoiceState("processing");
      setMessages((prev) => [...prev, { id: genId("u"), role: "user", text: transcript, time: nowTime() }]);
      reply(transcript);
    },
    [reply]
  );

  const scheduleSimulated = useCallback(() => {
    simTimerRef.current = window.setTimeout(() => {
      finishVoice(pick(SIM_VOICE_POOL));
    }, 2400 + Math.random() * 1400);
  }, [finishVoice]);

  const startVoice = useCallback(() => {
    if (thinkingRef.current) return;
    setInput("");
    setVoiceTranscript("");
    transcriptRef.current = "";
    doneRef.current = false;
    setVoiceState("listening");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (typeof SpeechRecognition === "undefined") {
      scheduleSimulated();
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.interimResults = true;
      recognition.continuous = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i += 1) {
          transcript += event.results[i][0].transcript;
        }
        transcriptRef.current = transcript;
        setVoiceTranscript(transcript);
      };

      recognition.onend = () => {
        recRef.current = null;
        if (!doneRef.current) finishVoice(transcriptRef.current);
      };

      recognition.onerror = () => {
        recRef.current = null;
        if (!doneRef.current) finishVoice(transcriptRef.current);
      };

      recRef.current = recognition;
      try {
        recognition.start();
      } catch {
        finishVoice("");
      }
    } catch {
      scheduleSimulated();
    }
  }, [finishVoice, scheduleSimulated]);

  const stopVoice = useCallback(() => {
    if (recRef.current) {
      try {
        recRef.current.stop();
      } catch {
        /* noop */
      }
    }
    window.clearTimeout(simTimerRef.current);
    if (!doneRef.current) finishVoice(transcriptRef.current);
  }, [finishVoice]);

  const toggleVoice = useCallback(() => {
    if (voiceRef.current === "listening") stopVoice();
    else startVoice();
  }, [stopVoice, startVoice]);

  const handleStreamDone = useCallback((id) => {
    setStreamingId((current) => (current === id ? null : current));
    setMessages((prev) => prev.map((message) => (message.id === id ? { ...message, stream: false } : message)));
  }, []);

  const resetChat = useCallback(() => {
    setMessages(buildGreeting(user, currentTime));
    setAiContext("greeting");
    aiContextRef.current = "greeting";
    setStreamingId(null);
    setThinking(false);
    doneRef.current = false;
    window.clearTimeout(simTimerRef.current);
    if (recRef.current) {
      try {
        recRef.current.stop();
      } catch {
        /* noop */
      }
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setVoiceState("idle");
  }, [user, currentTime]);

  const handleAction = useCallback(
    (action) => {
      if (action.sendText) submit(action.sendText);
      else submit(action.label);
    },
    [submit]
  );

  const handleChip = useCallback((chip) => submit(chip.label), [submit]);

  const buddyState = voiceState === "listening" ? "listening" : thinking ? "thinking" : "idle";
  const statusText =
    voiceState === "listening"
      ? "Listening — speak freely"
      : voiceState === "processing"
        ? "Working on it…"
        : thinking
          ? "Thinking…"
          : "Ready to help";

  return {
    messages,
    input,
    setInput,
    thinking,
    streamingId,
    voiceState,
    voiceTranscript,
    aiContext,
    buddyState,
    statusText,
    endRef,
    submit,
    toggleVoice,
    stopVoice,
    handleStreamDone,
    resetChat,
    handleAction,
    handleChip,
  };
}