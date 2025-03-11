// We are using the CDN delivery platform for NATS SDKs here, to avoid requiring NPM
// For anything serious or if you want it simple, use the NPM library for NATS
// Browser Runtime? -> NATS Websocket
// Node Runtime?    -> NATS Core

import { wsconnect } from "https://esm.run/@nats-io/nats-core";

// Publicly Accessible Address of the Message Bus
const PUBLIC_CHAT_SERVER = "ws://localhost:4223";
const ROOM_ID = "examples.chat";

// Connect to the Message Bus WebSocket Endpoint
const connection = await wsconnect({ servers: PUBLIC_CHAT_SERVER });

/**
 * @param {(message: ChatMessage) => void} callback 
 * @returns {{unsubscribe: () => void}}
 */
export function connect(callback) {
  // Subscribe to the ChatRoom subject
  const subscription = connection.subscribe(ROOM_ID, {
    callback: (err, msg) => {
      if (err !== null) return // Ignore errors for now

      callback(msg.json((key, value) => {
        // Ensure complex types are deserialized properly
        switch (key) {
          case "timeStamp":
            return new Date(value)
          case "avatar":
            return new URL(value)
          default:
            return value
        };
      }))
    }
  })

  return subscription;
}

/**
 * @param {ChatMessage} message 
 */
export function publish(message) {
  connection.publish(ROOM_ID, JSON.stringify(message))
};

