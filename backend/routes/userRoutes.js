const router = require("express").Router();
const User = require("../models/User");

router.post("/sign-up", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ error: "O e-mail é necessário." });
  }

  if (!password) {
    return res.status(422).json({ error: "A senha é necessária." });
  }

  const userAlreadyExist = await User.findOne({ email });

  if (userAlreadyExist) {
    return res.status(400).json({ erro: "Usuário já cadastrado." });
  }

  const user = {
    email,
    password,
    isAdmin: false,
  };

  try {
    const createdUser = await User.create(user);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res
      .status(422)
      .json({ error: "O campo name deve estar preenchido." });
  }

  if (!password) {
    return res
      .status(422)
      .json({ error: "O campo salary deve estar preenchido." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ erro: "Credenciais inválidas." });
    }

    res.status(200).json({ message: "Usuário logado com sucesso" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado." });
    }

    await User.deleteOne({ _id: id });

    return res.status(200).json({ msg: "Usuário removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
