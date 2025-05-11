#!/bin/bash
sed -i 's|imageUrl: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",|imageUrl: "/attached_assets/cremebrulee.png",|g' server/storage.ts
sed -i 's|imageUrl: "https://images.unsplash.com/photo-1552848031-326ec03fe2ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",|imageUrl: "/attached_assets/cremebrulee.png",|g' server/storage.ts
sed -i 's|imageUrl: "https://images.unsplash.com/photo-1558326567-98ae2405596b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",|imageUrl: "/attached_assets/cremebrulee.png",|g' server/storage.ts
