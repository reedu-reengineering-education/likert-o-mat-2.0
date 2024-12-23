// path: src/pages/api/question/survey/[surveyId]/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { surveyId } = req.query;
    console.log('Loading questions for surveyId:', surveyId);

    try {
      const questions = await prisma.question.findMany({
        where: { surveyId: surveyId as string },
        orderBy: {
          createdAt: 'asc',
        },
      });
      console.log('Found questions:', questions);
      res.status(200).json(questions);
    } catch (error) {
      console.error('Error when requesting the questions:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).end();
  }
}
