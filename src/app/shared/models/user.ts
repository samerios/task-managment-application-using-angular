export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: 'Admin' | 'TeamMember';
  userPreferences: string;
}

export interface UserPreferences {
  language: 'en' | 'he';
  theme: 'light' | 'dark';
}
