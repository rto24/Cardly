import { Response, Request } from "express";
import prisma from "../prisma/prisma";

export const createServer = async (req: Request, res: Response): Promise<void> => {
  const { name, ownerId, picture, tags } = req.body;

  try {
    const newServer = await prisma.server.create({
      data: { 
        name, 
        ownerId, 
        picture,
        tags,
        members: {
          connect: { id: ownerId }
        }
      },
      include: {
        members: true
      }
    });

    res.status(200).json({ message: "Server created successfully", server: newServer });
  } catch (error) {
    res.status(500).json({ message: "Error creating post:", error });
  }
};

export const getServers = async (req: Request, res: Response): Promise<void> => {
  try {
    const servers = await prisma.server.findMany({
      include: {
        owner: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        },
        members: {
          select: {
            id: true,
            username: true,
            avatar: true,
          }
        }
      }
    });
    res.status(200).json(servers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving available serveres:", error });
  }
};