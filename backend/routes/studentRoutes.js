const router = require("express").Router();
const Student = require("../models/Student");

router.post("/create", async (req, res) => {
  const { name, age, gender, subjects } = req.body;

  if (!name || !age || !gender || !subjects) {
    return res
      .status(422)
      .json({ error: "Todos os campos precisam estar preenchidos." });
  }

  const student = {
    name,
    age,
    gender,
    subjects,
  };

  try {
    await Student.create(student);
    res.status(201).json("Aluno criado com sucesso!");
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();

    return res.status(200).json(students);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ erro: "Estudante não encontrado." });
    }
    await Student.deleteOne({ _id: id });

    return res.status(200).json({ msg: "Estudante removido com sucesso!" });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, gender, subjects } = req.body;

  if (!name || !age || !gender || !subjects || !id) {
    return res
      .status(422)
      .json({ error: "Todos os campos precisam estar preenchidos." });
  }

  const student = {
    name,
    age,
    gender,
    subjects,
  };

  try {
    const updatedStudent = await Student.updateOne({ _id: id }, student);

    if (updatedStudent.matchedCount === 0) {
      return res.status(404).jons({ erro: "Estudante não encontrado." });
    }

    return res.status(200).json({ msg: "Estudante atualizado com sucesso!" });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

module.exports = router;
