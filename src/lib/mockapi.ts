export async function login(username: string, password: string) {
  // Replace with your real validation logic
  if (username === 'testuser' && password === 'password') {
    return { success: true };
  }
  return { success: false, message: 'Invalid credentials' };
}