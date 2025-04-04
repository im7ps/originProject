export class User {
	username: string;
	plants: Array<{ name: string; position: string; grouped: boolean }>;
  
	constructor(username: string, plants: Array<{ name: string; position: string; grouped: boolean }> = []) {
	  this.username = username;
	  this.plants = plants;
	}
  }