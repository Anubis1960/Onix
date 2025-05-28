import {useEffect, useState} from 'react';
import {passwordManagerService} from '../../service/password-manager.service.ts'; // adjust path as needed
import {PasswordManagerModel} from '../../models/password-manager.model.ts'; // adjust path as needed

export const PasswordDashboardPage = () => {
    const [entries, setEntries] = useState<PasswordManagerModel[]>([]);
    const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(new Set());
    const [newEntry, setNewEntry] = useState<Omit<PasswordManagerModel, 'id'>>({
        domain: '',
        username: '',
        password: ''
    });
    const [editingId, setEditingId] = useState<string | null>(null);
    const userId = localStorage.getItem('userId'); // or wherever you store user ID

    useEffect(() => {
        const fetchEntries = async () => {
            if (!userId) return;
            try {
                const response = await passwordManagerService.getPasswordsByUserId(userId);
                if (response.ok) {
                    const data = await response.json();
                    setEntries(data.map((entry: PasswordManagerModel) => new PasswordManagerModel(
                        entry.id,
                        entry.domain,
                        entry.username,
                        entry.password
                    )));
                }
            } catch (error) {
                console.error("Failed to fetch passwords:", error);
            }
        };

        fetchEntries();
    }, [userId]);

    const togglePasswordVisibility = (id: string) => {
        setVisiblePasswords(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id); // Hide if already visible
            } else {
                newSet.add(id);    // Show if hidden
            }
            return newSet;
        });
    };

    const handleAddEntry = async () => {
        if (!userId) return;
        try {
            const response = await passwordManagerService.addPasswordEntry(
                newEntry.domain,
                newEntry.username,
                newEntry.password,
                userId
            );
            if (response.ok) {
                const addedEntry = await response.json();
                setEntries([
                    ...entries,
                    new PasswordManagerModel(
                        addedEntry.id,
                        addedEntry.domain,
                        addedEntry.username,
                        addedEntry.password
                    )
                ]);
                setNewEntry({domain: '', username: '', password: ''});
            }
        } catch (error) {
            console.error("Failed to add password:", error);
        }
    };

    const handleUpdateEntry = async (entry: PasswordManagerModel) => {
        try {
            const response = await passwordManagerService.updatePasswordEntry(
                entry.id,
                entry.domain,
                entry.username,
                entry.password
            );
            if (response.ok) {
                setEntries(entries.map(e => e.id === entry.id ? entry : e));
                setEditingId(null);
            }
        } catch (error) {
            console.error("Failed to update password:", error);
        }
    };

    const handleDeleteEntry = async (id: string) => {
        try {
            const response = await passwordManagerService.deletePasswordEntry(id);
            if (response.ok) {
                setEntries(entries.filter(entry => entry.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete password:", error);
        }
    };

    return (
        <div style={{padding: "20px"}}>
            <h2>Password Manager</h2>

            {/* Add Entry Form */}
            <div>
                <h3>Add New Entry</h3>
                <input
                    type="text"
                    placeholder="Domain"
                    value={newEntry.domain}
                    onChange={(e) => setNewEntry({...newEntry, domain: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={newEntry.username}
                    onChange={(e) => setNewEntry({...newEntry, username: e.target.value})}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={newEntry.password}
                    onChange={(e) => setNewEntry({...newEntry, password: e.target.value})}
                />
                <button onClick={handleAddEntry}>Add</button>
            </div>

            {/* Entries Table */}
            <h3>Saved Entries</h3>
            <table border={1} cellPadding="10" style={{width: '100%', marginTop: '20px'}}>
                <thead>
                <tr>
                    <th>Domain</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {entries.map((entry) => {
                    const isEditing = editingId === entry.id;
                    const isPasswordVisible = visiblePasswords.has(entry.id);

                    return (
                        <tr key={entry.id}>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={entry.domain}
                                        onChange={(e) =>
                                            setEntries(prev =>
                                                prev.map(item =>
                                                    item.id === entry.id
                                                        ? new PasswordManagerModel(
                                                            item.id,
                                                            e.target.value,
                                                            item.username,
                                                            item.password
                                                        )
                                                        : item
                                                )
                                            )
                                        }
                                    />
                                ) : (
                                    entry.domain
                                )}
                            </td>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={entry.username}
                                        onChange={(e) =>
                                            setEntries(prev =>
                                                prev.map(item =>
                                                    item.id === entry.id
                                                        ? new PasswordManagerModel(
                                                            item.id,
                                                            item.domain,
                                                            e.target.value,
                                                            item.password
                                                        )
                                                        : item
                                                )
                                            )
                                        }
                                    />
                                ) : (
                                    entry.username
                                )}
                            </td>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="password"
                                        value={entry.password}
                                        onChange={(e) =>
                                            setEntries(prev =>
                                                prev.map(item =>
                                                    item.id === entry.id
                                                        ? new PasswordManagerModel(
                                                            item.id,
                                                            item.domain,
                                                            item.username,
                                                            e.target.value
                                                        )
                                                        : item
                                                )
                                            )
                                        }
                                    />
                                ) : (
                                    <>
                                        {isPasswordVisible ? entry.password : '••••••••'}
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordVisibility(entry.id)}
                                            style={{marginLeft: "10px", fontSize: "12px"}}
                                        >
                                            {isPasswordVisible ? "Hide" : "View"}
                                        </button>
                                    </>
                                )}
                            </td>
                            <td>
                                {!isEditing ? (
                                    <>
                                        <button onClick={() => handleUpdateEntry(entry)}>Save</button>
                                        <button onClick={() => setEditingId(entry.id)}>Edit</button>
                                    </>
                                ) : (
                                    <button onClick={() => setEditingId(null)}>Cancel</button>
                                )}

                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(entry.password);
                                        alert("Password copied to clipboard!");
                                    }}
                                >
                                    Copy
                                </button>

                                <button onClick={() => handleDeleteEntry(entry.id)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};
