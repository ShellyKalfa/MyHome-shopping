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

//the componet Family and Create Family 
export default function CreateFamily({ User, setFamilysApp }) {
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
        setFamilysApp(families)
    }, [families]);


    /*
    *load Families by user,load Families by the search that user in famliy member
    */
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


    /*
    *Create Family by user
    */
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

    /*
    *handle Select Family - when select family , bring the family member by the famliy id 
    */
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
    /**
     *Delete Family- admin can delete the Famliy 
     * user cant
     * @param {*} familyId 
     * @returns 
     */
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
        } catch (error) {
            console.error('Error deleting family:', error);
        }
    };

    /**
     * Add Family Member - users and admins can add users to family
     * 
     */

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
    /**
     * Delete Family Member  - admin can delete Family Member
     * that member will not be in the family , but will stil stay 
     * @param {*} MemberFamilyId 
     * @returns 
     */
    const handleDeleteFamilyMember = async (MemberFamilyId) => {
        // ... הלוגיקה שלך נשארת ...
        const confirmDelete = window.confirm('Are you sure you want to delete this family Member?');
        let userId = MemberFamilyId;
        if (!confirmDelete) return;

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
        } catch (error) {
            console.error('Error deleting family:', error);
        }
    };

    /**
     * handleUpdateFamilyMember - admin can Update Family Member to be admin also 
     * @param {*} MemberFamilyId 
     */
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
            <div className="management-container">

                {/* --- כרטיס משפחות --- */}
                <div className="management-card">
                    <div className="card-header">
                        <h1>My Families</h1>
                    </div>

                    <div className="compact-input-group">
                        <input
                            className="compact-input"
                            value={newFamilyName}
                            onChange={e => setNewFamilyName(e.target.value)}
                            placeholder="Enter new family name..."
                        />
                        <button className="compact-add-btn" onClick={handleCreateFamily}>
                            <BsJournalPlus size={20} />
                        </button>
                    </div>

                    <div className="list-container familys">
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

                {/* --- כרטיס חברים --- */}
                <div className="management-card">
                    <div className="card-header">
                        <h1>Members {selectedFamilyId && <span style={{ fontSize: '0.6em', color: '#888' }}>(Selected)</span>}</h1>
                    </div>

                    <div className={`compact-input-group ${!selectedFamilyId ? 'disabled-group' : ''}`}>
                        <input
                            className="compact-input"
                            value={newMemberEmail}
                            onChange={e => setNewMemberEmail(e.target.value)}
                            placeholder="Enter member email..."
                            disabled={!selectedFamilyId}
                        />
                        <button
                            className="compact-add-btn"
                            onClick={handleAddFamilyMember}
                            disabled={!selectedFamilyId}
                        >
                            <LiaUserPlusSolid size={20} />
                        </button>
                    </div>

                    <div className="list-container familys">
                        {!selectedFamilyId && (
                            <div style={{ textAlign: 'center', color: '#aaa', marginTop: '20px' }}>
                                Select a family to manage members
                            </div>
                        )}
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