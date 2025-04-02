import User from "../models/userModel.js"
import Product from "../models/productModel.js"
import connectDatabase from "../database/connect.js"
import { loadData } from '../data/loadDataAddress.js';
 
const seedUsers = async () => {
    const sampleUsers = [
        {
            name: "Admin",
            email: "admin@gmail.com",
            password: "admin",
            role: 1
        },
        {
            name: "User",
            email: "user@gmail.com",
            password: "user",
            role: 2
        }
    ]
    try {
        await User.insertMany(sampleUsers)
    } catch (error) {
        console.error('Error seeding database:', err);
    }
}

const seedProducts = async () => {
    const sampleProducts = [
        {
            images: [
                "jbl660nc-1.png",
                "jbl660nc-2.png",
                "jbl660nc-3.png",
                "jbl660nc-4.png", 
            ],
            brand: "JBL",
            title: "JBL Live 660NC",
            info: "Wireless Over-Ear NC Headphones",
            category: "Headphones",
            type: "Over Ear",
            finalPrice: 9999,          
            quantity: 100,
        },
        {
            images: [
                "boat518-1.png",
                "boat518-2.png",
                "boat518-3.png",
                "boat518-4.png"
            ],
            brand: "boAt",
            title: "boAt Rockerz 518",
            info: "On-Ear Wireless Headphones",
            category: "Headphones",
            type: "On Ear",
            finalPrice: 1299,           
            quantity: 1,       
        },
        {
            images: [
                "boat131-1.png",
                "boat131-2.png",
                "boat131-3.png",
                "boat131-4.png",
            ],
            brand: "boAt",
            title: "boAt Airdopes 131",
            info: "Wireless In-Ear Earbuds",
            category: "Earbuds",
            type: "In Ear",          
            finalPrice: 1099,
            quantity: 10,
        },
        {
            images: [
                "boat110-1.png",
                "boat110-2.png",
                "boat110-3.png",
                "boat110-4.png",
            ],
            brand: "boAt",
            title: "boAt BassHeads 110",
            info: "In-Ear Wired Earphones",
            category: "Earphones",
            type: "In Ear",           
            finalPrice: 449,          
            quantity: 1,
        },
        {           
            images: [
                "boat410-1.png",
                "boat410-2.png",
                "boat410-3.png",
                "boat410-4.png",
            ],
            brand: "boAt",
            title: "boAt Rockerz 410",
            info: "Bluetooth & Wired On-Ear Headphones",
            category: "Headphones",
            type: "On Ear",           
            finalPrice: 1599,
            quantity: 1,          
        },
    ]

    try {
        await Product.insertMany(sampleProducts)
    } catch (error) {
        console.error('Error seeding database:', err);
    }
}

const runSeed = async () => {

    await connectDatabase()

    console.log("Start seed data...");
    await seedUsers();
    await seedProducts();
    await loadData()
    console.log("Seed data completed.");
};

runSeed()