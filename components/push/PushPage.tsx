'use client'

import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser } from '../../app/actions'

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')  
    .replace(/_/g, '/');

  try {
    // Base64 디코딩
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    // 디코딩된 데이터를 Uint8Array로 변환
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  } catch (e) {
    console.error("Decoding error:", e);
    throw e;
  }
}

function PushNotificationManager({textValue} : {textValue:string;}) {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setMessage(textValue);
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerServiceWorker()
    }

    async function registerServiceWorker() {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none',
        })
        const sub = await registration.pushManager.getSubscription()
        setSubscription(sub)
      } catch (error) {
        console.error('Service worker registration failed:', error)
      }
    }
    
  }, [])

  async function subscribeToPush() {
    try {
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      if (!vapidPublicKey) {
        console.error('VAPID public key is missing!')
        return
      }

      const registration = await navigator.serviceWorker.ready
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      })
      setSubscription(sub)
      const subscriptionJson = sub.toJSON();
      await subscribeUser(subscriptionJson as any)
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error)
    }
  }

  async function unsubscribeFromPush() {
    try {
      await subscription?.unsubscribe()
      setSubscription(null)
      await unsubscribeUser()
    } catch (error) {
      console.error('Failed to unsubscribe from push notifications:', error)
    }
  }

  async function sendNotification() {
    const registration = await navigator.serviceWorker.getRegistration();

    // registration이 undefined가 아닐 경우에만 showNotification 호출
    if (Notification.permission === 'granted' && registration) {
      showNotification(message, registration);
    } else {
      if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted' && registration) {
          showNotification(message, registration);
        }
      }
    }
}

  const showNotification = (body: string, registration: ServiceWorkerRegistration) => {
    const title = 'What PWA Can Do Today';
    const payload = {
      body,
      icon: '/icon/1.png',
    };

    if ('showNotification' in registration) {
      registration.showNotification(title, payload);
    } else {
      new Notification(title, payload);
    }
  };

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>
  }

  return (
    <div>
      {subscription ? (
        <>
          <button onClick={unsubscribeFromPush}>구독취소</button>
          <input
            type="text"
            placeholder="댓글 푸시 내용"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendNotification}>Send Test</button>
        </>
      ) : (
        <>
          <button onClick={subscribeToPush}>구독</button>
        </>
      )}
    </div>
  )
}

export default PushNotificationManager
