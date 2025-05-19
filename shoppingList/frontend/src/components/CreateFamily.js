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


export default function CreateFamily({ User }) {

    const [familyMembers, setFamilyMembers] = useState([])
    const [familys, setFamilys] = useState([])
    const [nameFamily, setNameFamily] = useState('')
    const [memberFamilyName, setMemberFamilyName] = useState('')
    const [isUser, setIsUser] = useState(false);
    const [isFamilyId, setIsFamilyId] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
        if (User && User.email && User.password && User.userId && User.userName) {
            setIsUser(true);
            console.log("shelly");
            handleGetFamily();
        } else {
            setIsUser(false);
        }
    }, [User]);

    const handleGetFamily = () => {
        if (User.userId != '') {
            console.log("shelly1");
            axios.post(`http://localhost:5000/Family/UserFamily/${User.userId}`, {})
                .then(res => {
                    console.log(res.data)
                    if (res.data.success) {
                        console.log(res.data)
                        if (res.data.familyName != null) {
                            setFamilys(res.data.familyName)
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    };

    const handleCreatFamily = () => {

        if (User.userId != '' && nameFamily != '') {
            console.log("shelly1");
            axios.post(`http://localhost:5000/Family/creatFamily/${User.userId}`, { nameFamily })
                .then(res => {
                    console.log(res.data)
                    if (res.data.success) {
                        if (res.data.familyName != null) {
                            console.log("gggg", res.data);
                            let { familyId, familyName } = res.data;
                            let newFamily = {
                                familyId: familyId,
                                familyName: familyName
                            }
                            setFamilys([...familys, newFamily])
                            setNameFamily('')
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    };
    const handleGetFamilyMembers = (familyId) => {
        console.log("shelly1", familyId);

        if (User.userId != '') {

            axios.post(`http://localhost:5000/Family/familyMembers`, { familyId })
                .then(res => {
                    console.log(res.data)
                    if (res.data.success) {
                        console.log(res.data)
                        if (res.data.data != null) {
                            setFamilyMembers(res.data.data)
                            setIsFamilyId(familyId)
                            console.log(res.data.data)
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    };
    const handleDeleteFamily = (familyId) => {
        if (familyId) {
            console.log("familyId", familyId);
            const confirmDelete = window.confirm('Are you sure you want to delete this family?');

            if (confirmDelete) {
                try {
                    axios.delete(`http://localhost:5000/delteFamily/${familyId}`)
                        .then(res => {
                            setFamilys(prev => prev.filter(family => family.familyId !== familyId));
                            alert('Family deleted successfully.');
                        })
                        .catch((error) => {
                            console.error('Error deleting family:', error);
                            // alert('Failed to delete family.');
                        })
                }
                catch (error) {
                    console.error('Error deleting family:', error);
                    // alert('Failed to delete family.');
                }
            }
        }
    }
    const handleAddamilyMembers = () => {
        console.log("hhi", isFamilyId)
        if (User.userId != '' && memberFamilyName != '') {
            console.log("shelly1");
            axios.post(`http://localhost:5000/Family/addFamilyMembers/`, { email: memberFamilyName, familyId: isFamilyId })
                .then(res => {
                    console.log(res.data)
                    if (res.data.success) {
                        if (res.data != null) {
                            console.log("gggg", res.data);
                            let { role, userName } = res.data;
                            let newMember = {
                                userName: userName,
                                role: role
                            }
                            setFamilyMembers([...familyMembers, newMember])
                            setMemberFamilyName('')
                        }
                    } else {
                        console.log("dfffff")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    };





    return (<div className="familyManagementBord">
        {!isUser ? (
            <div>
                <p>No user found. Redirecting to the main page in 10 seconds...</p>
                {navigate('/')}
            </div>
        ) : <>
            <div className="Bord">
                <div className='bordMarge'>
                    <h1>Family</h1>
                    <div className='addFamilyDiv' >
                        <input className='itemInput' value={nameFamily} onChange={e => setNameFamily(e.target.value)} placeholder='Enter Name..' />
                        <div className="addFamily" onClick={handleCreatFamily} >
                            <div> Create Family </div>
                            <BsJournalPlus />
                        </div>
                    </div>
                    <div className="familys">
                        {
                            familys.map((f, index) => (
                                <ItemFamily key={index} family={f} handleGetFamilyMembers={handleGetFamilyMembers} handleDeleteFamily={handleDeleteFamily} choose={isFamilyId == f.familyId ? true : false} />))
                        }
                    </div>
                </div>
            </div>
            <div className="Bord">
                <div className='bordMarge'>
                    <h1>Members</h1>
                    <div className='addFamilyDiv' >
                        <input className='itemInput' value={memberFamilyName} onChange={e => setMemberFamilyName(e.target.value)} placeholder='Enter member email ....' />
                        <div className="addFamily" onClick={handleAddamilyMembers} >
                            <div> Add Member </div>
                            <LiaUserPlusSolid />
                        </div>

                    </div>
                    <div className="familys">
                        {
                            familyMembers?.length > 0 ? (
                                familyMembers.map((member, index) => (
                                    <MemberFamily key={index} MemberFamily={member} />
                                ))
                            ) : null
                        }
                    </div>

                </div>
            </div></>}
    </div>
    );
};