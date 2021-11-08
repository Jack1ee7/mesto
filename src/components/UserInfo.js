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
    if (data.name) {
      this._name.textContent = data.name;
    }
    if (data._id) {
      this._name.id = data._id;
    }
    if (data.about) {
      this._occupation.textContent = data.about;
    }
  }
  setUserAvatar(data) {
    if (data.avatar) {
      this._avatar.src = data.avatar;
    }
  }

  // getUserId(data) {
  //   return this._id = data._id;
  // }

}
