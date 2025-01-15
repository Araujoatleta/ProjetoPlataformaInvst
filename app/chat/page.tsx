"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
    lastMessage: "Hey, how's the course going?",
    time: "2m ago",
    online: true
  },
  {
    id: 2,
    name: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    lastMessage: "Thanks for the help yesterday!",
    time: "1h ago",
    online: false
  }
];

const messages = [
  {
    id: 1,
    sender: "John Doe",
    content: "Hey, how's the course going?",
    time: "2:30 PM",
    isSender: false
  },
  {
    id: 2,
    sender: "You",
    content: "It's going great! Just finished the marketing module.",
    time: "2:31 PM",
    isSender: true
  },
  {
    id: 3,
    sender: "John Doe",
    content: "That's awesome! Want to collaborate on the next project?",
    time: "2:32 PM",
    isSender: false
  }
];

export default function Chat() {
  const [message, setMessage] = useState("");
  const [activeChat, setActiveChat] = useState(conversations[0]);

  return (
    <div className="flex h-[calc(100vh-2rem)] gap-4 -mt-4">
      <Card className="w-80 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Messages</h2>
        </div>
        <ScrollArea className="flex-1">
          {conversations.map((chat) => (
            <div
              key={chat.id}
              className={`p-4 flex gap-3 cursor-pointer hover:bg-secondary/50 ${
                activeChat.id === chat.id ? "bg-secondary" : ""
              }`}
              onClick={() => setActiveChat(chat)}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{chat.name}</h3>
                  <span className="text-xs text-muted-foreground">{chat.time}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </Card>

      <Card className="flex-1 flex flex-col">
        <div className="p-4 border-b flex items-center gap-3">
          <Avatar>
            <AvatarImage src={activeChat.avatar} />
            <AvatarFallback>{activeChat.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{activeChat.name}</h2>
            <p className="text-sm text-muted-foreground">
              {activeChat.online ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.isSender
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary"
                  }`}
                >
                  <p>{msg.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-secondary"
            />
            <Button size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}