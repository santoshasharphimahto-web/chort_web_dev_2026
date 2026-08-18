import express from 'express';
import { privateKey, publicKey } from './utils/cert.js';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import {db} from './db/index.js';
import {usersTable} from './db/user_model.js';
import { eq} from 'drizzle-orm';
import jwt from 'jsonwebtoken';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.get('/health', (req, res)=>{
 res.json({ message: "server is healthy", healthy: true });
})

// oidc endpoints
app.get('/.well-known/openid-configuration',(req, res)=>{
    const ISSUER = "http://localhost:3000";
    res.json({
        issuer: ISSUER,
        authorization_endpoint: `${ISSUER}/o/authenticate`,
        userinfo_endpoint: `${ISSUER}/o/userinfo`,
        jwks_uri: `${ISSUER}/o/jwks`,
    })

})

app.get('/o/jwks',(req, res)=>{
    const keyObject = crypto.createPublicKey(publicKey);
    const jwk = keyObject.export({ format: 'jwk' });
    jwk.use = 'sig';
    jwk.alg = 'RS256';
    jwk.kid = 'default';
    
    res.json({
        keys: [jwk],
    })
})

// Login endpoint (also handles POST to /o/jwks)
app.post('/o/jwks', async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({error: "Email and password are required"});
    }
    
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if(!user){
        return res.status(401).json({error: "Invalid email or password"});
    }
    
    const hashedPassword = crypto.createHash('sha256').update(password + user.salt).digest('hex');
    if(hashedPassword !== user.password){
        return res.status(401).json({error: "Invalid email or password"});
    }
    
    const ISSUER = "http://localhost:3000";
    const now = Math.floor(Date.now() / 1000);
    const claims = {
        iss: ISSUER,
        sub: user.id,
        email: user.email,
        email_verified: String(user.emailVerified),
        exp: now + 3600,
        family_name: user.lastName ?? undefined,
        given_name: user.firstName ?? "",
        name: [user.firstName, user.lastName].filter(Boolean).join(' '),
        picture: user.profilePicture ?? undefined,
    }
    
    const token = jwt.sign(claims, privateKey, { algorithm: 'RS256' });
    res.json({ token });
})

app.get('/o/authenticate',(req, res)=>{
    res.sendFile(path.join(__dirname, '../public/login.html'));
})

app.get('/singup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/singup.html'));
});

app.get('/o/authenticate/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/singup.html'));
});



app.post('/o/authenticate/signin',async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({error: "Email and password are required"});

    }
   const [user]= await db.select().from('usersTable').where(eq(usersTable.email, email));
   if(!user){
    res.status(401).json({error: "Invalid email or password"});
   }
   const hashedPassword = crypto.createHash('sha256').update(password + user.salt).digest('hex');

  if(hashedPassword !== user.password){
    res.status(401).json({error: "Invalid email or password"});
  }

  const ISSUER = "http://localhost:3000";
  const now= Math.floor(Date.now() / 1000);
  const claims={
    iss: ISSUER,
    sub: user.id,
    email: user.email,
    email_verified: String(user.emailVerified),
    exp: now + 3600, // 1 hour
    family_name: user.lastName?? undefined,
    given_name: user.firstName?? "",
    name: [user.given_name, user.family_name].filter(Boolean).join(' '),
    picture: user.profilePicture ?? undefined,
  }

  const token = await jwt.sign(claims, privateKey, { algorithm: 'RS256' });
  res.json({ token });
})

app.post("/o/authenticate/sign-up", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!email || !password || !firstName) {
    res
      .status(400)
      .json({ message: "First name, email, and password are required." });
    return;
  }

  const [existing] = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (existing) {
    res
      .status(409)
      .json({ message: "An account with this email already exists." });
    return;
  }

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("hex");

  await db.insert(usersTable).values({
    firstName,
    lastName: lastName ?? null,
    email,
    password: hash,
    salt,
  });

  res.status(201).json({ ok: true });
});






app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})