import express from 'express'
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
})

const register = async (req, res) => {
    const { name, email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "email, password không được để trống" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email đã được sử dụng" });
        }

        const token = jwt.sign({ name, email, password }, process.env.JWT_SECRET, { expiresIn: "1h" })
        const verificationLink = `http://localhost:5000/auth/verify-email?token=${token}`

        await transporter.sendMail({
            from: process.env.MAIL_USERNAME,
            to: email,
            subject: "Xác nhận tài khoản",
            html: `<p>Xin chào ${name}. Nhấp vào liên kết sau để xác nhận tài khoản của bạn:</p>
                   <a href="${verificationLink}">Xác nhận tài khoản</a>`,
        })


        // const user = new User({ name, email, password })
        // await user.save()

        res.status(200).json({ message: "Vui lòng kiểm tra email để xác nhận tài khoản." });

    } catch (error) {
        res.status(500).json({ message: "Lỗi khi đăng ký" });
    }
}

const verifyEmail = async (req, res) => {
    const { token } = req.query;

    if(!token) {
        return res.status(400).json({ message: "Token không hợp lệ" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {name, email, password} = decoded

        const user = new User({ name, email, password }); 
        await user.save();
        res.redirect("http://localhost:3000?verifyEmail=success");
    } catch (error) {
        res.redirect("http://localhost:3000?verifyEmail=error");
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }

        if (!(password == user.password)) {
            return res.status(401).json({ message: "Mật khẩu không đúng" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        }

        const tokenUser = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.status(200).json({ message: "Đăng nhập thành công", token, tokenUser })

    } catch (error) {
        console.log(error);

        res.status(500).json({ error: "Lỗi khi đăng nhập" });
    }
}

export {
    register,
    login,
    verifyEmail
}