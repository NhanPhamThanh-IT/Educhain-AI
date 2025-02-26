const courses = [
    {
        id: 1,
        image: "https://s3-alpha-sig.figma.com/img/dfd1/4f5a/2a1b8774ac452db1e2b7551ba9f4f9f2?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ic00Mbbq6S2Qh~VI1UMW0MqMtqmCF5HCxHnLMYEX86C~~JNTxZf2kfYgcD~cfe~xB7n8oatAp-f2rNU~cQWf5~tgv~k5ZwOL70N4Ry~iknvO4otqyc3HgUI~IDbuV4aYBlU1tId1QWGUHKlGIpcHxI9ja-mq~ykDHji9fU2MXDET~olpTRHysEZ6pWJsPWlqkxq2dwoaBAhnZq1hmGnoPJM8DFw8gFmE7RWIqtgIxHguydUkQsNihkCaLgZbE6WUl3XtrDm0H~-RH5zpumV4M1Uyt4L-N81SVyQ4zkUw1NfltnYijkIIiJg7zr-UBN07S-xxGIDcDTSg89rQXFNrFA__",
        author: "John Smith",
        title: "VBI Web Design Tutorial",
        price: "40,213,222.11",
        description: "Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.",
    },
    {
        id: 2,
        image: "https://s3-alpha-sig.figma.com/img/dfd1/4f5a/2a1b8774ac452db1e2b7551ba9f4f9f2?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ic00Mbbq6S2Qh~VI1UMW0MqMtqmCF5HCxHnLMYEX86C~~JNTxZf2kfYgcD~cfe~xB7n8oatAp-f2rNU~cQWf5~tgv~k5ZwOL70N4Ry~iknvO4otqyc3HgUI~IDbuV4aYBlU1tId1QWGUHKlGIpcHxI9ja-mq~ykDHji9fU2MXDET~olpTRHysEZ6pWJsPWlqkxq2dwoaBAhnZq1hmGnoPJM8DFw8gFmE7RWIqtgIxHguydUkQsNihkCaLgZbE6WUl3XtrDm0H~-RH5zpumV4M1Uyt4L-N81SVyQ4zkUw1NfltnYijkIIiJg7zr-UBN07S-xxGIDcDTSg89rQXFNrFA__",
        author: "Emily Johnson",
        title: "UI/UX Design",
        price: "40,213,222.11",
        description: "Master the art of creating intuitive user interfaces (UI) and enhancing user experiences (UX). Learn design principles, wireframing, prototyping, and usability testing techniques.",
    },
    {
        id: 3,
        image: "https://s3-alpha-sig.figma.com/img/dfd1/4f5a/2a1b8774ac452db1e2b7551ba9f4f9f2?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ic00Mbbq6S2Qh~VI1UMW0MqMtqmCF5HCxHnLMYEX86C~~JNTxZf2kfYgcD~cfe~xB7n8oatAp-f2rNU~cQWf5~tgv~k5ZwOL70N4Ry~iknvO4otqyc3HgUI~IDbuV4aYBlU1tId1QWGUHKlGIpcHxI9ja-mq~ykDHji9fU2MXDET~olpTRHysEZ6pWJsPWlqkxq2dwoaBAhnZq1hmGnoPJM8DFw8gFmE7RWIqtgIxHguydUkQsNihkCaLgZbE6WUl3XtrDm0H~-RH5zpumV4M1Uyt4L-N81SVyQ4zkUw1NfltnYijkIIiJg7zr-UBN07S-xxGIDcDTSg89rQXFNrFA__",
        author: "Michael Brown",
        title: "Advanced CSS Techniques",
        price: "40,213,222.11",
        description: "Explore advanced CSS techniques and methodologies to build modern, responsive, and visually stunning web applications.",
    },
    {
        id: 4,
        image: "https://s3-alpha-sig.figma.com/img/dfd1/4f5a/2a1b8774ac452db1e2b7551ba9f4f9f2?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ic00Mbbq6S2Qh~VI1UMW0MqMtqmCF5HCxHnLMYEX86C~~JNTxZf2kfYgcD~cfe~xB7n8oatAp-f2rNU~cQWf5~tgv~k5ZwOL70N4Ry~iknvO4otqyc3HgUI~IDbuV4aYBlU1tId1QWGUHKlGIpcHxI9ja-mq~ykDHji9fU2MXDET~olpTRHysEZ6pWJsPWlqkxq2dwoaBAhnZq1hmGnoPJM8DFw8gFmE7RWIqtgIxHguydUkQsNihkCaLgZbE6WUl3XtrDm0H~-RH5zpumV4M1Uyt4L-N81SVyQ4zkUw1NfltnYijkIIiJg7zr-UBN07S-xxGIDcDTSg89rQXFNrFA__",
        author: "Sarah Lee",
        title: "JavaScript for Beginners",
        price: "40,213,222.11",
        description: "Learn the fundamentals of JavaScript, the most popular programming language for web development. Understand key concepts and build interactive web applications.",
    },
    {
        id: 5,
        image: "https://s3-alpha-sig.figma.com/img/dfd1/4f5a/2a1b8774ac452db1e2b7551ba9f4f9f2?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ic00Mbbq6S2Qh~VI1UMW0MqMtqmCF5HCxHnLMYEX86C~~JNTxZf2kfYgcD~cfe~xB7n8oatAp-f2rNU~cQWf5~tgv~k5ZwOL70N4Ry~iknvO4otqyc3HgUI~IDbuV4aYBlU1tId1QWGUHKlGIpcHxI9ja-mq~ykDHji9fU2MXDET~olpTRHysEZ6pWJsPWlqkxq2dwoaBAhnZq1hmGnoPJM8DFw8gFmE7RWIqtgIxHguydUkQsNihkCaLgZbE6WUl3XtrDm0H~-RH5zpumV4M1Uyt4L-N81SVyQ4zkUw1NfltnYijkIIiJg7zr-UBN07S-xxGIDcDTSg89rQXFNrFA__",
        author: "David White",
        title: "ReactJS Masterclass",
        price: "40,213,222.11",
        description: "Dive deep into ReactJS, learn component-based architecture, state management, and hooks to build modern web applications.",
    },
    {
        id: 6,
        image: "https://s3-alpha-sig.figma.com/img/dfd1/4f5a/2a1b8774ac452db1e2b7551ba9f4f9f2?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ic00Mbbq6S2Qh~VI1UMW0MqMtqmCF5HCxHnLMYEX86C~~JNTxZf2kfYgcD~cfe~xB7n8oatAp-f2rNU~cQWf5~tgv~k5ZwOL70N4Ry~iknvO4otqyc3HgUI~IDbuV4aYBlU1tId1QWGUHKlGIpcHxI9ja-mq~ykDHji9fU2MXDET~olpTRHysEZ6pWJsPWlqkxq2dwoaBAhnZq1hmGnoPJM8DFw8gFmE7RWIqtgIxHguydUkQsNihkCaLgZbE6WUl3XtrDm0H~-RH5zpumV4M1Uyt4L-N81SVyQ4zkUw1NfltnYijkIIiJg7zr-UBN07S-xxGIDcDTSg89rQXFNrFA__",
        author: "Emma Watson",
        title: "Python for Data Science",
        price: "40,213,222.11",
        description: "Learn Python programming for data science, covering pandas, NumPy, machine learning, and visualization techniques.",
    }
];

export default courses;