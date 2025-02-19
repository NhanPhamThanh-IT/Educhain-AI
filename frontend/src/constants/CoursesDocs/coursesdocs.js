const courses = [
    {
        image: "https://s3-alpha-sig.figma.com/img/4c09/d512/80a4a59d1d1b735e03f6ddafe259f2ff?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fRf7a0YJFuxghCvxw8yOVVwdnD-IU72y72ibuVWq0ulMXPCUEWRDjq1Dg3iSsFLlqkXznigwJBRd89ZMEim5H1XDS7nqQpqcAhPTx3WF0uswvvAgxfPq6Y7Fe8lRfUlg4lmHnSXshevQcUq-yyGmJs8xDNfnAB6gCvnXGc6JB9NPBQABuB218aQy1QEwmaUxXGMbTp1SqR2rv9yaInMSeElu5LKoSBfujtLxGUK8cqzOTUdHLFQttb-pP8c4KHDLTxleuaTpp9gTO66DWtV0~~D2-gMe7HH2DJzZl27xY15y-6pcBxmGPN-h2rJyeeRHgZOcEUqx2Tvsnib5WPlKrQ__",
        title: "IT Statistics Data Science And Business Analysis",
        category: "Digital Marketing",
        rating: 4.5,
        price: "12,213.23",
        duration: "19h 30m",
        students: 20,
        instructor: { name: "Samantha", avatar: "https://via.placeholder.com/40" }
    },
    {
        image: "https://s3-alpha-sig.figma.com/img/4c09/d512/80a4a59d1d1b735e03f6ddafe259f2ff?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fRf7a0YJFuxghCvxw8yOVVwdnD-IU72y72ibuVWq0ulMXPCUEWRDjq1Dg3iSsFLlqkXznigwJBRd89ZMEim5H1XDS7nqQpqcAhPTx3WF0uswvvAgxfPq6Y7Fe8lRfUlg4lmHnSXshevQcUq-yyGmJs8xDNfnAB6gCvnXGc6JB9NPBQABuB218aQy1QEwmaUxXGMbTp1SqR2rv9yaInMSeElu5LKoSBfujtLxGUK8cqzOTUdHLFQttb-pP8c4KHDLTxleuaTpp9gTO66DWtV0~~D2-gMe7HH2DJzZl27xY15y-6pcBxmGPN-h2rJyeeRHgZOcEUqx2Tvsnib5WPlKrQ__",
        title: "Beginner Adobe Illustrator For Graphic Design",
        category: "Graphic Design",
        rating: 4.5,
        price: "12,213.23",
        duration: "19h 30m",
        students: 20,
        instructor: { name: "Charles", avatar: "https://via.placeholder.com/40" }
    },
    {
        image: "https://s3-alpha-sig.figma.com/img/4c09/d512/80a4a59d1d1b735e03f6ddafe259f2ff?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fRf7a0YJFuxghCvxw8yOVVwdnD-IU72y72ibuVWq0ulMXPCUEWRDjq1Dg3iSsFLlqkXznigwJBRd89ZMEim5H1XDS7nqQpqcAhPTx3WF0uswvvAgxfPq6Y7Fe8lRfUlg4lmHnSXshevQcUq-yyGmJs8xDNfnAB6gCvnXGc6JB9NPBQABuB218aQy1QEwmaUxXGMbTp1SqR2rv9yaInMSeElu5LKoSBfujtLxGUK8cqzOTUdHLFQttb-pP8c4KHDLTxleuaTpp9gTO66DWtV0~~D2-gMe7HH2DJzZl27xY15y-6pcBxmGPN-h2rJyeeRHgZOcEUqx2Tvsnib5WPlKrQ__",
        title: "Complete Python Bootcamp: From Zero to Hero",
        category: "Programming",
        rating: 4.8,
        price: "15,000.00",
        duration: "25h 45m",
        students: 35,
        instructor: { name: "John Doe", avatar: "https://via.placeholder.com/40" }
    },
    {
        image: "https://s3-alpha-sig.figma.com/img/4c09/d512/80a4a59d1d1b735e03f6ddafe259f2ff?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fRf7a0YJFuxghCvxw8yOVVwdnD-IU72y72ibuVWq0ulMXPCUEWRDjq1Dg3iSsFLlqkXznigwJBRd89ZMEim5H1XDS7nqQpqcAhPTx3WF0uswvvAgxfPq6Y7Fe8lRfUlg4lmHnSXshevQcUq-yyGmJs8xDNfnAB6gCvnXGc6JB9NPBQABuB218aQy1QEwmaUxXGMbTp1SqR2rv9yaInMSeElu5LKoSBfujtLxGUK8cqzOTUdHLFQttb-pP8c4KHDLTxleuaTpp9gTO66DWtV0~~D2-gMe7HH2DJzZl27xY15y-6pcBxmGPN-h2rJyeeRHgZOcEUqx2Tvsnib5WPlKrQ__",
        title: "IT Statistics Data Science And Business Analysis",
        category: "Digital Marketing",
        rating: 4.5,
        price: "12,213.23",
        duration: "19h 30m",
        students: 20,
        instructor: { name: "Samantha", avatar: "https://via.placeholder.com/40" }
    },
    {
        image: "https://s3-alpha-sig.figma.com/img/4c09/d512/80a4a59d1d1b735e03f6ddafe259f2ff?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fRf7a0YJFuxghCvxw8yOVVwdnD-IU72y72ibuVWq0ulMXPCUEWRDjq1Dg3iSsFLlqkXznigwJBRd89ZMEim5H1XDS7nqQpqcAhPTx3WF0uswvvAgxfPq6Y7Fe8lRfUlg4lmHnSXshevQcUq-yyGmJs8xDNfnAB6gCvnXGc6JB9NPBQABuB218aQy1QEwmaUxXGMbTp1SqR2rv9yaInMSeElu5LKoSBfujtLxGUK8cqzOTUdHLFQttb-pP8c4KHDLTxleuaTpp9gTO66DWtV0~~D2-gMe7HH2DJzZl27xY15y-6pcBxmGPN-h2rJyeeRHgZOcEUqx2Tvsnib5WPlKrQ__",
        title: "Beginner Adobe Illustrator For Graphic Design",
        category: "Graphic Design",
        rating: 4.5,
        price: "12,213.23",
        duration: "19h 30m",
        students: 20,
        instructor: { name: "Charles", avatar: "https://via.placeholder.com/40" }
    },
    {
        image: "https://s3-alpha-sig.figma.com/img/4c09/d512/80a4a59d1d1b735e03f6ddafe259f2ff?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fRf7a0YJFuxghCvxw8yOVVwdnD-IU72y72ibuVWq0ulMXPCUEWRDjq1Dg3iSsFLlqkXznigwJBRd89ZMEim5H1XDS7nqQpqcAhPTx3WF0uswvvAgxfPq6Y7Fe8lRfUlg4lmHnSXshevQcUq-yyGmJs8xDNfnAB6gCvnXGc6JB9NPBQABuB218aQy1QEwmaUxXGMbTp1SqR2rv9yaInMSeElu5LKoSBfujtLxGUK8cqzOTUdHLFQttb-pP8c4KHDLTxleuaTpp9gTO66DWtV0~~D2-gMe7HH2DJzZl27xY15y-6pcBxmGPN-h2rJyeeRHgZOcEUqx2Tvsnib5WPlKrQ__",
        title: "Complete Python Bootcamp: From Zero to Hero",
        category: "Programming",
        rating: 4.8,
        price: "15,000.00",
        duration: "25h 45m",
        students: 35,
        instructor: { name: "John Doe", avatar: "https://via.placeholder.com/40" }
    },
];

export default courses;
