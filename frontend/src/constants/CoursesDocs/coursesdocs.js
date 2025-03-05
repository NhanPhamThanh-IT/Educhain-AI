const courses = [
    {
        image: "https://s3-alpha-sig.figma.com/img/4c09/d512/80a4a59d1d1b735e03f6ddafe259f2ff?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fRf7a0YJFuxghCvxw8yOVVwdnD-IU72y72ibuVWq0ulMXPCUEWRDjq1Dg3iSsFLlqkXznigwJBRd89ZMEim5H1XDS7nqQpqcAhPTx3WF0uswvvAgxfPq6Y7Fe8lRfUlg4lmHnSXshevQcUq-yyGmJs8xDNfnAB6gCvnXGc6JB9NPBQABuB218aQy1QEwmaUxXGMbTp1SqR2rv9yaInMSeElu5LKoSBfujtLxGUK8cqzOTUdHLFQttb-pP8c4KHDLTxleuaTpp9gTO66DWtV0~~D2-gMe7HH2DJzZl27xY15y-6pcBxmGPN-h2rJyeeRHgZOcEUqx2Tvsnib5WPlKrQ__",
        title: "IT Statistics Data Science And Business Analysis",
        category: "Digital Marketing",
        rating: 4.5,
        price: "12,213.23",
        duration: "19h 30m",
        students: 20,
        instructor: { name: "Nhan Pham", avatar: "https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/480749832_1085842260013183_6620778893531098027_n.jpg?stp=cp6_dst-jpg_s480x480_tt6&_nc_cat=106&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHH-UxosFzudmqA8wfmZHC8CqzeNgcCHFsKrN42BwIcWwr88cP4FFVTUJ_YMePsALYeukxJdMRPH-k77Edb7g8z&_nc_ohc=SYBphlcSOugQ7kNvgHjzSbY&_nc_oc=Adhz5F98EAUPot8MKix9vzJ1b1cNcwa185gnHFobSLljE7kLIrsj2JVhBQZvN9YTK6g&_nc_zt=24&_nc_ht=scontent.fhan3-4.fna&_nc_gid=AzhbWE4WbEq_JEhDytitKZd&oh=00_AYCQILBroEJR1dgiaR0_bJ7XCZ_5bWycRQEXANLEn2izXA&oe=67CDA29F" }
    },
    {
        image: "https://s3-alpha-sig.figma.com/img/acee/6aac/288d21d65ea84f3a190934bccdeb27e8?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IzwszlsRWKFO0QlBaKuAcQLg~XHVpuKki1d7UMh2M8wFrIb52reQiEpeidtyNAc-G0BPQsDN6odf5jj~IJrVCoHUXLX-bAU5Xg7NkzwgHpbPybbM3nhwD5-IOdfsdrGqewvjy8uKD8Pv4-Vqkd3J2zxcBV9JwkJjBf-QUj~zC3hAQ69HdWLyEomjtDNYnK3e7QEXs8eyFU3oCpqgDJDbANbzjSdoXHIstEFm4BdRHxmzy1DdeYmI898gI7wjQaIy0xUnWMQYehfBmN~St1cbFPIR8qBeq~xpOOeCGe9njqJR1hIiPKooLFOXPEWcakq4utA7WDp2G1ferneonzrjJA__",
        title: "Beginner Adobe Illustrator For Graphic Design",
        category: "Graphic Design",
        rating: 4.5,
        price: "12,213.23",
        duration: "19h 30m",
        students: 20,
        instructor: { name: "Nhan Pham", avatar: "https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/480749832_1085842260013183_6620778893531098027_n.jpg?stp=cp6_dst-jpg_s480x480_tt6&_nc_cat=106&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHH-UxosFzudmqA8wfmZHC8CqzeNgcCHFsKrN42BwIcWwr88cP4FFVTUJ_YMePsALYeukxJdMRPH-k77Edb7g8z&_nc_ohc=SYBphlcSOugQ7kNvgHjzSbY&_nc_oc=Adhz5F98EAUPot8MKix9vzJ1b1cNcwa185gnHFobSLljE7kLIrsj2JVhBQZvN9YTK6g&_nc_zt=24&_nc_ht=scontent.fhan3-4.fna&_nc_gid=AzhbWE4WbEq_JEhDytitKZd&oh=00_AYCQILBroEJR1dgiaR0_bJ7XCZ_5bWycRQEXANLEn2izXA&oe=67CDA29F" }
    },
    {
        image: "https://s3-alpha-sig.figma.com/img/d1f4/a401/3b71ef52f2e9b38c8c7c68300a629071?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NLt8B4d2z89Kzw3Ho1bjISZOA9kMWiR8wG-fw~D5afa0pvXptKQx2aA~JyB9U2lVfrnX8VSR8z4xyE0RJRBExVSOP1S4t2F16PsEkNlLgmF3ENzwFWHOsBRz3kCHVFpmO5N6rTRAL7cpr2VayeGkMADNCXzI~fGPk1vkm1JcumM37DvK72n4zClbdfsFDaemHqg8s6EhbDJ5SK7nTLoqgIAUJqXM6rrSKlNC4Zr7pRCq80xJ2OvqcK37DrZcMfDOG61nzCpT1xsSheZgcRic-stGRW4lVQldO6P27YRQbwpGgAPXC3UtMWYMVP8SqZ8omv6KjojRCt8NyZftpc8JRQ_",
        title: "Complete Python Bootcamp: From Zero to Hero",
        category: "Programming",
        rating: 4.8,
        price: "15,000.00",
        duration: "25h 45m",
        students: 35,
        instructor: { name: "Nhan Pham", avatar: "https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/480749832_1085842260013183_6620778893531098027_n.jpg?stp=cp6_dst-jpg_s480x480_tt6&_nc_cat=106&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHH-UxosFzudmqA8wfmZHC8CqzeNgcCHFsKrN42BwIcWwr88cP4FFVTUJ_YMePsALYeukxJdMRPH-k77Edb7g8z&_nc_ohc=SYBphlcSOugQ7kNvgHjzSbY&_nc_oc=Adhz5F98EAUPot8MKix9vzJ1b1cNcwa185gnHFobSLljE7kLIrsj2JVhBQZvN9YTK6g&_nc_zt=24&_nc_ht=scontent.fhan3-4.fna&_nc_gid=AzhbWE4WbEq_JEhDytitKZd&oh=00_AYCQILBroEJR1dgiaR0_bJ7XCZ_5bWycRQEXANLEn2izXA&oe=67CDA29F" }
    },
    {
        image: "https://s3-alpha-sig.figma.com/img/d1f4/a401/3b71ef52f2e9b38c8c7c68300a629071?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NLt8B4d2z89Kzw3Ho1bjISZOA9kMWiR8wG-fw~D5afa0pvXptKQx2aA~JyB9U2lVfrnX8VSR8z4xyE0RJRBExVSOP1S4t2F16PsEkNlLgmF3ENzwFWHOsBRz3kCHVFpmO5N6rTRAL7cpr2VayeGkMADNCXzI~fGPk1vkm1JcumM37DvK72n4zClbdfsFDaemHqg8s6EhbDJ5SK7nTLoqgIAUJqXM6rrSKlNC4Zr7pRCq80xJ2OvqcK37DrZcMfDOG61nzCpT1xsSheZgcRic-stGRW4lVQldO6P27YRQbwpGgAPXC3UtMWYMVP8SqZ8omv6KjojRCt8NyZftpc8JRQ__",
        title: "IT Statistics Data Science And Business Analysis",
        category: "Digital Marketing",
        rating: 4.5,
        price: "12,213.23",
        duration: "19h 30m",
        students: 20,
        instructor: { name: "Nhan Pham", avatar: "https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/480749832_1085842260013183_6620778893531098027_n.jpg?stp=cp6_dst-jpg_s480x480_tt6&_nc_cat=106&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHH-UxosFzudmqA8wfmZHC8CqzeNgcCHFsKrN42BwIcWwr88cP4FFVTUJ_YMePsALYeukxJdMRPH-k77Edb7g8z&_nc_ohc=SYBphlcSOugQ7kNvgHjzSbY&_nc_oc=Adhz5F98EAUPot8MKix9vzJ1b1cNcwa185gnHFobSLljE7kLIrsj2JVhBQZvN9YTK6g&_nc_zt=24&_nc_ht=scontent.fhan3-4.fna&_nc_gid=AzhbWE4WbEq_JEhDytitKZd&oh=00_AYCQILBroEJR1dgiaR0_bJ7XCZ_5bWycRQEXANLEn2izXA&oe=67CDA29F" }
    },
    {
        image: "https://s3-alpha-sig.figma.com/img/448a/8901/3c680c8f6816e975708797c7193c6c44?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=oTsJDl2rOChPvRLsip80LXyyxd-Z0QDy0QoVMrApcltNVJALNEwdczxEmW8bopGFD3stzWuSmpSNepoGlOUixgkeM8nNFIhZbIXLa02TdK4fKQhMK5fyIm50hplv5qTakoZ7HeBXENrNigvqIFTG7eKCoE4pCZqq4G9YF8PwYkfee2TE7OStr-dvRfzFGBj5GQh1SQw~hii5NtZY~iY-e0jOHlsEpIQCLGmSJsiuZUfGoG3hDCHmGKBVuolEBqGJ9me~hUYSfsRdjFINcquKM62J2L5vZDof5naIveT1U9mpV0w~7TCNK2NyvKYyygCkeK7cqqkMCoFBxD~XU4JlOA__",
        title: "Beginner Adobe Illustrator For Graphic Design",
        category: "Graphic Design",
        rating: 4.5,
        price: "12,213.23",
        duration: "19h 30m",
        students: 20,
        instructor: { name: "Nhan Pham", avatar: "https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/480749832_1085842260013183_6620778893531098027_n.jpg?stp=cp6_dst-jpg_s480x480_tt6&_nc_cat=106&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHH-UxosFzudmqA8wfmZHC8CqzeNgcCHFsKrN42BwIcWwr88cP4FFVTUJ_YMePsALYeukxJdMRPH-k77Edb7g8z&_nc_ohc=SYBphlcSOugQ7kNvgHjzSbY&_nc_oc=Adhz5F98EAUPot8MKix9vzJ1b1cNcwa185gnHFobSLljE7kLIrsj2JVhBQZvN9YTK6g&_nc_zt=24&_nc_ht=scontent.fhan3-4.fna&_nc_gid=AzhbWE4WbEq_JEhDytitKZd&oh=00_AYCQILBroEJR1dgiaR0_bJ7XCZ_5bWycRQEXANLEn2izXA&oe=67CDA29F" }
    },
    {
        image: "https://s3-alpha-sig.figma.com/img/6072/cb0e/64126c2f09d6aae88ace9ebc19eaafb9?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dnz14SdMpLhb01uc~qk3fkJ0Y73rCRjeJEVF8wGa-rdvkYidV8t9gC2zdTQE2t7J4P4KkjvtK~9SGFKmdvLbakOrYfAfmZI2iSwJsU0CNmw1Mwl1mZQAIZyOIH~Df6YoG8mEuJqeJmbt0yabBozGV-izYWCbTxgjJwf0tkcSoZTqriyKgv8PR89vTCuH4PizOasInYYFBpprtIxS8Msa5W~IN5bRUVtTNgeWYSsuG6pQhiftSCcN7gRubMOi8YOlOJoaq6Qel0~EfbkrzFrfHUjip6Aak2t4gS95BItPl6LEr0lFCzR8MKSq5guSY1~YcweafshBvA3ugrQINa5ylw__",
        title: "Complete Python Bootcamp: From Zero to Hero",
        category: "Programming",
        rating: 4.8,
        price: "15,000.00",
        duration: "25h 45m",
        students: 35,
        instructor: { name: "Nhan Pham", avatar: "https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/480749832_1085842260013183_6620778893531098027_n.jpg?stp=cp6_dst-jpg_s480x480_tt6&_nc_cat=106&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHH-UxosFzudmqA8wfmZHC8CqzeNgcCHFsKrN42BwIcWwr88cP4FFVTUJ_YMePsALYeukxJdMRPH-k77Edb7g8z&_nc_ohc=SYBphlcSOugQ7kNvgHjzSbY&_nc_oc=Adhz5F98EAUPot8MKix9vzJ1b1cNcwa185gnHFobSLljE7kLIrsj2JVhBQZvN9YTK6g&_nc_zt=24&_nc_ht=scontent.fhan3-4.fna&_nc_gid=AzhbWE4WbEq_JEhDytitKZd&oh=00_AYCQILBroEJR1dgiaR0_bJ7XCZ_5bWycRQEXANLEn2izXA&oe=67CDA29F" }
    },
];

export default courses;
