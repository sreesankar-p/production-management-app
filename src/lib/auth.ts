import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable');
}

export function generateToken(id: string): string {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
}

export function verifyToken(token: string): { id: string } {
  return jwt.verify(token, JWT_SECRET) as { id: string };
}

export function getTokenFromRequest(req: NextApiRequest): string | null {
  // Check cookies first
  if (req.cookies.token) {
    return req.cookies.token;
  }

  // Then check authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }

  return null;
}

export function setAuthCookie(res: NextApiResponse, token: string): void {
  res.setHeader('Set-Cookie', [
    `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${30 * 24 * 60 * 60}`,
  ]);
}

export function clearAuthCookie(res: NextApiResponse): void {
  res.setHeader('Set-Cookie', 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
}