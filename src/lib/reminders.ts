import { useEffect } from 'react'

const STORAGE_PREFIX = 'lumina:reminder:'

export function notificationsSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!notificationsSupported()) {
    return 'denied'
  }
  if (
    Notification.permission === 'granted' ||
    Notification.permission === 'denied'
  ) {
    return Notification.permission
  }
  try {
    return await Notification.requestPermission()
  } catch {
    return 'denied'
  }
}

export async function showReminderNotification(): Promise<void> {
  const title = 'Lúmina'
  const options: NotificationOptions = {
    body: 'Hora do seu resumo diário. Que tal 15 minutos de leitura agora?',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    tag: 'lumina-daily-reminder',
  }
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.getRegistration()
    if (registration) {
      await registration.showNotification(title, options)
      return
    }
  }
  new Notification(title, options)
}

function reminderKey(date: Date): string {
  return `${STORAGE_PREFIX}${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

/**
 * Dispara o lembrete diário no horário configurado enquanto o app estiver
 * aberto (uma vez por dia). Lembretes em segundo plano exigiriam push.
 */
export function useDailyReminder(enabled: boolean, time: string): void {
  useEffect(() => {
    if (
      !enabled ||
      !notificationsSupported() ||
      Notification.permission !== 'granted'
    ) {
      return
    }

    const [hours, minutes] = time.split(':').map(Number)
    if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
      return
    }

    const tick = () => {
      const now = new Date()
      if (now.getHours() !== hours || now.getMinutes() !== minutes) {
        return
      }
      const key = reminderKey(now)
      try {
        if (localStorage.getItem(key)) {
          return
        }
        localStorage.setItem(key, '1')
      } catch {
        // sem storage, dispara mesmo assim
      }
      void showReminderNotification()
    }

    const id = window.setInterval(tick, 30_000)
    tick()
    return () => window.clearInterval(id)
  }, [enabled, time])
}
