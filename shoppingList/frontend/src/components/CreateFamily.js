import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import ItemFamily from './ItemFamily';
import MemberFamily from './MemberFamily';
import { BsJournalPlus } from "react-icons/bs";
import { LiaUserPlusSolid } from "react-icons/lia";

// API
import {
    getUserFamilies,
    createFamily,
    getFamilyMembers,
    addFamilyMember,
    deleteFamilyMember,
    updateFamilyMember,
    deleteFamily
} from '../api/family';

// Styles
import '../style/CreateFamily.css';

export default function CreateFamily({ User,setFamilysApp }) {
    const [families, setFamilies] = useState([]);
    const [familyMembers, setFamilyMembers] = useState([]);
    const [selectedFamilyId, setSelectedFamilyId] = useState('');
    const [newFamilyName, setNewFamilyName] = useState('');
    const [newMemberEmail, setNewMemberEmail] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (!User?.userId) {
            navigate('/', { replace: true });
            return;
        }

        loadUserFamilies();
    }, [User]);

    useEffect(() => {
     setFamilysApp(families)
    }, [families]);

    const loadUserFamilies = async () => {
        try {
            const res = await getUserFamilies(User.userId);
            if (res.data.success && Array.isArray(res.data.familyName)) {
                setFamilies(res.data.familyName);
            }
        } catch (error) {
            console.error('Error loading families:', error);
        }
    };

    const handleCreateFamily = async () => {
        if (!newFamilyName.trim()) return;

        try {
            const res = await createFamily(User.userId, newFamilyName);
            if (res.data.success) {
                const { familyId, familyName } = res.data;
                setFamilies(prev => [...prev, { familyId, familyName }]);
                setFamilysApp(prev => [...prev, { familyId, familyName }]);
                setNewFamilyName('');
            }
        } catch (error) {
            console.error('Error creating family:', error);
        }
    };

    const handleSelectFamily = async (familyId) => {
        try {
            const res = await getFamilyMembers(familyId);
            if (res.data.success && Array.isArray(res.data.data)) {
                setFamilyMembers(res.data.data);
                
                setSelectedFamilyId(familyId);
            }
        } catch (error) {
            console.error('Error fetching family members:', error);
        }
    };

    const handleDeleteFamily = async (familyId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this family?');
        if (!confirmDelete) return;

        try {
            await deleteFamily(familyId);
            setFamilies(prev => prev.filter(f => f.familyId !== familyId));
            if (selectedFamilyId === familyId) {
                setFamilyMembers([]);
                setSelectedFamilyId('');
            }
            alert('Family deleted successfully.');
        } catch (error) {
            console.error('Error deleting family:', error);
        }
    };

    const handleAddFamilyMember = async () => {
        if (!newMemberEmail.trim()) return;

        try {
            const res = await addFamilyMember(newMemberEmail, selectedFamilyId);
            if (res.data.success && res.data.userName && res.data.role && res.data.userId) {
                const newMember = {
                    userName: res.data.userName,
                    role: res.data.role,
                    userId: res.data.userId
                };
                setFamilyMembers(prev => [...prev, newMember]);
                setNewMemberEmail('');
            }
        } catch (error) {
            console.error('Error adding member:', error);
        }
    };

    const handleDeleteFamilyMember = async (MemberFamilyId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this family Member?');
        let userId = MemberFamilyId;
        if (!confirmDelete) return;
        console.log("MemberFamilyId", userId);
        console.log("MemberFamilyId", User.userId);
        if (userId === User.userId) {
            const confirmDeleteFamily = window.confirm('You are the manager. Would you like to delete this family?');
            if (confirmDeleteFamily) {
                handleDeleteFamily(selectedFamilyId);
                return;
            }
        }

        try {
            await deleteFamilyMember(selectedFamilyId, userId);
            setFamilyMembers(prev => prev.filter(f => f.userId !== userId));
            //   if (selectedFamilyId === familyId) {
            //     setFamilyMembers([]);
            //     setSelectedFamilyId('');
            //   }
            // alert('Family deleted successfully.');
        } catch (error) {
            console.error('Error deleting family:', error);
        }
    };


    const handleUpdateFamilyMember = async (MemberFamilyId) => {


        let userId = MemberFamilyId;
        try {
            await updateFamilyMember(selectedFamilyId, userId);
        } catch (error) {
            console.error('Error deleting family:', error);
        }


    };



    return (
        <div className="familyManagementBord">
            <div className="Bord">
                <div className='bordMarge'>
                    <h1>Family</h1>
                    <div className='addFamilyDiv'>
                        <input
                            className='itemInput'
                            value={newFamilyName}
                            onChange={e => setNewFamilyName(e.target.value)}
                            placeholder='Enter Family Name...'
                        />
                        <div className="addFamily" onClick={handleCreateFamily}>
                            <div>Create Family</div>
                            <BsJournalPlus />
                        </div>
                    </div>
                    <div className="familys">
                        {families.map(family => (
                            <ItemFamily
                                key={family.familyId}
                                family={family}
                                handleGetFamilyMembers={handleSelectFamily}
                                handleDeleteFamily={handleDeleteFamily}
                                choose={selectedFamilyId === family.familyId}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="Bord">
                <div className='bordMarge'>
                    <h1>Members</h1>
                    <div className='addFamilyDiv'>
                        <input
                            className='itemInput'
                            value={newMemberEmail}
                            onChange={e => setNewMemberEmail(e.target.value)}
                            placeholder='Enter member email...'
                        />
                        <div className="addFamily" onClick={handleAddFamilyMember}>
                            <div>Add Member</div>
                            <LiaUserPlusSolid />
                        </div>
                    </div>
                    <div className="familys">
                        {familyMembers.map((member, index) => (
                            <MemberFamily
                                key={index}
                                MemberFamily={member}
                                handleDeleteFamilyMember={handleDeleteFamilyMember}
                                handleUpdateFamilyMember={handleUpdateFamilyMember}
                                manager={familyMembers.some(Member => Member.userId == User.userId && Member.role == "manager")}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
