import React, {useContext, useEffect} from 'react'
import { FunctionsContext } from './context/FunctionsProvider';
import NavBar from './NavBar';
import Books from './books/Books';
import SingleBook from './books/SingleBook';
import MyLists from './lists/MyLists';
import { AccountContext } from './context/AccountProvider';

import alanBtn from '@alan-ai/alan-sdk-web';
const alanKey = 'd203aaba1a1cba6bceb0628bd7cc27c92e956eca572e1d8b807a3e2338fdd0dc/stage';
const Home = () => {
    //const {books,bookId} = useContext(FunctionsContext);
    //const {account} = useContext(AccountContext);


    const {books,bookId} = useContext(FunctionsContext);
    const {account} = useContext(AccountContext);
    const {setAccount,setProfile,setOpenLogin,setOpenSignup} = useContext(AccountContext);
    const {searchBooks,setBooks,setPage,setBookId,setSearchBooks} = useContext(FunctionsContext);
 
    useEffect(()=>{
        alanBtn({
            key: alanKey,
            onCommand: ({command,searchValue}) =>{
               if(command === 'book_name'){
                    console.log('book name searched : ',searchValue);
                    setSearchBooks({
                        ...searchBooks,
                        'bookName' : searchValue,
                        'authorName':null,
                        'categories':[],
                        'filterRating':null
                    });
                    const book = "opening book" + searchValue;
                    //alanBtn().playText('Opening...');
                    console.log(searchBooks);
               }
               else if(command === 'author_name'){
                    console.log('author name searched : ',searchValue);
                    setSearchBooks({
                        ...searchBooks,
                        'bookName' : null,
                        'authorName': searchValue,
                        'categories':[],
                        'filterRating':null
                    });
                    console.log(searchBooks);
               }
               else if(command === 'category_names'){
                    console.log('category searched : ',searchValue);
                    const categories = searchValue.split(' ');
                    setSearchBooks({
                        ...searchBooks,
                        'bookName' : null,
                        'authorName': null,
                        'categories':categories,
                        'filterRating':null
                    });
                    console.log(searchBooks);
               }
               else if(command === 'logout'){
                    setAccount(null);
                    setProfile(false);
                    setBookId({});
                    setSearchBooks({});
                    setPage(0);
                    setBooks(true);
                    setOpenSignup(false);
                    setOpenLogin(false);
                }
            }
        })
    },[])



    return (
        <div >
            <div>
                {
                account? null :
                <img style ={{width:"100vw",height:'100vh',overflow:'hidden'}}src="https://compote.slate.com/images/a92fef3e-c1db-4cbf-93da-dae90c0b9388.jpeg?width=1200&rect=4395x2930&offset=0x0" alt="HOME PAGE" />
                }
                <NavBar/>
            </div>
            <div style={{paddingTop:'40px'}}>
            {account ? books ? Object.keys(bookId).length !== 0 ? <SingleBook /> : <Books/> : <MyLists/> : null}
            </div>
        </div>
    )
}

export default Home
