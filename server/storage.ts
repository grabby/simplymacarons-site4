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
  
  // Flavours
  getAllFlavors(): Promise<Flavor[]>; // Keep for backward compatibility
  getFlavor(id: number): Promise<Flavor | undefined>; // Keep for backward compatibility
  createFlavor(flavor: InsertFlavor): Promise<Flavor>; // Keep for backward compatibility
  
  // New Canadian spelling methods
  getAllFlavours(): Promise<Flavor[]>;
  getFlavour(id: number): Promise<Flavor | undefined>;
  createFlavour(flavour: InsertFlavor): Promise<Flavor>;
  
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

  // Initialize with flavors from simplymacarons.ca
  private initializeFlavors() {
    const defaultFlavors: InsertFlavor[] = [
      {
        name: "Vanilla",
        description: "Classic vanilla macaron with smooth vanilla buttercream filling",
        imageUrl: "https://images.pexels.com/photos/7474241/pexels-photo-7474241.jpeg",
        price: 200, // $2.00
        available: true
      },
      {
        name: "Chocolate",
        description: "Rich chocolate macaron with dark chocolate ganache",
        imageUrl: "https://images.pexels.com/photos/3188432/pexels-photo-3188432.jpeg",
        price: 200,
        available: true
      },
      {
        name: "Salted Caramel",
        description: "Sweet and salty caramel macaron with decadent caramel filling",
        imageUrl: "https://images.pexels.com/photos/6278664/pexels-photo-6278664.jpeg",
        price: 200,
        available: true
      },
      {
        name: "Raspberry",
        description: "Vibrant raspberry macaron with raspberry jam filling",
        imageUrl: "https://images.pexels.com/photos/6605309/pexels-photo-6605309.jpeg",
        price: 200,
        available: true
      },
      {
        name: "Pistachio",
        description: "Nutty pistachio macaron with creamy pistachio buttercream",
        imageUrl: "https://images.pexels.com/photos/2014693/pexels-photo-2014693.jpeg",
        price: 200,
        available: true,
        tags: ["Top 5"]
      },
      {
        name: "Lemon",
        description: "Tangy lemon macaron with zesty lemon curd filling",
        imageUrl: "https://images.pexels.com/photos/6277543/pexels-photo-6277543.jpeg",
        price: 200,
        available: true,
        tags: ["Top 5"]
      },
      {
        name: "Hazelnut Chocolate",
        description: "Hazelnut-infused macaron with chocolate hazelnut filling",
        imageUrl: "https://images.pexels.com/photos/2035037/pexels-photo-2035037.jpeg",
        price: 200,
        available: true
      },
      {
        name: "Coffee",
        description: "Bold coffee macaron with espresso buttercream",
        imageUrl: "https://images.pexels.com/photos/8028518/pexels-photo-8028518.jpeg",
        price: 200,
        available: true
      },
      {
        name: "Earl Grey",
        description: "Fragrant Earl Grey tea-infused macaron with vanilla filling",
        imageUrl: "https://images.pexels.com/photos/3769014/pexels-photo-3769014.jpeg",
        price: 200,
        available: true,
        tags: ["Top 5"]
      },
      {
        name: "Strawberry",
        description: "Sweet strawberry macaron with strawberry jam filling",
        imageUrl: "https://images.pexels.com/photos/6133506/pexels-photo-6133506.jpeg",
        price: 200,
        available: true
      },
      {
        name: "Cookies & Cream",
        description: "Delicious cookies & cream macaron with creamy Oreo filling",
        imageUrl: "https://images.pexels.com/photos/2693447/pexels-photo-2693447.jpeg",
        price: 200,
        available: true,
        tags: ["Top 5"]
      },
      {
        name: "Red Velvet",
        description: "Rich red velvet macaron with cream cheese filling",
        imageUrl: "https://images.pexels.com/photos/7506344/pexels-photo-7506344.jpeg",
        price: 200,
        available: true,
        tags: ["Top 5"]
      },
      {
        name: "Matcha",
        description: "Japanese green tea macaron with matcha buttercream",
        imageUrl: "https://images.pexels.com/photos/8472714/pexels-photo-8472714.jpeg",
        price: 200,
        available: true
      },
      {
        name: "Fuzzy Peach",
        description: "Sweet peach-flavored macaron with fuzzy peach filling",
        imageUrl: "https://images.pexels.com/photos/4686960/pexels-photo-4686960.jpeg",
        price: 200,
        available: true,
        tags: ["Kid Favourite"]
      },
      {
        name: "Crème Brûlée",
        description: "Classic crème brûlée macaron with caramelized sugar top",
        imageUrl: "https://images.pexels.com/photos/4686957/pexels-photo-4686957.jpeg",
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
    const flavor: Flavor = { 
      ...insertFlavor, 
      id,
      available: insertFlavor.available ?? true,
      tags: insertFlavor.tags ?? null
    };
    this.flavorsMap.set(id, flavor);
    return flavor;
  }
  
  // Canadian spelling methods - call the original methods
  async getAllFlavours(): Promise<Flavor[]> {
    return this.getAllFlavors();
  }
  
  async getFlavour(id: number): Promise<Flavor | undefined> {
    return this.getFlavor(id);
  }
  
  async createFlavour(insertFlavour: InsertFlavor): Promise<Flavor> {
    return this.createFlavor(insertFlavour);
  }
  
  // Orders
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderCurrentId++;
    const order: Order = { 
      ...insertOrder, 
      id,
      pickupDate: insertOrder.pickupDate || null,
      pickupTime: insertOrder.pickupTime || null,
      specialInstructions: insertOrder.specialInstructions || null,
      createdAt: new Date()
    };
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
