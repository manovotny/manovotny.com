import { createDb } from "./client";

import { DATABASE_URL } from "$app/env/private";

export const db = createDb(DATABASE_URL!);
