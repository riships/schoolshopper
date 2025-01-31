import fs from 'fs';

let data = [
    {
        "invoiceNumber": "INV-1001",
        "invoiceDate": "2024-01-01",
        "dueDate": "2024-01-10",
        "amount": 500,
        "status": "unpaid",
        "customer": "65f1a2b3c4d5e6f7890a1234"
    },
    {
        "invoiceNumber": "INV-1002",
        "invoiceDate": "2024-01-05",
        "dueDate": "2024-01-15",
        "amount": 750,
        "status": "paid",
        "customer": "65f1a2b3c4d5e6f7890a1235"
    },
    {
        "invoiceNumber": "INV-1003",
        "invoiceDate": "2024-01-10",
        "dueDate": "2024-01-20",
        "amount": 300,
        "status": "unpaid",
        "customer": "65f1a2b3c4d5e6f7890a1236"
    },
    {
        "invoiceNumber": "INV-1004",
        "invoiceDate": "2024-01-15",
        "dueDate": "2024-01-25",
        "amount": 1200,
        "status": "paid",
        "customer": "65f1a2b3c4d5e6f7890a1237"
    },
    {
        "invoiceNumber": "INV-1005",
        "invoiceDate": "2024-01-20",
        "dueDate": "2024-01-30",
        "amount": 950,
        "status": "unpaid",
        "customer": "65f1a2b3c4d5e6f7890a1238"
    },
    {
        "invoiceNumber": "INV-1006",
        "invoiceDate": "2024-01-22",
        "dueDate": "2024-02-01",
        "amount": 600,
        "status": "paid",
        "customer": "65f1a2b3c4d5e6f7890a1239"
    },
    {
        "invoiceNumber": "INV-1007",
        "invoiceDate": "2024-02-01",
        "dueDate": "2024-02-10",
        "amount": 400,
        "status": "unpaid",
        "customer": "65f1a2b3c4d5e6f7890a1240"
    },
    {
        "invoiceNumber": "INV-1008",
        "invoiceDate": "2024-02-05",
        "dueDate": "2024-02-15",
        "amount": 850,
        "status": "paid",
        "customer": "65f1a2b3c4d5e6f7890a1241"
    },
    {
        "invoiceNumber": "INV-1009",
        "invoiceDate": "2024-02-10",
        "dueDate": "2024-02-20",
        "amount": 700,
        "status": "unpaid",
        "customer": "65f1a2b3c4d5e6f7890a1242"
    },
    {
        "invoiceNumber": "INV-1010",
        "invoiceDate": "2024-02-15",
        "dueDate": "2024-02-25",
        "amount": 950,
        "status": "paid",
        "customer": "65f1a2b3c4d5e6f7890a1243"
    },
    {
        "invoiceNumber": "INV-1011",
        "invoiceDate": "2024-02-20",
        "dueDate": "2024-02-28",
        "amount": 300,
        "status": "unpaid",
        "customer": "65f1a2b3c4d5e6f7890a1244"
    },
    {
        "invoiceNumber": "INV-1012",
        "invoiceDate": "2024-03-01",
        "dueDate": "2024-03-10",
        "amount": 1100,
        "status": "paid",
        "customer": "65f1a2b3c4d5e6f7890a1245"
    },
    {
        "invoiceNumber": "INV-1013",
        "invoiceDate": "2024-03-05",
        "dueDate": "2024-03-15",
        "amount": 500,
        "status": "unpaid",
        "customer": "65f1a2b3c4d5e6f7890a1246"
    },
    {
        "invoiceNumber": "INV-1014",
        "invoiceDate": "2024-03-10",
        "dueDate": "2024-03-20",
        "amount": 650,
        "status": "paid",
        "customer": "65f1a2b3c4d5e6f7890a1247"
    },
    {
        "invoiceNumber": "INV-1015",
        "invoiceDate": "2024-03-15",
        "dueDate": "2024-03-25",
        "amount": 850,
        "status": "unpaid",
        "customer": "65f1a2b3c4d5e6f7890a1248"
    },
    {
        "invoiceNumber": "INV-1016",
        "invoiceDate": "2024-03-20",
        "dueDate": "2024-03-30",
        "amount": 400,
        "status": "paid",
        "customer": "65f1a2b3c4d5e6f7890a1249"
    },
    {
        "invoiceNumber": "INV-1017",
        "invoiceDate": "2024-03-25",
        "dueDate": "2024-04-05",
        "amount": 750,
        "status": "unpaid",
        "customer": "65f1a2b3c4d5e6f7890a1250"
    },
    {
        "invoiceNumber": "INV-1018",
        "invoiceDate": "2024-04-01",
        "dueDate": "2024-04-10",
        "amount": 600,
        "status": "paid",
        "customer": "65f1a2b3c4d5e6f7890a1251"
    },
    {
        "invoiceNumber": "INV-1019",
        "invoiceDate": "2024-04-05",
        "dueDate": "2024-04-15",
        "amount": 950,
        "status": "unpaid",
        "customer": "65f1a2b3c4d5e6f7890a1252"
    },
    {
        "invoiceNumber": "INV-1020",
        "invoiceDate": "2024-04-10",
        "dueDate": "2024-04-20",
        "amount": 500,
        "status": "paid",
        "customer": "65f1a2b3c4d5e6f7890a1253"
    }
]

data.map((elem) => {
    elem.invoiceDate = new Date(elem.invoiceDate);
    elem.dueDate = new Date(elem.dueDate);
})

fs.writeFileSync('./documnet.json', JSON.stringify(data));


