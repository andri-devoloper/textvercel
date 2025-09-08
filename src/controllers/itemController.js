// src\controllers\itemController.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET semua items
export const getItems = async (req, res) => {
  const items = await prisma.item.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(items);
};

// GET item by id
export const getItemById = async (req, res) => {
  try {
    const item = await prisma.item.findUnique({
      where: { id: req.params.id },
    });
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
};

// POST tambah item
export const createItem = async (req, res) => {
  const { name, description, category } = req.body;

  if (!name || !description || !category) {
    return res
      .status(400)
      .json({ error: "name, description, and category are required" });
  }

  const newItem = await prisma.item.create({
    data: { name, description, category },
  });

  res.status(201).json(newItem);
};

// PUT update item
export const updateItem = async (req, res) => {
  const { name, description, category } = req.body;
  try {
    const updated = await prisma.item.update({
      where: { id: req.params.id },
      data: { name, description, category },
    });
    res.json(updated);
  } catch (err) {
    res.status(404).json({ error: "Item not found or invalid ID" });
  }
};

// DELETE hapus item
export const deleteItem = async (req, res) => {
  try {
    await prisma.item.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(404).json({ error: "Item not found or invalid ID" });
  }
};
