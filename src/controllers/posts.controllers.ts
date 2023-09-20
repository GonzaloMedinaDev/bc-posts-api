import { Request, Response } from 'express';
import { Pool } from 'pg';
import config from '../connection';
import requestIp from 'request-ip';

const pool = new Pool(config);

import { DateFrom } from '../helpers/dateFrom';

export const getPosts = async (req: Request, res: Response) => {
  const { category, elems, type } = req.params;

  const typeQuery =
    type === 'trending' ? ` AND creation >= '${DateFrom(30)}'` : '';

  const query = `SELECT category, image, COUNT(*) AS quantity, title, url
    FROM posts 
    WHERE category='${category}'${typeQuery}
    GROUP BY title, image, url, category 
    ORDER BY quantity DESC
    LIMIT ${elems}`;

  pool.query(query, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

export const sendPosts = async (req: Request, res: Response) => {
  const ip = requestIp.getClientIp(req);
  const { category, image, title, url } = req.body;

  const query =
    'INSERT INTO posts (ip_number, title, url, image, category) VALUES ($1, $2, $3, $4, $5);';

  const values = [ip, title, url, image, category];

  console.log('validate', validateEntry(ip, url));

  validateEntry(ip, url) && pool.query(query, values);

  res.sendStatus(200);
};

const validateEntry = (ip: string | null, url: string): boolean | undefined => {
  if (ip !== null) {
    const query = `SELECT title
    FROM posts 
    WHERE url='${url}' AND ip_number='${ip}'
    ORDER BY creation DESC
    LIMIT 1`;

    pool.query(query, (error, results) => {
      if (results.rowCount) {
        console.log(results.rowCount);
        return true;
      }
    });

    return false;
  }
};
