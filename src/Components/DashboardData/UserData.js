import { useEffect, useMemo, useState } from "react";
import WalletConnect from "../WalletConnect";
import moment from 'moment';
import { getAllTransactionByWallet } from './../../API/Polygon';
import DataTable from "../Basic/DataTable";
import Cookies from "universal-cookie";

const UserData = (props) => {
    const {type , icon , title , unit , value} = props;
    console.log(type)
    const [data , setData] = useState([]);
    const [apiCall , setApiCall] = useState(true);

    const Cookie = new Cookies();
    const add = Cookie.get('address');
    
    useEffect(()=> {
        if(apiCall && type === 'table'){
            walletTrans(add);
            setApiCall(false)
        }
    }, [])

    const columns = useMemo(
        () => [
              {
                Header: 'Txn Hash',
                accessor: 'txnHash',
              },
              {
                Header: 'From',
                accessor: 'from',
              },
              {
                Header: 'To',
                accessor: 'to',
              },
              {
                Header: 'Volume',
                accessor: 'volume',
              },
              {
                Header: 'Date',
                accessor: 'date',
              },
            ],
        []
      )
    
     
      const walletTrans = (address) => {
        getAllTransactionByWallet (address).then(res=> {
            const t = [];
            res.data.result.map((item) => {
                const n = moment.unix(item.timeStamp);
                const row = {
                    'txnHash' : <a href={`https://polygonscan.com/tx/${item.hash}`} target='_blank'> {item.hash.substring(0 , 30)}... </a>,
                    'from' :`${item.from.substring(0,8)} .... ${item.from.substring(item.from.length - 9,item.from.length - 1)}`, 
                    'to' : `${item.to.substring(0,8)} .... ${item.to.substring(item.to.length - 9,item.to.length - 1)}`,
                    'volume' : item.value/Math.pow(10,18),
                    'date' : moment(n).format("DD.MM.YYYY hh:MM")
                }
                t.push(row);
            })
            
            setData(t);
            setApiCall(false)
        }).catch(err => {
            console.error(err);
        })
    }


    if(type === 'common'){
        return(
            <div className="dashboardUserData">
                <img src={icon} />
                <span className="title"> {title} : </span>
                <span className="value"> {value} </span>
                <span className="unit"> {unit} </span>
            </div>
        )
    }

    if(type === 'address'){
        return(
            <div className="dashboardUserData">
                <img src={icon} />
                <span className="title"> {title} : </span>
                <WalletConnect purpose={'address'} />
                <span className="unit"> {unit} </span>
            </div>
        )
    }

    if(type !== 'table'){
        return(
            <div className="dashboardUserData">
                <img src={icon} />
                <span className="title"> {title} : </span>
                {type === 'balance' && <WalletConnect purpose={'balance'} />} {type === "value" && ( <span> 0.0376 </span> )}
                <span className="unit"> {unit} </span>
            </div>
        )
    }
   

    

    return(
        <div className="userTransaction">
            <div className="dashboardUserData">
                <img src={icon} />
                <span className="title"> {title} : </span>
                <span>{add === undefined  ? 'All Lively Contract Transactions' :  'Your Wallet Transactions' }  </span>  
            </div>
            <DataTable columns={columns} data={data}/>
        </div>
    )
    
}

export default UserData;