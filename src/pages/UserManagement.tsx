
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit, 
  Trash2, 
  User as UserIcon, 
  UserPlus, 
  X, 
  Save,
  Check,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { mockUsers } from '@/services/AuthService';

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(mockUsers);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'Contributor',
    avatar: '',
    bio: '' // Added bio field to formData
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      role: value
    });
  };
  
  const handleCreateUser = () => {
    const newUser = {
      email: formData.email,
      password: formData.password || 'password123',
      userData: {
        id: `u-${Math.floor(Math.random() * 1000)}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        avatar: formData.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250',
        bio: formData.bio || 'New user', // Adding bio with default value
        createdAt: new Date().toISOString()
      }
    };
    
    setUsers([...users, newUser]);
    setIsCreateDialogOpen(false);
    
    toast({
      title: "User created",
      description: "New user has been successfully added.",
    });
    
    // Reset form
    setFormData({
      email: '',
      password: '',
      name: '',
      role: 'Contributor',
      avatar: '',
      bio: '' // Reset bio field
    });
  };
  
  const handleEditUser = () => {
    const updatedUsers = users.map(user => {
      if (user.email === selectedUser.email) {
        return {
          ...user,
          email: formData.email,
          userData: {
            ...user.userData,
            name: formData.name,
            email: formData.email,
            role: formData.role,
            avatar: formData.avatar,
            bio: formData.bio || user.userData.bio || 'No bio available' // Ensure bio is preserved or defaulted
          }
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    setIsEditDialogOpen(false);
    
    toast({
      title: "User updated",
      description: "User information has been successfully updated.",
    });
  };
  
  const handleDeleteUser = () => {
    const updatedUsers = users.filter(user => user.email !== selectedUser.email);
    setUsers(updatedUsers);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "User deleted",
      description: "User has been successfully removed.",
    });
  };
  
  const openEditDialog = (user) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      password: '',
      name: user.userData.name,
      role: user.userData.role,
      avatar: user.userData.avatar
    });
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (user) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };
  
  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userData.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-bg">
              <UserPlus className="h-4 w-4 mr-2" />
              Add New User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>
                Enter the details for the new user account.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Set initial password"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select name="role" value={formData.role} onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="Contributor">Contributor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Short user biography"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="avatar">Avatar URL</Label>
                <Input
                  id="avatar"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleInputChange}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateUser}>
                <Check className="h-4 w-4 mr-2" />
                Create User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
      
      {/* Search and Filter Bar */}
      <motion.div 
        className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4"
        variants={itemVariants}
      >
        <div className="relative w-full">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users..."
            className="pl-10"
          />
          <Filter className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
      </motion.div>
      
      {/* Users List */}
      <motion.div variants={itemVariants}>
        <div className="bg-card border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-6 py-4 text-sm font-medium">User</th>
                  <th className="text-left px-6 py-4 text-sm font-medium">Email</th>
                  <th className="text-left px-6 py-4 text-sm font-medium">Role</th>
                  <th className="text-left px-6 py-4 text-sm font-medium">Created</th>
                  <th className="text-right px-6 py-4 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <motion.tr
                        key={user.email}
                        className="border-t hover:bg-muted/30"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <img 
                                src={user.userData.avatar} 
                                alt={user.userData.name}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
                                }}
                              />
                            </div>
                            <div className="font-medium">{user.userData.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.userData.role === 'Admin' ? 'bg-primary/10 text-primary' :
                            user.userData.role === 'Editor' ? 'bg-blue-500/10 text-blue-500' :
                            'bg-green-500/10 text-green-500'
                          }`}>
                            {user.userData.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {new Date(user.userData.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => openEditDialog(user)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="text-destructive"
                              onClick={() => openDeleteDialog(user)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                        <UserIcon className="h-8 w-8 mx-auto mb-2 opacity-40" />
                        <p>No users found matching your search criteria.</p>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Total count */}
        <div className="mt-2 text-sm text-muted-foreground">
          Total: {filteredUsers.length} user{filteredUsers.length !== 1 && 's'}
        </div>
      </motion.div>
      
      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Modify user information and role.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select name="role" value={formData.role} onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="Contributor">Contributor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-bio">Bio</Label>
                <Input
                  id="edit-bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Short user biography"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-avatar">Avatar URL</Label>
                <Input
                  id="edit-avatar"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditUser}>
              <Save className="h-4 w-4 mr-2" />
              Update User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="flex items-center space-x-3 bg-muted/30 p-4 rounded-lg">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img 
                  src={selectedUser.userData.avatar} 
                  alt={selectedUser.userData.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{selectedUser.userData.name}</p>
                <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default UserManagement;
