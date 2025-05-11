import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createOrderSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendOrderEmails } from "./emailService";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes - prefix all routes with /api

  // Get all flavours
  app.get("/api/flavours", async (req: Request, res: Response) => {
    try {
      const flavours = await storage.getAllFlavors();
      res.json(flavours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch flavours" });
    }
  });
  
  // Keep the old endpoint for backward compatibility
  app.get("/api/flavors", async (req: Request, res: Response) => {
    try {
      const flavors = await storage.getAllFlavors();
      res.json(flavors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch flavors" });
    }
  });

  // Get a specific flavour
  app.get("/api/flavours/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid flavour ID" });
      }
      
      const flavour = await storage.getFlavor(id);
      if (!flavour) {
        return res.status(404).json({ message: "Flavour not found" });
      }
      
      res.json(flavour);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch flavour" });
    }
  });
  
  // Keep the old endpoint for backward compatibility
  app.get("/api/flavors/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid flavor ID" });
      }
      
      const flavor = await storage.getFlavor(id);
      if (!flavor) {
        return res.status(404).json({ message: "Flavor not found" });
      }
      
      res.json(flavor);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch flavor" });
    }
  });

  // Create a new order
  app.post("/api/orders", async (req: Request, res: Response) => {
    try {
      // Validate the order data
      const validatedData = createOrderSchema.safeParse(req.body);
      
      if (!validatedData.success) {
        const errorMessage = fromZodError(validatedData.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      const orderData = validatedData.data;
      
      // Check minimum order quantity (12 macarons)
      const totalQuantity = orderData.items.reduce((sum, item) => sum + item.quantity, 0);
      if (totalQuantity < 12) {
        return res.status(400).json({ message: "Minimum order quantity is 12 macarons" });
      }
      
      // Make sure we replace any instances of "flavor" with "flavour" in item names
      const itemsWithCanadianSpelling = orderData.items.map(item => ({
        ...item,
        name: item.name.replace(/flavor/gi, "flavour")
      }));
      
      // Calculate order total
      const total = itemsWithCanadianSpelling.reduce(
        (sum, item) => sum + (item.price * item.quantity), 
        0
      );
      
      // Generate unique order number
      const orderNumber = `MAC-${Math.floor(10000 + Math.random() * 90000)}`;
      
      // Create the order
      const newOrder = await storage.createOrder({
        orderNumber,
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        email: orderData.email,
        phone: orderData.phone,
        pickupDate: orderData.pickupDate || "",
        pickupTime: orderData.pickupTime || "",
        specialInstructions: orderData.specialInstructions,
        items: itemsWithCanadianSpelling,
        total
      });
      
      // Send order confirmation emails
      // We don't await this to avoid delaying the response to the client
      // Type assertion needed because storage returns items as unknown type
      const orderWithItems = {
        ...newOrder,
        items: itemsWithCanadianSpelling
      };
      
      sendOrderEmails(orderWithItems as any).catch(err => {
        console.error("Error sending order emails:", err);
      });
      
      res.status(201).json(newOrder);
    } catch (error) {
      console.error("Order creation error:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Get a specific order by order number
  app.get("/api/orders/:orderNumber", async (req: Request, res: Response) => {
    try {
      const { orderNumber } = req.params;
      
      const order = await storage.getOrderByOrderNumber(orderNumber);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
