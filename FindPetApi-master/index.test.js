const userObject = {
  idUżytkownik: 1,
  adres_mail: "mattxml@gmail.com",
  login: "mateusz",
  haslo: "123456",
  nr_telefonu: "555555555",
  typ: "M",
  punkty: 0,
};

const postObject = {
  idPosty: 2,
  treść: "Znaleziono zwierze",
  id_komentarz: null,
  Zwierzęta_idZwierzecia: 3,
  Użytkownicy_idUżytkownik: 1,
  data_zgloszenia: "2021-03-21T19:00:00.000Z",
  data_time: "2021-03-21T10:00:00.000Z",
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

const setPost = (val) => {
  if (
    val.idPosty &&
    val.treść &&
    val.hasOwnProperty("id_komentarz") &&
    val.Zwierzęta_idZwierzecia &&
    val.Użytkownicy_idUżytkownik &&
    val.data_zgloszenia &&
    val.data_time
  ) {
    x = new Date(val.data_zgloszenia);
    y = new Date(val.data_time);
    if (
      val.idPosty >= 0 &&
      val.treść.length > 6 &&
      val.Zwierzęta_idZwierzecia >= 0 &&
      val.Użytkownicy_idUżytkownik >= 0 &&
      x.getMonth() &&
      y.getMonth()
    ) {
      return true;
    }
  } else {
    return false;
  }
};

test("user object test", () => {
  expect(setUser(userObject)).toBe(true);
});

test("post object test", () => {
  expect(setPost(postObject)).toBe(true);
});
