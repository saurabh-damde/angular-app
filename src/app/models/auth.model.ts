export interface AuthReqData {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface AuthResData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
