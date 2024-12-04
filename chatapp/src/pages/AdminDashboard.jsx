import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // Uvoz CSS-a za stilizaciju

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/list-users', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                console.log(response.data);  // Dodajte ovo za debagovanje
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (response.status === 200) {
                setUsers(users.filter(user => user.id !== userId));
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };



    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
