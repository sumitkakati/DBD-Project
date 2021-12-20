import React, { useState, useContext } from 'react'
import './style2.css';
import { AccountContext } from '../context/AccountProvider';
import { FunctionsContext } from '../context/FunctionsProvider';
import axios from 'axios';
import { Box, makeStyles } from '@material-ui/core';
import BookCard from '../books/BookCard';
const useStyles = makeStyles({
    CardRow: {
        display: 'flex',
        flexDirection: 'row',
        padding: '10px',
        '& > *': {
            paddingLeft: '30px',
            height: '350px',
            
        }
    }
})
const MyLists = () => {

    const [colors, setColors] = useState({ '0': 0, '1': 0, '2': 0, '3': 0, '4': 0 });
    const { account } = useContext(AccountContext);
    const { bookList2, setBookList2 } = useContext(FunctionsContext);

    const classes = useStyles();

    const handleClick = async (e) => {
        const id = e.target.id;
        const lob = {};
        let prevId = Object.keys(colors).find((key) => colors[key] == 1);
        if (prevId !== id) {
            const newColors = { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, [id]: 1 - colors[id] };
            setColors(newColors);
        }
        let bookStatus = "";
        if (id === '0') bookStatus = "Recommendations";
        else if (id === '1') bookStatus = "Wish To Read";
        else if (id === '2') bookStatus = "Currently Reading";
        else if (id === '3') bookStatus = "Finished Reading";
        else bookStatus = "Wish To Re-Read";

        const details = {
            e_mail: account.e_mail,
            bookStatus: bookStatus
        }
        console.log(details);
        await axios.post('http://localhost:3002/status', details)
            .then((res) => {
                if (res.data.length === 0) alert("No books match your search !!!");
                for (let i = 0; i < res.data[0].length; i++) {
                    lob[res.data[0][i]['book_id']] = {
                        "authorName": res.data[0][i]['author_name'],
                        "bookName": res.data[0][i]['book_name'],
                        "cover": res.data[0][i]['thumbnail'],
                        "avg_rating": res.data[0][i]['AverageRating']
                    }
                }
                console.log(res.data);
                setBookList2(lob);
            })
            .catch(err => console.log(err));
    }
    return (
        <div className="container" >
            <div className="categories">
                <div id='0' className={colors[0] == 0 ? 'buttonPurple' : 'buttonRed'} onClick={handleClick}> Recommendations</div>
                <div id='1' className={colors[1] == 0 ? 'buttonPurple' : 'buttonRed'} onClick={handleClick} >Wish To Read</div>
                <div id='2' className={colors[2] == 0 ? 'buttonPurple' : 'buttonRed'} onClick={handleClick} >Currently Reading</div>
                <div id='3' className={colors[3] == 0 ? 'buttonPurple' : 'buttonRed'} onClick={handleClick} >Finished Reading</div>
                <div id='4' className={colors[4] == 0 ? 'buttonPurple' : 'buttonRed'} onClick={handleClick} >Wish To Re-Read</div>
            </div>
            <div className="display-side">
                <Box className={classes.CardRow}>
                    {
                        Object.entries(bookList2).map((book) => (
                            <div>
                                <BookCard id={book[0]} name={book[1]['bookName']} author={book[1]['authorName']} cover={book[1]['cover']} avg_rating={book[1]['avg_rating']} />
                            </div>
                        ))
                    }
                </Box>
            </div>
        </div>
    )
}

export default MyLists
