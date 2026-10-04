import { useEffect, useState } from "react";

export const OPEN = 600; // 10:00 AM
export const CUTOFF = 660; // 11:00 AM same-day hem cutoff
export const READY = 1020; // 5:00 PM
export const CLOSE = 1080; // 6:00 PM

/* Shop status in Pacific time + same-day hem message. */
export function getShopStatus() {
  let day, mins;
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23",
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    mins = parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10);
  } catch {
    return null;
  }
  const weekday = day >= 1 && day <= 5;
  const fmtLeft = (m) => (m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m} min`);
  const next = day === 5 || day === 6 || day === 0 ? "Monday" : "tomorrow";
  const base = { day, mins, weekday };

  if (day === 6) return { ...base, open: false, label: "Saturday · by appointment", hem: "Call ahead to book a Saturday visit." };
  if (day === 0) return { ...base, open: false, label: "Closed today · opens Monday 10 AM", hem: "Drop jeans off Monday by 11 AM, pick up at 5 PM." };
  if (mins < OPEN) return { ...base, open: false, label: "Opens today at 10 AM", hem: "Same day hems: in by 11 AM, ready by 5 PM today." };
  if (mins < CUTOFF) return { ...base, open: true, urgent: true, label: "Open now · until 6 PM", hem: `Drop off in the next ${fmtLeft(CUTOFF - mins)} and your jeans are ready by 5 PM today.` };
  if (mins < CLOSE) return { ...base, open: true, label: "Open now · until 6 PM", hem: `Today's 11 AM cutoff has passed. Drop off ${next} by 11 AM for same day hems.` };
  return { ...base, open: false, label: `Closed · opens ${next} at 10 AM`, hem: `Drop off ${next} by 11 AM, pick up at 5 PM.` };
}

export function useShopStatus() {
  const [status, setStatus] = useState(getShopStatus);
  useEffect(() => {
    const id = setInterval(() => setStatus(getShopStatus()), 30000);
    return () => clearInterval(id);
  }, []);
  return status;
}
