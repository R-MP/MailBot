"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from 'next/dynamic';
import { initializeChat, getAIResponse, sendVariable, verifyAllMet } from "../app/chatbot/chat.js";
import { getSettings } from "../app/chatbot/settings.js";
import { getStyle } from "../app/chatbot/style.js";
import { startMail } from "./email/mail.js";

const ChatBot = dynamic(() => import("react-chatbotify"), { ssr: false });

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
        //console.log(guidedMessage);
        
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
      startMail();
      
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
      <Chat />
    </>
  );
}
