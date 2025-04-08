export interface UserCredentials {
	nickname: string;
	password: string;
}
  
export interface AuthService {
	userExists(nickname: string): Promise<boolean>;
	registerUser(nickname: string, password: string): Promise<void>;
	validateCredentials(nickname: string, password: string): Promise<boolean>;
	login(nickname: string): void;
}
  
export interface NavigationService {
	navigateByUrl(url: string): Promise<boolean>;
}