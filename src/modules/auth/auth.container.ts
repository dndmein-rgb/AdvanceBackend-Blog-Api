import { PrismaAuthRepository } from "./auth.repository.js";
import { AuthService } from "./auth.service.js";

const authRepository=new PrismaAuthRepository();
const authService=new AuthService(authRepository);

export {authService}


// Container

// ↓

// creates Repository

// ↓

// creates Service

// ↓

// injects Repository into Service

// ↓

// exports Service

// ↓

// Controller imports Service