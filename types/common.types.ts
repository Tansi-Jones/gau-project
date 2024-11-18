export interface Announcement {
  id?: string;
  title: string;
  body: string;
  image: string;
  startDate: string;
  endDate: string;
  announcer: string;
  isUrgent: boolean;
  link: string;
}

export interface User {
  id?: string;
  name: string;
  email?: string;
}
