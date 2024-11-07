export interface Credentials {
  username: string;
  password: string;
}

export interface UserData {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    // Otros campos si los hay
  };
}

export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    username: string;
    // Otros campos si los hay
  };
}
