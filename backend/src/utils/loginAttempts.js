const attempts = new Map();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

const isBlocked = (email) => {
  const data = attempts.get(email);
  if (!data) return false;

  if (Date.now() > data.resetAt) {
    attempts.delete(email);
    return false;
  }

  return data.count >= MAX_ATTEMPTS;
};

const recordAttempt = (email) => {
  const now = Date.now();

  const data = attempts.get(email) || {
    count: 0,
    resetAt: now + WINDOW_MS,
  };

  data.count += 1;
  attempts.set(email, data);
};

const resetAttempts = (email) => {
  attempts.delete(email);
};

module.exports = {
  isBlocked,
  recordAttempt,
  resetAttempts,
};
