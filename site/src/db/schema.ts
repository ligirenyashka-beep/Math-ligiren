import { pgTable, serial, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

// Anonymous-per-browser learner profile keyed by a client-generated id
export const learners = pgTable("learners", {
  id: serial("id").primaryKey(),
  clientId: text("client_id").notNull().unique(),
  name: text("name").default("Ученик").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Per-topic progress: how many problems solved & mastered
export const topicProgress = pgTable("topic_progress", {
  id: serial("id").primaryKey(),
  clientId: text("client_id").notNull(),
  topicId: text("topic_id").notNull(),
  solved: integer("solved").default(0).notNull(),
  correct: integer("correct").default(0).notNull(),
  mastered: boolean("mastered").default(false).notNull(),
  stars: integer("stars").default(0).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
