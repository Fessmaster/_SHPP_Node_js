import session from 'express-session'
import MongoSession from "connect-mongodb-session"

const Store = MongoSession(session)

export default function createSession (){
  const SESSION_LIFETIME = 86400
  const secretKey = (process.env.SESSION_KEY as string)
  if (!secretKey){
    throw new Error("Can't read secretKey!")
  }
  return session({
    secret:secretKey,
    saveUninitialized: false,
    store: new Store ({
      uri:process.env.MONGO_URI as string,
      collection: "TODOSession",
      expires: SESSION_LIFETIME*1000,      
    }),
    cookie: {
      httpOnly: true,
      maxAge: SESSION_LIFETIME*1000
    },  
    resave: false,
  })
} 