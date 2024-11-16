// src/pages/histories/TransactionRow.tsx
import { 
  toast, 
  showConfirmationAlert, 
} from '@/components/ui/SweetAlert';
import { 
  useDeleteUser, 
  useToggleUserStatus, 
} from '@/hooks/useUsers';
import { 
  EyeIcon, 
  XCircleIcon, 
  PencilSquareIcon, 
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/solid';
import React from 'react';
import { format } from 'date-fns';
import Tippy from '@tippyjs/react';
import { cn } from '@/utilities/helpers';
import { User } from '@/types/UserTypes';
import { useNavigate } from 'react-router-dom';

interface UserRowProps {
  user: User;
  onEdit: () => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, onEdit }) => {
  const navigate = useNavigate();
  const toggleStatus = useToggleUserStatus();
  const deleteUser = useDeleteUser();

  const handleToggleStatus = () => {
    showConfirmationAlert({
      title: 'Are you sure?',
      text: `Are you sure you want to ${user.status === 'active' ? 'deactivate' : 'activate'} this user?`,
      icon: 'warning',
      confirmButtonText: `Yes, ${user.status === 'active' ? 'deactivate' : 'activate'} it!`,
      cancelButtonText: 'Cancel',
      onConfirm: async () => {
        try {
          const response = await toggleStatus.mutateAsync(user.id);
          toast(response.message, { icon: response.status ? 'success' : 'error' });
        } catch (error) {
          console.error('Error toggling status:', error);
          toast((error as Error).message, { icon: 'error' });
        }
      }
    });
  };

  const handleDelete = () => {
    showConfirmationAlert({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this user?',
      icon: 'warning',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      onConfirm: async () => {
        try {
          await deleteUser.mutateAsync(user.id);
          toast('User deleted successfully', { icon: 'success' });
        } catch (error) {
          console.error('Error deleting user:', error);
          toast((error as Error).message, { icon: 'error' });
        }
      }
    });
  };
  return (
    <tr>
      <td>  
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.username}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <span className="text-lg font-semibold">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              @{user.username}
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="text-sm">
          <div>{user.email}</div>
          <div className="text-gray-500 dark:text-gray-400">{user.phoneNumber}</div>
        </div>
      </td>
      <td>
        <span className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          {
            'bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-400': user.role === 'admin',
            'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400': user.role === 'user',
            'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400': user.role === 'super_admin'
          }
        )}>
          {user.role}
        </span>
      </td>
      <td>
        <span className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          {
            'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400': user.status === 'active',
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400': user.status === 'pending',
            'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400': user.status === 'blocked',
            'bg-orange-100 text-orange-800 dark:bg-orange-800/20 dark:text-orange-400': user.status === 'suspended'
          }
        )}>
          {user.status}
        </span>
      </td>
      <td>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400">
          Level {user.kycLevel}
        </span>
      </td>
      <td>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {format(new Date(user.createdAt), 'MMM d, yyyy')}
        </span>
      </td>
      <td className="text-center">
        <ul className="flex items-center justify-center gap-2">
          <li>
            <Tippy content="Approve">
              <button type="button" onClick={onEdit}>
                <PencilSquareIcon className="w-5 h-5 text-primary" />
              </button>
            </Tippy>
          </li>
          <li>
            <Tippy content="View">
              <button type="button" onClick={() => navigate(`/app/users/user-details/${user.id}`)}>
                <EyeIcon className="w-5 h-5 text-primary" />
              </button>
            </Tippy>
          </li>
          <li>
            <Tippy content="Decline">
              <button type="button" onClick={handleToggleStatus}>
                <WrenchScrewdriverIcon className="w-5 h-5 text-primary" />
              </button>
            </Tippy>
          </li>
          <li>
            <Tippy content="Delete">
              <button type="button" onClick={handleDelete}>
                <XCircleIcon className="w-5 h-5 text-danger" />
              </button>
            </Tippy>
          </li>
        </ul>
      </td>
    </tr>
  );
};

export default UserRow;