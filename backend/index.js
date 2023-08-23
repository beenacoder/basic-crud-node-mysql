import express from "express"; //To use "import" we need to put a type: module in the package.json file
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

//Connecting to the database
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "root123",
    database: "testingsql"
});

app.get('/', (req, res) => {
    res.json("This is the home page")
})

//getting all the books from the database
app.get('/books', (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q,(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

//Insert new books
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
        return res.json("Data cambio");
    });
});

//Deleting a book by Id
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q, [bookId], (err, data) => {
        if(err) return res.json(err);
        return res.json("Data borro");
    })
});



app.listen(8080, () => {
    console.log("backend connected");
})