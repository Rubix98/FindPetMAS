const TryMap = props => {
    <div style={{ margin: "8% 0 0 0", position: "relative" }}>
        <PostTextHeader>
          {props.date.typ_zgloszenia == 1
            ? "Zauważono zwierzę!"
            : "Zabrano zwierzę ze sobą!"}
        </PostTextHeader>
        <HeaderContainer>
          <PostInfoParagraph>
            <UserLink
              to={{
                pathname: "/userpanel",
                params: { id: props.date.idUżytkownik }
              }}
            >
              {props.date.login || props.date.adres_mail || props.date.idUżytkownik}
            </UserLink>
          </PostInfoParagraph>
          <PostInfoParagraph>
            {moment(props.date.data_zgloszenia).format("YYYY-MM-D HH:mm:ss")}
          </PostInfoParagraph>
        </HeaderContainer>
        <p>{props.date.tresc}</p>
        <PostInfoContainer>
          <PostRow>
            <PostInfoItem>
              <p style={{ "font-weight": "bold" }}>Typ zwierzęcia:</p>
              <p>{props.date.typ_zwierzecia || "nie określono"}</p>
            </PostInfoItem>
            <PostInfoItem>
              <p style={{ "font-weight": "bold" }}>Rasa:</p>
              <p>{props.date.rasa || "nie określono"}</p>
            </PostInfoItem>
            <PostInfoItem>
              <p style={{ "font-weight": "bold" }}>Wielkość:</p>
              {props.date.wielkosc || "nie określono"}
            </PostInfoItem>
            <PostInfoItem>
              <p style={{ "font-weight": "bold" }}>Data zaginięcia:</p>
              <p>
                {props.date.data_time
                  ? moment(props.date.data_time).format(
                      "YYYY-MM-D HH:mm:ss"
                    )
                  : "nie określono"}
              </p>
            </PostInfoItem>
          </PostRow>
          <PostRow>
            <PostInfoItem>
              <p style={{ "font-weight": "bold" }}>Kolor sierści:</p>
              <p>{props.date.kolor_siersci || "nie określono"}</p>
            </PostInfoItem>
            <PostInfoItem>
              <p style={{ "font-weight": "bold" }}>Znaki szczególne:</p>
              <p>{props.date.znaki_szczegolne || "nie określono"}</p>
            </PostInfoItem>
          </PostRow>
        </PostInfoContainer>
        <TextPostMinHeader>Zdjęcia:</TextPostMinHeader>
        <ImagesContainer>
          {props.date.zdjecie.map(image => {
            return (
              <PostImage
                src={`${userInfo.apiip}/` + image.zdjecie}
                style={{ width: 250 }}
              />
            );
          })}
          {/*}
          <img src={Image} style={{ width: 250 }} />
          <img src={Image} style={{ width: 250 }} />
          <img src={Image} style={{ width: 250 }} />
          {*/}
        </ImagesContainer>
        <TextPostMinHeader>Lokalizacja:</TextPostMinHeader>
        {console.log(props.date)}
        <Map
          style="mapbox://styles/mapbox/streets-v11"
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          containerStyle={{ width: 300, height: 200, margin: "auto" }}
          onStyleLoad={(map, e) => {
            handleLostMapLoaded(
              map,
              props.date.Dlugosc_Geograficzna,
              props.date.Szerokosc_Geograficzna,
              props.date.obszar,
              index
            );
          }}
        />
        {console.log(date.idUżytkownik + " " + userInfo.user.idUżytkownik)}
        {props.date.idUżytkownik == userInfo.user.idUżytkownik && (
          <div>
            <UserActionsContainer>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  handleClickOpen();
                }}
              >
                <Icon src={DeleteIcon} />
              </Button>

              <Link
                to={{
                  pathname: "/editpost",
                  params: { id: props.date.idPosty }
                }}
              >
                <Button variant="outlined" color="primary">
                  <Icon src={EditIcon} />
                </Button>
              </Link>
            </UserActionsContainer>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Usunięcie posta"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Czy chcesz usunąć post ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Nie
                </Button>
                <Button
                  onClick={() => {
                    deletePost(props.date.idPosty);
                  }}
                  color="primary"
                  autoFocus
                >
                  Tak
                </Button>
              </DialogActions>
            </Dialog>
          </div>
}
export default TryMap;