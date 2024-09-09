export {};

declare global {
  interface TaskDataForm {
    id?: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    due_date: string | null | Date;
  }

  interface Task {
    id: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    due_date: string | null | Date;
  }

  interface SignupDataForm {
    name: string;
    email: string;
    password: string;
  }

  interface SigninDataForm {
    email: string;
    password: string;
  }

  type UserId = string | null;

  interface MyProfile {
    name: string;
    email: string;
  }

  interface ErrorResponse {
    code: number;
    message: string;
  }
}
