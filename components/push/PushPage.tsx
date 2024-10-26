"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

const PushNotificationManager = forwardRef(
  ({ click }: { click: boolean }, ref) => {
    const [isSupported, setIsSupported] = useState(false);
    const [subscription, setSubscription] = useState<PushSubscription | null>(
      null
    );
    const [message, setMessage] = useState("");

    useEffect(() => {
      // setMessage(textValue);
      if ("serviceWorker" in navigator && "PushManager" in window) {
        setIsSupported(true);
        registerServiceWorker();
      }

      async function registerServiceWorker() {
        try {
          const registration = await navigator.serviceWorker.register(
            "/sw.js",
            {
              scope: "/",
              updateViaCache: "none",
            }
          );
          const sub = await registration.pushManager.getSubscription();
          setSubscription(sub);
        } catch (error) {
          console.error("Service worker registration failed:", error);
        }
      }
    }, []);

    async function sendNotification(message: string) {
      const registration = await navigator.serviceWorker.getRegistration();

      // registration이 undefined가 아닐 경우에만 showNotification 호출
      if (Notification.permission === "granted" && registration) {
        showNotification(message, registration);
      } else {
        if (Notification.permission !== "denied") {
          const permission = await Notification.requestPermission();
          if (permission === "granted" && registration) {
            showNotification(message, registration);
          }
        }
      }
    }

    const showNotification = (
      body: string,
      registration: ServiceWorkerRegistration
    ) => {
      const title = "What PWA Can Do Today";
      const payload = {
        body,
        icon: "/icon/1.png",
      };

      if ("showNotification" in registration) {
        registration.showNotification(title, payload);
      } else {
        new Notification(title, payload);
      }
    };

    if (!isSupported) {
      return <p>Push notifications are not supported in this browser.</p>;
    }

    return (
      <div className="" style={{ position: "absolute", top: "20px" }}>
        <div className="flex  ">
          <textarea
            name="content"
            style={{ background: "red" }}
            value={message}
            className="resize-none w-full p-2 outline-none rounded-md"
            placeholder="2번"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="w-20 p-5 bg-emerald-500 text-white rounded-lg text-base absoltue right-0 z-10"
            onClick={() => sendNotification(message)}
          >
            등록
          </button>
        </div>
      </div>
    );
  }
);

export default PushNotificationManager;
