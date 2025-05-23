
import { currentUser } from '@/data/mockData';

export interface LoginCredentials {
  email: string;
  password: string;
}

// Mock users for login
export const mockUsers = [
  {
    email: 'admin@example.com',
    password: 'password123',
    userData: { ...currentUser, role: 'Admin' }
  },
  {
    email: 'editor@example.com',
    password: 'password123',
    userData: { ...currentUser, id: 'u-002', name: 'Maya Patel', role: 'Editor', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250', bio: 'UX designer and color theory expert' }
  }
];

// Login service to simulate authentication
export const login = (credentials: LoginCredentials): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(
        user => user.email === credentials.email && user.password === credentials.password
      );
      
      if (user) {
        // Store user data in localStorage to persist login state
        localStorage.setItem('currentUser', JSON.stringify(user.userData));
        resolve(user.userData);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 800); // Simulated network delay
  });
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return localStorage.getItem('currentUser') !== null;
};

// Get current logged in user
export const getCurrentUser = (): any => {
  const userData = localStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) : null;
};

// Logout
export const logout = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem('currentUser');
      resolve();
    }, 500);
  });
};
