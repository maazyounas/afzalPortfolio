import { headers } from "next/headers";

const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_LIMIT = 5;
const CHANGE_LIMIT = 3;

type AttemptBucket = {
  count: number;
  resetAt: number;
};

const attempts = new Map<string, AttemptBucket>();

function getAllowedOrigins() {
  return [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_SITE_URL_PROD,
  ].filter((value): value is string => Boolean(value));
}

async function getClientFingerprint() {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = requestHeaders.get("x-real-ip")?.trim();
  return forwardedFor || realIp || "unknown";
}

export async function assertTrustedOrigin() {
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin");
  if (!origin) return;

  const allowedOrigins = getAllowedOrigins();
  if (allowedOrigins.length === 0) return;

  if (!allowedOrigins.includes(origin)) {
    throw new Error("Invalid request origin.");
  }
}

function consumeAttempt(key: string, limit: number) {
  const now = Date.now();
  const bucket = attempts.get(key);

  if (!bucket || bucket.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + ATTEMPT_WINDOW_MS });
    return;
  }

  if (bucket.count >= limit) {
    throw new Error("Too many attempts. Please wait and try again.");
  }

  bucket.count += 1;
  attempts.set(key, bucket);
}

export async function throttleLoginAttempt(identifier: string) {
  const fingerprint = await getClientFingerprint();
  consumeAttempt(
    `login:${fingerprint}:${identifier.trim().toLowerCase()}`,
    LOGIN_LIMIT
  );
}

export async function throttleCredentialChange() {
  const fingerprint = await getClientFingerprint();
  consumeAttempt(`change:${fingerprint}`, CHANGE_LIMIT);
}
