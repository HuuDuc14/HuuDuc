import User from "../models/userModel.js"
import Product from "../models/productModel.js"
import connectDatabase from "../database/connect.js"
import { loadData } from '../data/loadDataAddress.js';
import Brand from "../models/brandModel.js";
import Category from "../models/categoryModel.js";
 
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

const seedBrand = async () => {
    const sampleBrands = [
        {
            name: "JBL"
        },
        {
            name: "BoAt"
        },
        {
            name: "Sony"
        }
    ]

    try {
        await Brand.insertMany(sampleBrands)
    } catch (error) {
        console.error('Error seeding database:', err);
    }
}

const seedCategory = async () => {
    const sampleCategories = [
        {
            name: "Earphones"
        },
        {
            name: "Headphones"
        },
        {
            name: "Earbuds"
        }
    ]

    try {
        await Category.insertMany(sampleCategories)
    } catch (error) {
        console.error('Error seeding database:', err);
    }
}

const seedProducts = async () => {
    const jbl = await Brand.findOne({name: "JBL"})
    const BoAt = await Brand.findOne({name: "BoAt"})
    const Sony = await Brand.findOne({name: "Sony"})

    const Earphones = await Category.findOne({name: "Earphones"})
    const Headphones = await Category.findOne({name: "Headphones"})
    const Earbuds = await Category.findOne({name: "Earbuds"})

    const sampleProducts = [
        {
            images: [
                "jbl660nc-1.png",
                "jbl660nc-2.png",
                "jbl660nc-3.png",
                "jbl660nc-4.png", 
            ],
            brandId: jbl._id,
            title: "JBL Live 660NC",
            info: "Wireless Over-Ear NC Headphones",
            category: Headphones._id,
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
            brandId: BoAt._id,
            title: "boAt Rockerz 518",
            info: "On-Ear Wireless Headphones",
            category: Headphones._id,
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
            brandId: BoAt._id,
            title: "boAt Airdopes 131",
            info: "Wireless In-Ear Earbuds",
            category: Earbuds._id,
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
            brandId: BoAt._id,
            title: "boAt BassHeads 110",
            info: "In-Ear Wired Earphones",
            category: Earphones._id,
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
            brandId: BoAt._id,
            title: "boAt Rockerz 410",
            info: "Bluetooth & Wired On-Ear Headphones",
            category: Headphones._id,
            type: "On Ear",           
            finalPrice: 1599,
            quantity: 1,          
        },
        {           
            images: [
                "sony1000xm4-1.png",
                "sony1000xm4-2.png",
                "sony1000xm4-3.png",
                "sony1000xm4-4.png",
            ],
            brandId: Sony._id,
            title: "Sony WF-1000XM4",
            info: "Wireless In-Ear NC Headphones",
            category: Earbuds._id,
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
    await seedBrand()
    await seedCategory()
    await seedProducts();
    await loadData()
    console.log("Seed data completed.");
    process.exit();
};

runSeed()