import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email: email,
        password: password,
      });
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("error :: authService :: createAccount ", error);
    }
  }

  async login(email, password) {
    try {
      const userAccount = await this.account.createEmailPasswordSession({
        email: email,
        password: password,
      });
      if (userAccount) {
        return userAccount;
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async getCurrUser() {
    try {
        const currUser = await this.account.get()
        if(currUser) {
            return currUser;
        }
    } catch (error) {
        console.log("error :: authService :: getCurrUser ", error);
    }
  }

  async logout() {
    try {
        return await this.account.deleteSessions()
    } catch (error) {
        console.log("error :: authService :: logout ", error);
    }
  }

}

const authService = new AuthService();
export default authService;
