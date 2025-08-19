//frontend sample
const requestPasswordReset = async (email) => {
  const response = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return response.json();
};

// 2. Verify reset token
const verifyResetToken = async (token) => {
  const response = await fetch(`/api/auth/verify-reset-token/${token}`);
  return response.json();
};

// 3. Reset password
const resetPassword = async (token, newPassword, confirmPassword) => {
  const response = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword, confirmPassword }),
  });
  return response.json();
};
