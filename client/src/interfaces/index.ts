export interface User {
  id: string;
  nickname: string;
  password?: string;
}

export interface Operation {
  id: number;
  title: string;
  code: string;
  startDate: string;
  endDate: string;
  color: string;
  adminId: string;
  users?: User[];
}
