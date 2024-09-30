"use client";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { initializeChat, getAIResponse, sendVariable, verifyAllMet } from "../app/chatbot/chat.js";
import { getSettings } from "../app/chatbot/settings.js";
import { getStyle } from "../app/chatbot/style.js";

const ChatBot = lazy(() => import("react-chatbotify"));

const Chat = () => {
  const id = "my-chatbot-id";
  let guide = "";

  const chatRef = useRef(null);
  const [chatInitialized, setChatInitialized] = useState(false);

  const [flow] = useState({
    start: {
			message: "Aopa!",
			path: "loop",
		},

    loop: {
			message: async (params) => {
        let guidedMessage = params.userInput + " " + guide;
        console.log(guidedMessage);
        
        const textResponse = await getAIResponse(chatRef.current, guidedMessage);
        const varList = sendVariable(textResponse);
        guide = verifyAllMet(varList);

        const botResponse = textResponse.split("&cbm4p//")[0];
        await params.injectMessage(botResponse, "bot");
			},
			path: () => {
				return "loop"
			}
		}

  });

  useEffect(() => {
    const initialize = async () => {
      const initializedChat = await initializeChat();
      if (initializedChat) {
          chatRef.current = initializedChat;
          setChatInitialized(true);
      } else {
          console.error("Falha ao inicializar o chat.");
      }
    };
  initialize();
  }, []);

  const themes = [];
  

  return (
    <ChatBot id={id} flow={flow} themes={themes} settings={getSettings()} styles={getStyle()}/>
  );
};

export default function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Chat />
      </Suspense>
    </>
  );
}
