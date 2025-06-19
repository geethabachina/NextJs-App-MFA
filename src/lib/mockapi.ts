export async function login(username: string, password: string) {
  if (username === 'testuser' && password === 'password') {
    return { success: true };
  }
  return { success: false, message: 'Invalid credentials' };
}