export class SignInData {
  constructor(
    private usu_login: string,
    private usu_pass: string
  ) {}

  getLogin(): string {
    return this.usu_login;
  }

  getPassword(): string {
    return this.usu_pass;
  }
}
