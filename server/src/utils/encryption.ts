import bcrypt from "bcryptjs";

// Function to encrypt a password
export const encrypt = async (plainPassword: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
  const hashedPassword = await bcrypt.hash(plainPassword, salt); // Hash the password with the salt
  return hashedPassword;
};

// Function to compare a password with a hashed one
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword); // Compare the passwords
  return isMatch; // Returns true if passwords match, false otherwise
};
