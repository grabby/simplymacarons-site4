import { 
  users, type User, type InsertUser,
  flavors, type Flavor, type InsertFlavor,
  orders, type Order, type InsertOrder,
  type OrderItem
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // Users (kept from original)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Flavors
  getAllFlavors(): Promise<Flavor[]>;
  getFlavor(id: number): Promise<Flavor | undefined>;
  createFlavor(flavor: InsertFlavor): Promise<Flavor>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  getOrderByOrderNumber(orderNumber: string): Promise<Order | undefined>;
  getAllOrders(): Promise<Order[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private flavorsMap: Map<number, Flavor>;
  private ordersMap: Map<number, Order>;
  userCurrentId: number;
  flavorCurrentId: number;
  orderCurrentId: number;

  constructor() {
    this.users = new Map();
    this.flavorsMap = new Map();
    this.ordersMap = new Map();
    this.userCurrentId = 1;
    this.flavorCurrentId = 1;
    this.orderCurrentId = 1;
    
    // Initialize with some sample flavors
    this.initializeFlavors();
  }

  // Initialize with default macaron flavors
  private initializeFlavors() {
    const defaultFlavors: InsertFlavor[] = [
      {
        name: "Vanilla Bean",
        description: "Classic vanilla bean macaron with a smooth vanilla bean buttercream filling.",
        imageUrl: "https://images.unsplash.com/photo-1558326567-98ae2405596b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        price: 200, // $2.00
        available: true
      },
      {
        name: "Raspberry",
        description: "Vibrant raspberry macaron with a tart raspberry jam center and white chocolate ganache.",
        imageUrl: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        price: 200,
        available: true
      },
      {
        name: "Chocolate",
        description: "Rich chocolate macaron with a silky dark chocolate ganache filling.",
        imageUrl: "https://images.unsplash.com/photo-1558326567-98ae2405596b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        price: 200,
        available: true
      },
      {
        name: "Pistachio",
        description: "Delicate pistachio macaron filled with a creamy pistachio buttercream.",
        imageUrl: "https://images.unsplash.com/photo-1552848031-326ec03fe2ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        price: 200,
        available: true
      },
      {
        name: "Lemon",
        description: "Bright lemon macaron with a zesty lemon curd filling that balances sweet and tart.",
        imageUrl: "https://images.unsplash.com/photo-1558326567-98ae2405596b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        price: 200,
        available: true
      },
      {
        name: "Salted Caramel",
        description: "Golden macaron with a decadent salted caramel filling that melts in your mouth.",
        imageUrl: "https://images.unsplash.com/photo-1558326567-98ae2405596b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        price: 200,
        available: true
      }
    ];
    
    defaultFlavors.forEach(flavor => this.createFlavor(flavor));
  }

  // Users (kept from original)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Flavors
  async getAllFlavors(): Promise<Flavor[]> {
    return Array.from(this.flavorsMap.values());
  }
  
  async getFlavor(id: number): Promise<Flavor | undefined> {
    return this.flavorsMap.get(id);
  }
  
  async createFlavor(insertFlavor: InsertFlavor): Promise<Flavor> {
    const id = this.flavorCurrentId++;
    const flavor: Flavor = { ...insertFlavor, id };
    this.flavorsMap.set(id, flavor);
    return flavor;
  }
  
  // Orders
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderCurrentId++;
    const order: Order = { ...insertOrder, id };
    this.ordersMap.set(id, order);
    return order;
  }
  
  async getOrder(id: number): Promise<Order | undefined> {
    return this.ordersMap.get(id);
  }
  
  async getOrderByOrderNumber(orderNumber: string): Promise<Order | undefined> {
    return Array.from(this.ordersMap.values()).find(
      (order) => order.orderNumber === orderNumber,
    );
  }
  
  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.ordersMap.values());
  }
}

export const storage = new MemStorage();
