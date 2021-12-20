import React, {useContext} from 'react'
import { FunctionsContext } from './context/FunctionsProvider';
import NavBar from './NavBar';
import Books from './books/Books';
import SingleBook from './books/SingleBook';
import MyLists from './lists/MyLists';
import { AccountContext } from './context/AccountProvider';

const Home = () => {
    const {books,bookId} = useContext(FunctionsContext);
    const {account} = useContext(AccountContext);
    return (
        <div >
            <div>
                {
                account? null :
                <img style ={{width:"100vw",height:'100vh',overflow:'hidden'}}src="https://compote.slate.com/images/a92fef3e-c1db-4cbf-93da-dae90c0b9388.jpeg?width=1200&rect=4395x2930&offset=0x0" alt="HOME PAGE" />
                }
                <NavBar/>
            </div>
            <div style={{paddingTop:'50px'}}>
            {account ? books ? Object.keys(bookId).length !== 0 ? <SingleBook /> : <Books/> : <MyLists/> : null}
            </div>
        </div>
    )
}

export default Home
