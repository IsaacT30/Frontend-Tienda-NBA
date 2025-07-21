import React, { useState, useEffect } from 'react';
import { Search, Users, Trash2, Shield, User, Star, Smile } from 'lucide-react';
import { User as UserType, UserRole } from '../../types';

type EditFormType = Partial<UserType> & { password?: string; isActive?: boolean };
import { AdminService } from '../../services/adminService';
interface UsersManagementProps {
  onStatsUpdate: () => void;
}
const UsersManagement = ({ onStatsUpdate }: UsersManagementProps): JSX.Element => {
  // Hooks de estado
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [editUser, setEditUser] = useState<UserType | null>(null);
  const [editForm, setEditForm] = useState<EditFormType>({});
  // Añadimos password e isActive para cumplir con el DTO
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await AdminService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (user: UserType) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${user.first_name || user.username}?`)) {
      try {
        await AdminService.deleteUser(user.id);
        await loadUsers();
        onStatsUpdate();
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Failed to delete user');
      }
    }
  };
  // Modal edición
  const openEditModal = (user: UserType) => {
    setEditUser(user);
    setEditForm({ ...user });
    setEditError(null);
  };
  const closeEditModal = () => {
    setEditUser(null);
    setEditForm({});
    setEditError(null);
  };
  
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;
    setEditLoading(true);
    setEditError(null);
    try {
      // Ahora el backend permite también first_name y last_name
      const allowedFields = ['username', 'email', 'first_name', 'last_name', 'role', 'isActive', 'password'];
      const updateData: any = {};
      for (const field of allowedFields) {
        let value = (editForm as any)[field];
        if (value === undefined || value === '') continue;
        if (field === 'isActive') {
          // Asegura booleano
          if (
            value === true ||
            value === 'true' ||
            value === 1 ||
            value === '1'
          ) {
            updateData[field] = true;
          } else if (
            value === false ||
            value === 'false' ||
            value === 0 ||
            value === '0'
          ) {
            updateData[field] = false;
          }
        } else if (field === 'password') {
          if (value && value.length >= 6) {
            updateData[field] = value;
          }
        } else if (field === 'role') {
          // Asegura que el rol sea válido
          if (Object.values(UserRole).includes(value)) {
            updateData[field] = value;
          }
        } else {
          updateData[field] = value;
        }
      }
      // Log para depuración
      console.log('Payload enviado a updateUser:', updateData);
      await AdminService.updateUser(editUser.id.toString(), updateData);
      await loadUsers();
      onStatsUpdate();
      closeEditModal();
    } catch (error: any) {
      setEditError(error?.message || 'Error al actualizar usuario');
    } finally {
      setEditLoading(false);
    }
  };
  // Helpers (deben ir justo antes del return)
  const filteredUsers = users.filter((user: UserType) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.first_name && user.first_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.last_name && user.last_name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRole = selectedRole === '' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });
  
  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-red-100 text-red-800';
      case UserRole.MODERATOR:
        return 'bg-purple-100 text-purple-800';
      case UserRole.USER:
        return 'bg-blue-100 text-blue-800';
      case UserRole.CUSTOMER:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return <Shield className="h-4 w-4 text-red-600" />;
      case UserRole.MODERATOR:
        return <Star className="h-4 w-4 text-purple-600" />;
      case UserRole.CUSTOMER:
        return <Smile className="h-4 w-4 text-green-600" />;
      case UserRole.USER:
      default:
        return <User className="h-4 w-4 text-blue-600" />;
    }
  };
  return (
    <div className="space-y-6">
      {/* Modal de edición de usuario */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={closeEditModal}
              aria-label="Cerrar"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Editar usuario</h2>
            <form onSubmit={handleEditSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Usuario</label>
                <input
                  type="text"
                  name="username"
                  value={editForm.username || ''}
                  onChange={handleEditChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email || ''}
                  onChange={handleEditChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    name="first_name"
                    value={editForm.first_name || ''}
                    onChange={handleEditChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Apellido</label>
                  <input
                    type="text"
                    name="last_name"
                    value={editForm.last_name || ''}
                    onChange={handleEditChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  type="text"
                  name="phone"
                  value={editForm.phone || ''}
                  onChange={handleEditChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rol</label>
                <select
                  name="role"
                  value={editForm.role || ''}
                  onChange={handleEditChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                >
                  <option value="">Selecciona un rol</option>
                  {Object.values(UserRole).map((role) => (
                    <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                  ))}
                </select>
              </div>
              {editError && <div className="text-red-600 text-sm">{editError}</div>}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  disabled={editLoading}
                >Cancelar</button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  disabled={editLoading}
                >{editLoading ? 'Guardando...' : 'Guardar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">All Roles</option>
            {Object.values(UserRole).map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Cargando usuarios...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Correo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Creado</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => openEditModal(user)}>
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          {getRoleIcon(user.role as UserRole)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.first_name && user.last_name
                              ? `${user.first_name} ${user.last_name}`
                              : user.username}
                          </div>
                          <div className="text-sm text-gray-500">@{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 cursor-pointer" onClick={() => openEditModal(user)}>{user.email}</td>
                    <td className="px-6 py-4 cursor-pointer" onClick={() => openEditModal(user)}>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border-0 ${getRoleColor(user.role || UserRole.USER)}`}>{user.role}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 cursor-pointer" onClick={() => openEditModal(user)}>
                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="text-red-600 hover:text-red-900 p-1"
                        disabled={user.role === UserRole.ADMIN}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No users found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;
