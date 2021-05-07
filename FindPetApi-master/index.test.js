const userObject = {
  idUżytkownik: 1,
  adres_mail: "mattxml@gmail.com",
  login: "mateusz",
  haslo: "123456",
  nr_telefonu: "555555555",
  typ: "M",
  punkty: 0,
};

const setUser = (val) => {
  if (
    val.idUżytkownik &&
    val.adres_mail &&
    val.login &&
    val.haslo &&
    val.nr_telefonu &&
    val.typ &&
    Number.isInteger(val.punkty)
  ) {
    if (
      val.idUżytkownik >= 0 &&
      val.adres_mail.length > 5 &&
      val.login.length > 5 &&
      val.haslo.length > 5 &&
      val.nr_telefonu.length >= 9 &&
      val.punkty >= 0
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

test("user object test", () => {
  expect(setUser(userObject)).toBe(true);
});
