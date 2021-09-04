import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddCircle";
import EmailIcone from "@material-ui/icons/MailOutlineOutlined";
import TelephoneIcone from "@material-ui/icons/PhoneCallback";
import ShareIcon from "@material-ui/icons/ShareSharp";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import CommentIcon from "@material-ui/icons/Comment";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FormDialog({ user }) {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const [name, setName] = useState("");
  const [nomEntreprise, setNomEntreprise] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [author, setAuthor] = useState("");
  const [cart, setCart] = useState([]);
  const [id, setId] = useState("");
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const [allUser, setAllUser] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleSubmit = async (e) => {
    const author = user._id;
    e.preventDefault();
    const data = {
      nom: name,
      nomEntreprise,
      email,
      numeroTel: tel,
      author,
    };
    const url = "http://localhost:4000/carts";
    let createCart = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(data),
    });
    createCart = await createCart.json();
    handleClose();
    history.push("/");
    history.push("/bibliotheque");
  };

  useEffect(async () => {
    const userInfo = await JSON.parse(localStorage.getItem("user")).content;
    const id = await userInfo._id;
    setId(id);
    console.log(id);
    const url = `http://localhost:4000/carts/${id}`;
    let carts = await fetch(url);
    carts = await carts.json();
    if (carts.status) {
      carts = carts.content;
      console.log(carts);
      setCart(carts);
    } else {
      carts = [];
      setCart(carts);
    }

    console.log(carts);
  }, []);

  useEffect(async () => {
    const url = "http://localhost:4000/users";
    let all = await fetch(url);
    all = await all.json();
    if (all.status) {
      all = all.content;
      setAllUser(all);
    }
  }, []);

  return (
    <div className="mt-4 p-4 d-flex justify-content-evenly flex-wrap">
      {id &&
        cart &&
        cart.map((c) => (
          <div
            className="shadow"
            style={{
              height: "200px",
              width: "400px",
              borderRadius: 15,
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <div
              className="shadow"
              style={{
                height: "200px",
                width: "280px",
                backgroundColor: "#60708E",
                borderTopLeftRadius: 15,
                borderBottomRightRadius: 80,
                borderBottomLeftRadius: 15,
                color: "#F5F7F8",
                padding: "15px",
              }}
            >
              <h3 style={{ color: "#F5F7F8", textAlign: "center" }}>
                {" "}
                {c.nom}{" "}
              </h3>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton aria-label="delete" onClick={handleClickOpen}>
                  <EmailIcone />
                </IconButton>
                <div> {c.email} </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton aria-label="delete" onClick={handleClickOpen}>
                  <TelephoneIcone />
                </IconButton>
                <div> (+229) {c.numeroTel} </div>
              </div>
            </div>
            <div
              style={{
                height: "200px",
                width: "auto",
                display: "flex",
                marginLeft: "50px",
              }}
            >
              <h3
                style={{
                  color: "#60708E",
                  display: "flex",
                  flexDirection: "column",
                  fontSize: "0.7em",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  height: "200px",
                  fontWeight: 600,
                }}
              >
                {c.nomEntreprise.split("").map((d) => (
                  <span> {d} </span>
                ))}
              </h3>
            </div>
            <div style={{ marginTop: "150px" }}>
              <IconButton
                aria-label="delete"
                onClick={handleClickOpen2}
                id={c._id}
              >
                <ShareIcon />
              </IconButton>
            </div>

            <Dialog
              open={open2}
              onClose={handleClose2}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Nouvelle carte de visite
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Pour ajouter une nouvelle carte de visite, veuillez remplir
                  les champs suivant .
                </DialogContentText>
                <List className={classes.root}>
                  {allUser.map((value) => {
                    const labelId = `checkbox-list-label-${value._id}`;
                    return (
                      <ListItem
                        key={value._id}
                        role={undefined}
                        dense
                        button
                        onClick={()=>{}}
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(true) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          id={labelId}
                          primary={`${value.fullname}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton 
                          edge="end" 
                          aria-label="comments"
                          author = {c.author}
                          id = {value._id}
                          onClick = {async(v)=>{
                            const shareTo = value._id
                            const shareCarte = c._id
                            const data = {
                              cartID: shareCarte,
                              authorID:shareTo
                            }
                            const url = 'http://localhost:4000/carts'
                            let share = await fetch(url, {
                              method: "PUT",
                              headers: { "Content-Type": "application/json;charset=utf-8" },
                              body: JSON.stringify(data),
                            });
                            share = await share.json();
                            console.log(share)
                            handleClose2()
                            
                          }}
                          >
                            <ShareIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose2} color="primary">
                  Annuler
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ))}

      <div
        className="shadow"
        style={{
          height: "200px",
          width: "400px",
          backgroundColor: "#DADADA",
          borderRadius: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton aria-label="delete" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Nouvelle carte de visite
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour ajouter une nouvelle carte de visite, veuillez remplir les
            champs suivant .
          </DialogContentText>
          <form method="post">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nom"
              type="userName"
              fullWidth
              value={name}
              onChange={(v) => setName(v.target.value)}
            />
            <TextField
              margin="dense"
              id="name"
              label="Nom de l'entreprise"
              type="entrepriseName"
              fullWidth
              value={nomEntreprise}
              onChange={(v) => setNomEntreprise(v.target.value)}
            />
            <TextField
              margin="dense"
              id="email"
              label="Adresse Email"
              type="email"
              fullWidth
              value={email}
              onChange={(v) => setEmail(v.target.value)}
            />
            <TextField
              margin="dense"
              id="telephone"
              label="Telephone"
              type="text"
              fullWidth
              value={tel}
              onChange={(v) => setTel(v.target.value)}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
