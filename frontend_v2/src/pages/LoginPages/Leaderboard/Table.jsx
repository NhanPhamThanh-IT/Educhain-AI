import { useState } from "react";
import { Avatar, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { StarRounded, Security as Shield, VpnKeyRounded as VpnKey, LockRounded as CheckCircleRounded } from "@mui/icons-material";
import ecoin from "@assets/ecoin.png";
import { motion } from "framer-motion";

const leaderboardData = [
    {
        id: 1,
        name: "Pham Thanh Nhan",
        location: "Ho Chi Minh City, Vietnam",
        avatar: "https://scontent.fsgn7-2.fna.fbcdn.net/v/t39.30808-1/480749832_1085842260013183_6620778893531098027_n.jpg?stp=cp6_dst-jpg_s480x480_tt6&_nc_cat=106&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHH-UxosFzudmqA8wfmZHC8CqzeNgcCHFsKrN42BwIcWwr88cP4FFVTUJ_YMePsALYeukxJdMRPH-k77Edb7g8z&_nc_ohc=SYBphlcSOugQ7kNvgHb2MwB&_nc_oc=AdghDjfp51j5k1HSyW9ALIsIstMwN4d72kg9hAAvBt34_srNYOt8i2Wul30ALhEKDVGMegU0x9N6-SK5P7nRmC1O&_nc_zt=24&_nc_ht=scontent.fsgn7-2.fna&_nc_gid=AscRqMvZ49wGr6JRJslStV0&oh=00_AYBbpmP3k_ux0Nrzmr4kCXlOPXOIJW2bDp3E0L0ksBn7RA&oe=67CDA29F",
        points: 8500,
        achievements: [Shield, VpnKey, CheckCircleRounded]
    },
    {
        id: 2,
        name: "Nguyen Van Tu",
        location: "Ho Chi Minh City, Vietnam",
        avatar: "https://scontent.fsgn7-1.fna.fbcdn.net/v/t39.30808-1/457791378_1113577110128227_5285053054347682184_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEUhy_Trl-EggApOKfMPx78BFoNO-PQn48EWg0749Cfj8HW47eFfCTVD6YOw8_AKiczMgLfolvIEehNGigzIRpK&_nc_ohc=Qza0P48zBkcQ7kNvgGeUXrG&_nc_oc=AdgmsF7hK7B5sH3C4YihIH-NCejpdyJm_yZqQfr0QCQ3BZvmBm-hbfGTErA2tuqkIY6dkOXuWK6qFgRmeLN9MCCH&_nc_zt=24&_nc_ht=scontent.fsgn7-1.fna&_nc_gid=AG740jqRAQt2T1w-OlP3LYu&oh=00_AYDWtLT2pNVWLFFhswfZd7Aic8OxG_zQqNYWGdZtTk3NBw&oe=67CD89F6",
        points: 9200,
        achievements: [Shield, CheckCircleRounded]
    },
    {
        id: 3,
        name: "Duong Trung Nghia",
        location: "Ho Chi Minh City, Vietnam",
        avatar: "https://scontent.fsgn7-1.fna.fbcdn.net/v/t39.30808-1/473812945_3876034916047426_4360867862872893579_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeG5bjClSE3xSoQKZg1ECtN5DP5iyQzzhrMM_mLJDPOGs6RuMaOROH2nLU92LFNLrTTjQQEpuuODC6C_KEnxRAVt&_nc_ohc=31MYSoDpwKsQ7kNvgGpJJ2J&_nc_oc=AdjZwV1pYEUZIPNj4DNVBfXwdTGq4aCcfEmkdS1HuLJs8leo63QDY0lVaQEjxEit_yj0BGqz7N-1J82oNbAzbRBu&_nc_zt=24&_nc_ht=scontent.fsgn7-1.fna&_nc_gid=AAOoBqYQDHr_uo8pxeCxyS2&oh=00_AYAI8janV8FZJwN7QtfMkvs4RDwFzTT4B3gYiVfBMRXcVg&oe=67CDB89C",
        points: 7800,
        achievements: [VpnKey, CheckCircleRounded]
    },
    {
        id: 4,
        name: "Nguyen Trong Nhan",
        location: "Ho Chi Minh City, Vietnam",
        avatar: "https://scontent.fsgn7-1.fna.fbcdn.net/v/t39.30808-1/475296814_1816907812391127_1889273796000268362_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHkQGhO77koktY3-lwAvweQ1FaBSKqdVubUVoFIqp1W5uarYkTg3ljZjj-jsKmLGeQH9kdj2RjFLHj0KfGyCPxi&_nc_ohc=LyOgGiEtwh0Q7kNvgF9Ty6O&_nc_oc=AdjTUsEuDXSFUCf4XypJppt7gR8i5K5PzkYEdwLOMXVZjSvSNANvom4nGyuUoAKKLnFRTaTPfzczv5PJa6B6U6OO&_nc_zt=24&_nc_ht=scontent.fsgn7-1.fna&_nc_gid=ArJPDrmeB-1eNY41ARP3DR0&oh=00_AYCN7PpMyM4LqdTL5pOAav8J28V35gIPkpPNtobI-Ao2pA&oe=67CD98A2",
        points: 9700,
        achievements: [Shield]
    },
    {
        id: 5,
        name: "Lai Ngoc Phuong Nam",
        location: "Ho Chi Minh City, Vietnam",
        avatar: "https://scontent.fsgn7-2.fna.fbcdn.net/v/t39.30808-1/476493473_2427378957594657_7555421783706141205_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=106&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeFW3fKij1eKwk0Xzxu043LuUqCvTNa-MANSoK9M1r4wA0kHuI1gGXhjxcZPU6ibTWwkb60gEpoO_d2pHQ2PxBT6&_nc_ohc=MeMuPwuvBA0Q7kNvgEnnrsd&_nc_oc=Adis7KlJ2DNAKUHNoDLPV1n8j422Cl2vo7nP09SEZBwRCn6GiXvqcbPuTYI8BzZKw1r_0vRWnlMLStULISIXkxSf&_nc_zt=24&_nc_ht=scontent.fsgn7-2.fna&_nc_gid=AXVvqG-PXg2lwVTo9tGfOf9&oh=00_AYB44VWX5TkcL_qWS7PAKgpDp_Fcgc57kpl586TyWuzTrg&oe=67CD8FB8",
        points: 6800,
        achievements: [VpnKey, Shield, CheckCircleRounded]
    },
    {
        id: 6,
        name: "Truong Le",
        location: "Ho Chi Minh City, Vietnam",
        avatar: "https://scontent.fsgn7-1.fna.fbcdn.net/v/t39.30808-1/475279330_3666038960362554_4420636038579363145_n.jpg?stp=cp6_dst-jpg_s480x480_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEjYbSmhllhWmg4p217iPmJQl6VGG_oFH1CXpUYb-gUfSbwuIKhuufo4lPyI1dJeXIwc1H_bhP2vuRy2Ex5kCeQ&_nc_ohc=DKhTo3pvjpQQ7kNvgGPSMjt&_nc_oc=AdjCahmVeVRYKzt0V2c0TOKoJtbCYX3GMhtdZ5zO2bJA2ncyoM6HbOgHV4Pv0L3vDDbHyUsXOg8E48Fhq2D8i-k7&_nc_zt=24&_nc_ht=scontent.fsgn7-1.fna&_nc_gid=ApBJ52kwbjCuA2bKKsDQHU5&oh=00_AYA2rn7br6QRxjuh3jj5L8am15EhHv2p4ht8gREXSAQAiQ&oe=67CDA268",
        points: 8900,
        achievements: [VpnKey, CheckCircleRounded]
    },
    {
        id: 7,
        name: "Thanh Nguyen",
        location: "Ho Chi Minh City, Vietnam",
        avatar: "https://scontent.fsgn7-1.fna.fbcdn.net/v/t39.30808-1/474112766_1914728222392807_5993720206228242424_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeG0zDozdNo9-T-boadgl0yDmmkVvSUKNDGaaRW9JQo0Mdzp3FWAha9PRXE-14updwfxZ7uz_EeGzvId559cNUZV&_nc_ohc=51ZXDhK8w10Q7kNvgGmHg98&_nc_oc=AdjC-Ifegp4GtZghPGqGSrAbOlmg-fxGEajsCnstSMRp6XG8y-XmwA6v4pNOz6eJsre86qhI92GuIUSa2ZQM8on_&_nc_zt=24&_nc_ht=scontent.fsgn7-1.fna&_nc_gid=AsaqAVxhFIfK0CgFlIthfeP&oh=00_AYAZtlWVVDiqfweABMV-dhoHUyge06XgGxz0Fh_-8SKx7g&oe=67CDB4D9",
        points: 7300,
        achievements: [Shield, VpnKey]
    },
    {
        id: 8,
        name: "Luong Gia Thiec",
        location: "Ho Chi Minh City, Vietnam",
        avatar: "https://scontent.fsgn7-2.fna.fbcdn.net/v/t39.30808-1/461939958_1430709581650640_683951064824837801_n.jpg?stp=dst-jpg_s120x120_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGIy_QAdvEY6SlfU1LrE3NyHRtpcC_F4w0dG2lwL8XjDbexyYtzhCxuE6pFcHceWfoot0BEcHNmor6XZD0LWzlr&_nc_ohc=h8BuAhQA2g4Q7kNvgHisuW0&_nc_oc=Adjlcnz6U0396gpZxdF7nBGqmmaacJ_HW6Y0fuG38lpER7WdjHSFt9jDI_koSGAM8x6Zo0jUajRnXKB40emrY6xP&_nc_zt=24&_nc_ht=scontent.fsgn7-2.fna&_nc_gid=AdUkMgxYASyxl79x8oNmUdc&oh=00_AYAJt7Lrtf1rvJ-Wa2BaaslIKMe_yP-wn3E6bj9t-VFWDA&oe=67CDA44C",
        points: 9400,
        achievements: [CheckCircleRounded]
    },
    {
        id: 9,
        name: "Thuy Uyen",
        location: "Ho Chi Minh City, Vietnam",
        avatar: "https://scontent.fsgn7-2.fna.fbcdn.net/v/t39.30808-1/461939958_1430709581650640_683951064824837801_n.jpg?stp=dst-jpg_s120x120_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGIy_QAdvEY6SlfU1LrE3NyHRtpcC_F4w0dG2lwL8XjDbexyYtzhCxuE6pFcHceWfoot0BEcHNmor6XZD0LWzlr&_nc_ohc=h8BuAhQA2g4Q7kNvgHisuW0&_nc_oc=Adjlcnz6U0396gpZxdF7nBGqmmaacJ_HW6Y0fuG38lpER7WdjHSFt9jDI_koSGAM8x6Zo0jUajRnXKB40emrY6xP&_nc_zt=24&_nc_ht=scontent.fsgn7-2.fna&_nc_gid=AdUkMgxYASyxl79x8oNmUdc&oh=00_AYAJt7Lrtf1rvJ-Wa2BaaslIKMe_yP-wn3E6bj9t-VFWDA&oe=67CDA44C",
        points: 8100,
        achievements: [Shield, VpnKey, CheckCircleRounded]
    },
    {
        id: 10,
        name: "Trịnh Thị Khánh",
        location: "Ho Chi Minh City, Vietnam",
        avatar: "https://scontent.fsgn7-2.fna.fbcdn.net/v/t39.30808-1/461939958_1430709581650640_683951064824837801_n.jpg?stp=dst-jpg_s120x120_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGIy_QAdvEY6SlfU1LrE3NyHRtpcC_F4w0dG2lwL8XjDbexyYtzhCxuE6pFcHceWfoot0BEcHNmor6XZD0LWzlr&_nc_ohc=h8BuAhQA2g4Q7kNvgHisuW0&_nc_oc=Adjlcnz6U0396gpZxdF7nBGqmmaacJ_HW6Y0fuG38lpER7WdjHSFt9jDI_koSGAM8x6Zo0jUajRnXKB40emrY6xP&_nc_zt=24&_nc_ht=scontent.fsgn7-2.fna&_nc_gid=AdUkMgxYASyxl79x8oNmUdc&oh=00_AYAJt7Lrtf1rvJ-Wa2BaaslIKMe_yP-wn3E6bj9t-VFWDA&oe=67CDA44C",
        points: 7600,
        achievements: [VpnKey, CheckCircleRounded]
    },
    {
        id: 11,
        name: "Lý Văn Long",
        location: "Ho Chi Minh City, Vietnam",
        avatar: "https://scontent.fsgn7-2.fna.fbcdn.net/v/t39.30808-1/461939958_1430709581650640_683951064824837801_n.jpg?stp=dst-jpg_s120x120_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGIy_QAdvEY6SlfU1LrE3NyHRtpcC_F4w0dG2lwL8XjDbexyYtzhCxuE6pFcHceWfoot0BEcHNmor6XZD0LWzlr&_nc_ohc=h8BuAhQA2g4Q7kNvgHisuW0&_nc_oc=Adjlcnz6U0396gpZxdF7nBGqmmaacJ_HW6Y0fuG38lpER7WdjHSFt9jDI_koSGAM8x6Zo0jUajRnXKB40emrY6xP&_nc_zt=24&_nc_ht=scontent.fsgn7-2.fna&_nc_gid=AdUkMgxYASyxl79x8oNmUdc&oh=00_AYAJt7Lrtf1rvJ-Wa2BaaslIKMe_yP-wn3E6bj9t-VFWDA&oe=67CDA44C",
        points: 8800,
        achievements: [Shield]
    },
    {
        id: 12,
        name: "Phan Thị Mai",
        location: "Ho Chi Minh City, Vietnam",
        avatar: "https://scontent.fsgn7-2.fna.fbcdn.net/v/t39.30808-1/461939958_1430709581650640_683951064824837801_n.jpg?stp=dst-jpg_s120x120_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGIy_QAdvEY6SlfU1LrE3NyHRtpcC_F4w0dG2lwL8XjDbexyYtzhCxuE6pFcHceWfoot0BEcHNmor6XZD0LWzlr&_nc_ohc=h8BuAhQA2g4Q7kNvgHisuW0&_nc_oc=Adjlcnz6U0396gpZxdF7nBGqmmaacJ_HW6Y0fuG38lpER7WdjHSFt9jDI_koSGAM8x6Zo0jUajRnXKB40emrY6xP&_nc_zt=24&_nc_ht=scontent.fsgn7-2.fna&_nc_gid=AdUkMgxYASyxl79x8oNmUdc&oh=00_AYAJt7Lrtf1rvJ-Wa2BaaslIKMe_yP-wn3E6bj9t-VFWDA&oe=67CDA44C",
        points: 9200,
        achievements: [VpnKey, CheckCircleRounded]
    },
    {
        id: 13,
        name: "Lương Văn Nam",
        location: "Ho Chi Minh City, Vietnam",
        avatar: "https://scontent.fsgn7-2.fna.fbcdn.net/v/t39.30808-1/461939958_1430709581650640_683951064824837801_n.jpg?stp=dst-jpg_s120x120_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGIy_QAdvEY6SlfU1LrE3NyHRtpcC_F4w0dG2lwL8XjDbexyYtzhCxuE6pFcHceWfoot0BEcHNmor6XZD0LWzlr&_nc_ohc=h8BuAhQA2g4Q7kNvgHisuW0&_nc_oc=Adjlcnz6U0396gpZxdF7nBGqmmaacJ_HW6Y0fuG38lpER7WdjHSFt9jDI_koSGAM8x6Zo0jUajRnXKB40emrY6xP&_nc_zt=24&_nc_ht=scontent.fsgn7-2.fna&_nc_gid=AdUkMgxYASyxl79x8oNmUdc&oh=00_AYAJt7Lrtf1rvJ-Wa2BaaslIKMe_yP-wn3E6bj9t-VFWDA&oe=67CDA44C",
        points: 7000,
        achievements: [Shield, VpnKey]
    },
    {
        id: 14,
        name: "Trương Thị Oanh",
        location: "Ho Chi Minh City, Vietnam",
        avatar: "https://scontent.fsgn7-2.fna.fbcdn.net/v/t39.30808-1/461939958_1430709581650640_683951064824837801_n.jpg?stp=dst-jpg_s120x120_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGIy_QAdvEY6SlfU1LrE3NyHRtpcC_F4w0dG2lwL8XjDbexyYtzhCxuE6pFcHceWfoot0BEcHNmor6XZD0LWzlr&_nc_ohc=h8BuAhQA2g4Q7kNvgHisuW0&_nc_oc=Adjlcnz6U0396gpZxdF7nBGqmmaacJ_HW6Y0fuG38lpER7WdjHSFt9jDI_koSGAM8x6Zo0jUajRnXKB40emrY6xP&_nc_zt=24&_nc_ht=scontent.fsgn7-2.fna&_nc_gid=AdUkMgxYASyxl79x8oNmUdc&oh=00_AYAJt7Lrtf1rvJ-Wa2BaaslIKMe_yP-wn3E6bj9t-VFWDA&oe=67CDA44C",
        points: 8300,
        achievements: [CheckCircleRounded]
    },
    {
        id: 15,
        name: "Đinh Văn Phúc",
        location: "Ho Chi Minh City, Vietnam",
        avatar: "https://scontent.fsgn7-2.fna.fbcdn.net/v/t39.30808-1/461939958_1430709581650640_683951064824837801_n.jpg?stp=dst-jpg_s120x120_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGIy_QAdvEY6SlfU1LrE3NyHRtpcC_F4w0dG2lwL8XjDbexyYtzhCxuE6pFcHceWfoot0BEcHNmor6XZD0LWzlr&_nc_ohc=h8BuAhQA2g4Q7kNvgHisuW0&_nc_oc=Adjlcnz6U0396gpZxdF7nBGqmmaacJ_HW6Y0fuG38lpER7WdjHSFt9jDI_koSGAM8x6Zo0jUajRnXKB40emrY6xP&_nc_zt=24&_nc_ht=scontent.fsgn7-2.fna&_nc_gid=AdUkMgxYASyxl79x8oNmUdc&oh=00_AYAJt7Lrtf1rvJ-Wa2BaaslIKMe_yP-wn3E6bj9t-VFWDA&oe=67CDA44C",
        points: 7500,
        achievements: [Shield, VpnKey, CheckCircleRounded]
    },
    {
        id: 16,
        name: "Nguyễn Thị Quỳnh",
        location: "Ho Chi Minh City, Vietnam",
        avatar: "https://scontent.fsgn7-2.fna.fbcdn.net/v/t39.30808-1/461939958_1430709581650640_683951064824837801_n.jpg?stp=dst-jpg_s120x120_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGIy_QAdvEY6SlfU1LrE3NyHRtpcC_F4w0dG2lwL8XjDbexyYtzhCxuE6pFcHceWfoot0BEcHNmor6XZD0LWzlr&_nc_ohc=h8BuAhQA2g4Q7kNvgHisuW0&_nc_oc=Adjlcnz6U0396gpZxdF7nBGqmmaacJ_HW6Y0fuG38lpER7WdjHSFt9jDI_koSGAM8x6Zo0jUajRnXKB40emrY6xP&_nc_zt=24&_nc_ht=scontent.fsgn7-2.fna&_nc_gid=AdUkMgxYASyxl79x8oNmUdc&oh=00_AYAJt7Lrtf1rvJ-Wa2BaaslIKMe_yP-wn3E6bj9t-VFWDA&oe=67CDA44C",
        points: 9100,
        achievements: [VpnKey, CheckCircleRounded]
    },
    {
        id: 17,
        name: "Đỗ Văn Rạng",
        location: "Ho Chi Minh City, Vietnam",
        avatar: "https://scontent.fsgn7-2.fna.fbcdn.net/v/t39.30808-1/461939958_1430709581650640_683951064824837801_n.jpg?stp=dst-jpg_s120x120_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGIy_QAdvEY6SlfU1LrE3NyHRtpcC_F4w0dG2lwL8XjDbexyYtzhCxuE6pFcHceWfoot0BEcHNmor6XZD0LWzlr&_nc_ohc=h8BuAhQA2g4Q7kNvgHisuW0&_nc_oc=Adjlcnz6U0396gpZxdF7nBGqmmaacJ_HW6Y0fuG38lpER7WdjHSFt9jDI_koSGAM8x6Zo0jUajRnXKB40emrY6xP&_nc_zt=24&_nc_ht=scontent.fsgn7-2.fna&_nc_gid=AdUkMgxYASyxl79x8oNmUdc&oh=00_AYAJt7Lrtf1rvJ-Wa2BaaslIKMe_yP-wn3E6bj9t-VFWDA&oe=67CDA44C",
        points: 7800,
        achievements: [Shield]
    },
    {
        id: 18,
        name: "Cao Thị Sang",
        location: "Ho Chi Minh City, Vietnam",
        avatar: "https://scontent.fsgn7-2.fna.fbcdn.net/v/t39.30808-1/461939958_1430709581650640_683951064824837801_n.jpg?stp=dst-jpg_s120x120_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGIy_QAdvEY6SlfU1LrE3NyHRtpcC_F4w0dG2lwL8XjDbexyYtzhCxuE6pFcHceWfoot0BEcHNmor6XZD0LWzlr&_nc_ohc=h8BuAhQA2g4Q7kNvgHisuW0&_nc_oc=Adjlcnz6U0396gpZxdF7nBGqmmaacJ_HW6Y0fuG38lpER7WdjHSFt9jDI_koSGAM8x6Zo0jUajRnXKB40emrY6xP&_nc_zt=24&_nc_ht=scontent.fsgn7-2.fna&_nc_gid=AdUkMgxYASyxl79x8oNmUdc&oh=00_AYAJt7Lrtf1rvJ-Wa2BaaslIKMe_yP-wn3E6bj9t-VFWDA&oe=67CDA44C",
        points: 8600,
        achievements: [VpnKey, CheckCircleRounded]
    },
    {
        id: 19,
        name: "Nguyễn Văn Tiến",
        location: "Ho Chi Minh City, Vietnam",
        avatar: "https://scontent.fsgn7-2.fna.fbcdn.net/v/t39.30808-1/461939958_1430709581650640_683951064824837801_n.jpg?stp=dst-jpg_s120x120_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGIy_QAdvEY6SlfU1LrE3NyHRtpcC_F4w0dG2lwL8XjDbexyYtzhCxuE6pFcHceWfoot0BEcHNmor6XZD0LWzlr&_nc_ohc=h8BuAhQA2g4Q7kNvgHisuW0&_nc_oc=Adjlcnz6U0396gpZxdF7nBGqmmaacJ_HW6Y0fuG38lpER7WdjHSFt9jDI_koSGAM8x6Zo0jUajRnXKB40emrY6xP&_nc_zt=24&_nc_ht=scontent.fsgn7-2.fna&_nc_gid=AdUkMgxYASyxl79x8oNmUdc&oh=00_AYAJt7Lrtf1rvJ-Wa2BaaslIKMe_yP-wn3E6bj9t-VFWDA&oe=67CDA44C",
        points: 7200,
        achievements: [Shield, VpnKey]
    },
    {
        id: 20,
        name: "Lê Thị Uyên",
        location: "Ho Chi Minh City, Vietnam",
        avatar: "https://scontent.fsgn7-2.fna.fbcdn.net/v/t39.30808-1/461939958_1430709581650640_683951064824837801_n.jpg?stp=dst-jpg_s120x120_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGIy_QAdvEY6SlfU1LrE3NyHRtpcC_F4w0dG2lwL8XjDbexyYtzhCxuE6pFcHceWfoot0BEcHNmor6XZD0LWzlr&_nc_ohc=h8BuAhQA2g4Q7kNvgHisuW0&_nc_oc=Adjlcnz6U0396gpZxdF7nBGqmmaacJ_HW6Y0fuG38lpER7WdjHSFt9jDI_koSGAM8x6Zo0jUajRnXKB40emrY6xP&_nc_zt=24&_nc_ht=scontent.fsgn7-2.fna&_nc_gid=AdUkMgxYASyxl79x8oNmUdc&oh=00_AYAJt7Lrtf1rvJ-Wa2BaaslIKMe_yP-wn3E6bj9t-VFWDA&oe=67CDA44C",
        points: 8900,
        achievements: [CheckCircleRounded]
    }
];

const getRowBackground = (index) => {
    if (index === 0) return "#E3F2FD";
    if (index < 3) return "#BBDEFB";
    if (index < 5) return "#90CAF9";
    return "#F0F8FF";
};

const StyledTableRow = styled(motion.tr)(({ index }) => ({
    color: typeof index === "number" && index < 5 ? "#000" : "#666",
    background: getRowBackground(index),
    transition: "background 0.3s ease, transform 0.2s ease-out",
    willChange: "transform, background",
    "&:hover": {
        background: "rgba(200, 230, 255, 0.4)",
        transform: "scale(1.01)",
    },
}));

const LeaderboardTable = () => {
    const [visibleCount, setVisibleCount] = useState(10);
    const showMore = () => setVisibleCount(leaderboardData.length);
    const sortData = leaderboardData.sort((a, b) => b.points - a.points);
    return (
        <Box sx={{ borderRadius: "12px", pt: 2, px: 2, maxWidth: "900px", mx: "auto", bgcolor: "white" }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: 20 }}>#</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>Profile</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: 20 }}>Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortData.slice(0, visibleCount).map((user, index) => (
                            <StyledTableRow
                                key={user.id}
                                index={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <TableCell align="center">
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        {index < 5 ? (
                                            <Box sx={{
                                                width: 32, height: 32, display: "flex", alignItems: "center",
                                                justifyContent: "center", borderRadius: "50%", backgroundColor: "white"
                                            }}>
                                                <StarRounded sx={{
                                                    color: index === 0 ? "#64B5F6" : index < 3 ? "#42A5F5" : "#1E88E5",
                                                    fontSize: 24
                                                }} />
                                            </Box>
                                        ) : (
                                            <Typography variant="body2" fontWeight="bold">{index + 1}</Typography>
                                        )}
                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Avatar src={user.avatar} sx={{ width: 40, height: 40 }} />
                                        <Box>
                                            <Typography fontWeight="bold" sx={{ color: index < 5 ? "#000" : "#666" }}>{user.name}</Typography>
                                            <Typography variant="caption" sx={{ color: index < 5 ? "#000" : "#666" }}>{user.location}</Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                                        <Box component="img" src={ecoin} alt="Reward Icon" sx={{ width: 30, height: 30 }} />
                                        <Typography fontWeight="bold" sx={{ fontSize: "1rem", color: "#333" }}>{user.points}</Typography>
                                    </Box>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {visibleCount < leaderboardData.length && (
                <Button variant="contained" sx={{ m: 2 }} onClick={showMore}>More</Button>
            )}
        </Box>
    );
};

export default LeaderboardTable;
