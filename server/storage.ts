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
        imageUrl: "https://static.wixstatic.com/media/c8d9b4_fb388f6b9fe24afba595d0e4cbf5946c~mv2.jpg",
        price: 200, // $2.00
        available: true
      },
      {
        name: "Chocolate",
        description: "Rich chocolate macaron with dark chocolate ganache",
        imageUrl: "https://static.wixstatic.com/media/c8d9b4_b67d8cd34ea649418aa13a3d5c40e89e~mv2.jpg",
        price: 200,
        available: true
      },
      {
        name: "Salted Caramel",
        description: "Sweet and salty caramel macaron with decadent caramel filling",
        imageUrl: "https://static.wixstatic.com/media/c8d9b4_f44a3c14ce254dd693a57bbde18e5ebb~mv2.jpg",
        price: 200,
        available: true
      },
      {
        name: "Raspberry",
        description: "Vibrant raspberry macaron with raspberry jam filling",
        imageUrl: "https://static.wixstatic.com/media/c8d9b4_3bb51f8785d14734adf5c661c8eddb3d~mv2.jpg",
        price: 200,
        available: true
      },
      {
        name: "Pistachio",
        description: "Nutty pistachio macaron with creamy pistachio buttercream",
        imageUrl: "https://static.wixstatic.com/media/c8d9b4_7d8a3c9ca1ed4d10a43a5d4e4d50e2f4~mv2.jpg",
        price: 200,
        available: true,
        tags: ["Top 5"]
      },
      {
        name: "Lemon",
        description: "Tangy lemon macaron with zesty lemon curd filling",
        imageUrl: "https://static.wixstatic.com/media/c8d9b4_c42e00a9d1ce4626a9b3b14f32e8c21f~mv2.jpg",
        price: 200,
        available: true,
        tags: ["Top 5"]
      },
      {
        name: "Hazelnut Chocolate",
        description: "Hazelnut-infused macaron with chocolate hazelnut filling",
        imageUrl: "https://static.wixstatic.com/media/c8d9b4_b67d8cd34ea649418aa13a3d5c40e89e~mv2.jpg",
        price: 200,
        available: true
      },
      {
        name: "Coffee",
        description: "Bold coffee macaron with espresso buttercream",
        imageUrl: "https://static.wixstatic.com/media/c8d9b4_6d683cc84e1d408c84c3c20b02a0af5d~mv2.jpg",
        price: 200,
        available: true
      },
      {
        name: "Earl Grey",
        description: "Fragrant Earl Grey tea-infused macaron with vanilla filling",
        imageUrl: "https://static.wixstatic.com/media/c8d9b4_c15e8b61fe434d889de5781e992a5621~mv2.jpg",
        price: 200,
        available: true,
        tags: ["Top 5"]
      },
      {
        name: "Strawberry",
        description: "Sweet strawberry macaron with strawberry jam filling",
        imageUrl: "https://static.wixstatic.com/media/c8d9b4_ce05939e3f6c49aea073530a4f70be07~mv2.jpg",
        price: 200,
        available: true
      },
      {
        name: "Cookies & Cream",
        description: "Delicious cookies & cream macaron with creamy Oreo filling",
        imageUrl: "https://static.wixstatic.com/media/c8d9b4_bff39b3e98e849b09423ef51e963c4a3~mv2.jpg",
        price: 200,
        available: true,
        tags: ["Top 5"]
      },
      {
        name: "Red Velvet",
        description: "Rich red velvet macaron with cream cheese filling",
        imageUrl: "https://static.wixstatic.com/media/c8d9b4_0c5d9d9f69bd470e8e97a13d66a44286~mv2.jpg",
        price: 200,
        available: true,
        tags: ["Top 5"]
      },
      {
        name: "Matcha",
        description: "Japanese green tea macaron with matcha buttercream",
        imageUrl: "https://static.wixstatic.com/media/c8d9b4_2c564e6daa1b45b9a1fbaacb176a3fe9~mv2.jpg",
        price: 200,
        available: true
      },
      {
        name: "Fuzzy Peach",
        description: "Sweet peach-flavored macaron with fuzzy peach filling",
        imageUrl: "https://static.wixstatic.com/media/c8d9b4_0cbb3cd7ce3948eb9e42f5d1f5ee20ed~mv2.jpg",
        price: 200,
        available: true,
        tags: ["Kid Favourite"]
      },
      {
        name: "Crème Brûlée",
        description: "Classic crème brûlée macaron with caramelized sugar top",
        imageUrl: "https://static.wixstatic.com/media/c8d9b4_f44a3c14ce254dd693a57bbde18e5ebb~mv2.jpg",
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
