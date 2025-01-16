import { Response, Request } from "express";
import prisma from "../prisma/prisma";

export const createServer = async (req: Request, res: Response): Promise<void> => {
  const { name, ownerId } = req.body;

  try {
    const newServer = await prisma.server.create({
      data: { name, ownerId },
    });

    res.status(200).json({ message: "Server created successfully", server: newServer });
  } catch (error) {
    res.status(500).json({ message: "Error creating post:", error });
  }
};

export const getServers = async (req: Request, res: Response): Promise<void> => {
  try {
    const servers = await prisma.server.findMany();
    res.status(200).json(servers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving available serveres:", error });
  }
};