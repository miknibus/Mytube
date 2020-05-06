import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.root);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.root,
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  console.log(profile);
  const {
    _json: { id, avatar_url, login },
  } = profile;
  // TODO: temporary fake email
  const email = `${login}@gmail.com`;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      name: login,
      email,
      avatarUrl: avatar_url,
      githubId: id,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.root);
};

export const twitchLogin = passport.authenticate("twitch", {
  scope: "user_read",
});

export const twitchLoginCallback = async (_, __, profile, cb) => {
  const { id, profile_image_url, display_name, login } = profile.data[0];
  // TODO: temporary fake email
  const email = `${login}@gmail.com`;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.twitchId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      name: display_name,
      email,
      avatarUrl: profile_image_url,
      twitchId: id,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postTwitchLogin = (req, res) => {
  res.redirect(routes.root);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.root);
};

export const getMyProfile = async (req, res) => {
  const {
    user: { id },
  } = req;
  const user = await User.findById(id).populate("videos");
  res.render("userDetail", { pageTitle: "User Detail", user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.root);
  }
};

export const getEditProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "Edit Profile" });
};

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user._id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    // TODO Chrome cookie problem, temporary forced rewrite
    req.user.name = name;
    req.user.email = email;
    req.user.avatarUrl = file ? file.path : req.user.avatarUrl;
    // ----------------------------------------------------
    res.redirect(routes.myProfile);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.myProfile);
  } catch (error) {
    res.status(400);
    res.redirect(`/users/${routes.changePassword}`);
  }
};
