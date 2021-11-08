export default class UserInfo {
  constructor(nameSelector, occupationSelector, avatarSelector) {
      this._name = document.querySelector(nameSelector);
      this._occupation = document.querySelector(occupationSelector);
      this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const inputData = {
      name: this._name.textContent,
      occupation: this._occupation.textContent
    }
    return inputData;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._occupation.textContent = data.about;
  }
  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
