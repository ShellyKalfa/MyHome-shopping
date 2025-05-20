import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//compents
import ItemFamily from './ItemFamily';
import MemberFamily from './MemberFamily';
//style
import { BsJournalPlus } from "react-icons/bs";
import { LiaUserPlusSolid } from "react-icons/lia";
import "../style/CreateFamily.css"


export default  function CreateFamily({User}) {

    const [familyMembers,setFamilyMembers]=useState({name:"Home",members:["Tali","shelly","ayala"]})
    const [familys,setFamilys]=useState([])
    const [nameFamliy,setNameFamliy]=useState('')
    const [memberFamilyName,setMemberFamilyName]=useState('')
    const [isUser, setIsUser] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (User && User.email && User.password && User.userId && User.userName) {
                setIsUser(true);
                console.log("shelly");
                handleGetFamliy();
        } else {
                setIsUser(false);
        }
    }, [User]);
    const  handleGetFamliy= () => {
        if(User.userId !='' )
        {
            console.log("shelly1");
            axios.post(`http://localhost:5001/memberFamliy/${User.userId}`,{})
                    .then(res => {
                        console.log(res.data)
                    if(res.data.success){
                        console.log(res.data.familyName)
                        if(res.data.familyName!=null){
                            setFamilys(res.data.familyName)
                        }
                    }
                    })
                    .catch(err => { 
                        console.log(err)
                    })
            }};
    const  handleCreatFamliy= () => {

        if(User.userId !=''&& nameFamliy !='')
        {
            console.log("shelly1");
            axios.post(`http://localhost:5001/creatFamliy/${User.userId}`,{nameFamliy })
                    .then(res => {
                        console.log(res.data)
                    if(res.data.success){
                        if(res.data.familyName!=null){
                             console.log("gggg",res.data);
                             let {familyId,familyName}=res.data;
                             let newFamliy={
                                familyId:familyId,
                                familyName:familyName
                             }
                            setFamilys([...familys,newFamliy])
                            setNameFamliy('')
                        }
                    }
                    })
                    .catch(err => { 
                        console.log(err)
                    })
            }};





    return (<div className="familyManagementBord">
                {!isUser ?(
        <div>
          <p>No user found. Redirecting to the main page in 10 seconds...</p>
          {navigate('/')}
        </div>
      ) :<>
                <div className="Bord">
                    <div className='bordMarge'>
                            <h1>Family</h1>
                            <div className='addFamilyDiv' >
                                    <input className='itemInput' value={nameFamliy}  onChange={e =>setNameFamliy(e.target.value)} placeholder='Enter Name..'/>
                                    <div className="addFamily" onClick={handleCreatFamliy} >
                                            <div> Create Family </div>
                                            <BsJournalPlus />
                                        </div>
                            </div>
                            <div className="familys">
                                {
                                    familys.map((f, index) => (
                                        <ItemFamily key={index} family={f.familyName} /> ))
                                }
                            </div>
                    </div>
                </div>
                <div className="Bord">
                    <div className='bordMarge'>
                        <h1>Members</h1> 
                        <div className='addFamilyDiv' >
                            <input className='itemInput'value={memberFamilyName}  onChange={e =>setMemberFamilyName(e.target.value)}   placeholder='Enter member email address....'/>
                            <div className="addFamily" >
                                    <div> Add Member </div>
                                    <LiaUserPlusSolid />
                                </div>
                            
                        </div>
                                    <div className="familys">
                                        {/* {
                                            family.members.map((member, index) => (
                                                <MemberFamily key={index} MemberFamily={member} /> ))
                                        } */}
                                    </div>

                        </div>
                </div></>}
            </div> 
        );
};