const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('../database');
const nosql = require('../nosql');
//const nosql = require('../nosql');
const router = express.Router();
router.use(bodyParser.json());
router.use(cors());
/*
    -------------------------------------------------------------------------------------------------------
                                    BOOK DETAILS PAGE
    -------------------------------------------------------------------------------------------------------
    INPUT: bookid
    PROCESS : Querry the database and output all details of the book with given book id
    OUTPUT : ALL book details object {f_name,l_name,user_image,bookrating,bookReview}
*/

router.post('/', (req, res) => {
    const bookId = req.body.bookId;
    sql_query = `CREATE OR REPLACE VIEW temp AS SELECT * FROM User INNER JOIN Rating WHERE User.user_id = Rating.User_user_id;SELECT f_name, l_name, user_image, rating_value, ReviewComment FROM temp WHERE Book_book_id = '${req.body.bookId}'`;
    connection.query(sql_query, async (err, result8) => {
        if (err) { res.send(""); }
        else {
            let d = 0;
            await nosql.findOne({ 'book_id': bookId })
                .then((data) => d = data)
                .catch((err) => console.log(err));
            // if(result8[1]==null){
            //     result8[1]=[]
            // }
            console.log("d = ", d);
            if (d == null) {
                d = "";
            }
            result8[1].push(d);
            console.log("result8[1]", result8[1]);
            // console.log("d=",d);
            res.send(result8[1]);
        }
    });
});
module.exports = router;