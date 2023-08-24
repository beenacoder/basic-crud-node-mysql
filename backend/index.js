import express from "express"; //To use "import" we need to put a type: module in the package.json file
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

//CONNECT to the database
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "root123",
    database: "testingsql"
});

app.get('/', (req, res) => {
    res.json("This is the home page")
})

//GET all the books from the database
app.get('/books', (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q,(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

//CREATE new books
app.post("/books", (req, res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];
    db.query(q, [values], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Book has been added to the database");
    });
});

//DELETE a book by Id
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q, [bookId], (err, data) => {
        if(err) return res.json(err);
        return res.json("Book deleted successfully");
    })
});

//UPDATE a book by Id
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ?, WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [...values, bookId], (err, data) => {
        if(err) return res.json(err);
        return res.json("The book has been updated successfully");
    })
});



app.listen(8080, () => {
    console.log("backend connected");
})