import { prisma } from "../../lib/prisma.js";


export const authRepository={
findUserByUsername:async(username: string)=>{
    const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return user;
},
findUserByEmail:async(email:string)=>{
    const user = await prisma.user.findUnique({
    where: { email },
  });
  return email;
}
}


