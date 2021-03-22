import React, { useState ,useEffect} from "react";
// import data from "./data.json";
import Fuse from "fuse.js";
import Item from "./item";
import axios from 'axios';
const SettingsPage = () => {

  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
const url='https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
const url2='https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty';
const url3='https://hacker-news.firebaseio.com/v0/updates.json?print=pretty';
const url4='https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty';
const url5='https://hacker-news.firebaseio.com/v0/updates.json?print=pretty';

  useEffect(()=>{
    async function myfin(url){
      try{
        const res=await axios.get(url) 
        res.data.forEach(async (r)=>{
          const returnData=await axios.get('https://hacker-news.firebaseio.com/v0/item/'+r+'.json?print=pretty')
              data.push(returnData.data)
        setData([...data])
      
        })
      
       
       }
       catch(e){
           console.log("Error:"+e)
       }
    }
    myfin(url);
  
    myfin(url2);
    myfin(url3);

   
  },[]);
  const jobFilter=()=>{
    let filterval=data.filter((x)=>{
      return x.type==='job'
    })
    setSearchData(filterval)
  }
  const storyFilter=()=>{
    let filterval=data.filter((x)=>{
      return x.type==='story'
    })
    setSearchData(filterval)
  }
  const pollFilter=()=>{
    let filterval=data.filter((x)=>{
      return x.type==='poll'
    })
    setSearchData(filterval)
  }
  const pollOutFilter=()=>{
    let filterval=data.filter((x)=>{
      return x.type==='pollopt'
    })
    setSearchData(filterval)
  }
  const CommentFilter=()=>{
    let filterval=data.filter((x)=>{
      return x.type==='comment'
    })
    setSearchData(filterval)
  }
  const searchItem = (query) => {
    if (!query) {
      setSearchData(data);
      return;
    }
    const fuse = new Fuse(data, {
      keys: ["by", "title","type","url"]
    });
    const result = fuse.search(query);
    const finalResult = [];
    if (result.length) {
      result.forEach((item) => {
        finalResult.push(item.item);
      });
      setSearchData(finalResult);
    } else {
      setSearchData([]);
    }
  };
  return (
    <div>
      <div className="center">
      <div className="a">
      <p className="title"> Search Values</p>
      <div className="search-container">
        <input
          type="search"
          onChange={(e) => searchItem(e.target.value)}
          placeholder="Search "
        />
      </div>
      </div>
      <span>
      <div className="a">
      <div className="dropdown">
  <button className="dropbtn">Filter</button>
  <div className="dropdown-content">
  <a href="#" onClick={jobFilter}>job</a>
  <a href="#" onClick={storyFilter}>story</a>
  <a href="#" onClick={CommentFilter}>comment</a>
  <a href="#" onClick={pollFilter}>poll</a>
  <a href="#" onClick={pollOutFilter}>pollopt</a>
  </div>
  </div>
</div>
</span>
      </div>

      <div className="item-container">
        { searchData.length!=0&&
        searchData.map((item) => (
          <Item {...item} key={item.name} />
        )) }
     
        {searchData.length==0&&
        data.map((item) => (
          <Item {...item} key={item.name} />
        ))

        }
      </div>
    </div>
  );
};

export default SettingsPage;
