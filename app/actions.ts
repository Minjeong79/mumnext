"use server";

import webpush from "web-push";
import { PushSubscription } from "web-push";

webpush.setVapidDetails(
  "mailto:yoouug72@gmail.com",
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

let subscription: PushSubscription | null = null;

export async function subscribeUser(sub: PushSubscription) {
  subscription = sub;
  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;
  return { success: true };
}

export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error("No subscription available");
  }

  try {
    await webpush.sendNotification(
      subscription as unknown as PushSubscription,
      JSON.stringify({
        title: "Test Notification",
        body: message,
        icon: "/icon/1.png",
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
