import { createDb } from "./client";

import { env } from "$env/dynamic/private";

export const db = createDb(env.DATABASE_URL!);
