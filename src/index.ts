import { Hono } from "hono";
import { createEvent } from "ics";

const app = new Hono();

app.get("/", async (c) => {
  const icsText = await new Promise<string>((resolve, reject) =>
    createEvent(
      {
        title: "Dinner",
        description: "Nightly thing I do",
        busyStatus: "FREE",
        start: [2018, 1, 15, 6, 30],
        duration: { minutes: 50 },
      },
      (error, value) => {
        if (error) {
          reject(error);
        }

        resolve(value);
      },
    ),
  );

  return c.text(icsText);
});

// noinspection JSUnusedGlobalSymbols
export default app;
