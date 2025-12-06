import session from 'express-session'
import sessionFileStore from 'session-file-store'

const FileStore = sessionFileStore(session)

export default function createSession (){
  const SESSION_LIFETIME = 86400
  const secretKey = (process.env.SESSION_KEY as string)
  if (!secretKey){
    throw new Error("Can't read secretKey!")
  }
  return session({
    secret:secretKey,
    saveUninitialized: false,
    store: new FileStore ({
      path: './sessions',
      ttl: SESSION_LIFETIME,
      retries: 5,    
    }),
    cookie: {
      httpOnly: true,
      maxAge: SESSION_LIFETIME*1000
    },  
    resave: false,
  })
} 