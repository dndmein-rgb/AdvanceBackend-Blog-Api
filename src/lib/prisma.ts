// import { PrismaClient } from "@prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { Pool } from "pg";
// import { DATABASE_URL } from "../config/config.js";

// const pool = new Pool({
//   connectionString: DATABASE_URL,
// });

// const adapter = new PrismaPg(pool);

// export const prisma = new PrismaClient({ adapter });

import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL } from "../config/config.js";
import { PrismaClient } from "@prisma/client"

const connectionString = `${DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };