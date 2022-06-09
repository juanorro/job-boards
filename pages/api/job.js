import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  
  if(req.method !== 'POST') {
    return res.status(501).end();
  };

  const session = await getSession({ req });

  if(!session) return res.status(401).json({ message: 'Not logged as company'});

  const company = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if(!company) return res.status(401).json({ message: 'Company not found' });

  if(req.method === 'POST') {
    if(!req.body.title)
      return res
        .status(400)
        .json({ message: 'Required parameter title missing '});
    if(!req.body.description)
      return res
        .status(400)
        .json({ message: 'Required parameter description missing '});
    if(!req.body.salary)
      return res
        .status(400)
        .json({ message: 'Required parameter salary missing '});
    if(!req.body.location)
      return res


        .status(400)
        .json({ message: 'Required parameter location missing '});
  }

  await prisma.job.create({
    data: {
      title: req.body.title,
      description: req.body.description,
      salary: req.body.salary,
      location: req.body.location,
      author: {
        connect: { id: company.id }
      },
    },
  });
  
  res.status(200).end()
}