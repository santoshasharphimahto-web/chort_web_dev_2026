import jwt from 'jsonwebtoken';

 const jwtSecret="ehbdxbdcsdn";
  interface payload{
    id:string,
  }
  export async function generateToken(payload:payload) {
    const token=jwt.sign(payload,jwtSecret)
    return token;
 }

  export async function verifyToken(Token:string) {
    const token=jwt.verify(Token,jwtSecret) as payload
    return token;
 }

