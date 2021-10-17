export default class UserInfo {
  constructor(nameSelector, occupationSelector) {
      this._name = document.querySelector(nameSelector);
      this._occupation = document.querySelector(occupationSelector);
  }

  getUserInfo() {
    const inputData = {
      name: this._name.textContent,
      occupation: this._occupation.textContent
    }
    return inputData;
  }

  setUserInfo(data) {
    this._name.textContent = data.Name;
    this._occupation.textContent = data.Occupation;
  }
}
