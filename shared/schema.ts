import { pgTable, text, serial, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (kept from original)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Macaron flavor schema
export const flavors = pgTable("flavors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  price: integer("price").notNull(), // in cents
  available: boolean("available").notNull().default(true),
});

export const insertFlavorSchema = createInsertSchema(flavors).pick({
  name: true,
  description: true,
  imageUrl: true,
  price: true,
  available: true,
});

export type InsertFlavor = z.infer<typeof insertFlavorSchema>;
export type Flavor = typeof flavors.$inferSelect;

// Order schema
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  pickupDate: text("pickup_date").notNull(),
  pickupTime: text("pickup_time").notNull(),
  specialInstructions: text("special_instructions"),
  items: jsonb("items").notNull(),
  total: integer("total").notNull(), // in cents
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

export const colorSchema = z.object({
  name: z.string(),
  value: z.string(),
});

export const orderItemSchema = z.object({
  flavorId: z.number(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  shellColor: colorSchema.optional(),
  fillingColor: colorSchema.optional(),
});

export type OrderItem = z.infer<typeof orderItemSchema>;

export const createOrderSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  pickupDate: z.string().min(1, "Pickup date is required"),
  pickupTime: z.string().min(1, "Pickup time is required"),
  deliveryOption: z.enum(["pickup", "delivery"]).default("pickup"),
  deliveryAddress: z.string().optional(),
  deliveryCity: z.string().optional(),
  deliveryPostalCode: z.string().optional(),
  specialInstructions: z.string().optional(),
  items: z.array(orderItemSchema),
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
export type CreateOrder = z.infer<typeof createOrderSchema>;
