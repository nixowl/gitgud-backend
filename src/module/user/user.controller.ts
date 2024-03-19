import { type Context } from 'hono';
import { deleteUser, findAllUsers, findUserById, updateUser } from './user.service';

export async function getSessionUserHandler(c: Context) {
  const userId = c.get('userId') as string;

  if (!userId) {
    c.status(401);
    return c.json({ message: 'Not authorized' });
  }

  const user = await findUserById(userId);

  return c.json({ user });
}

export async function getAllUsersHandler(c: Context) {
  const users = await findAllUsers();
  return c.json({ users });
}

export async function getUserByIdHandler(c: Context) {
  const userId = c.req.param('id');
  const user = await findUserById(userId);

  if (!user) {
    c.status(404);
    return c.json({ message: 'User not found' });
  }

  return c.json({ user });
}

export async function updateUserHandler(c: Context) {
  const userId = c.req.param('id');
  const updatedUser = await c.req.json();
  const user = await updateUser(userId, updatedUser);

  if (!user) {
    c.status(404);
    return c.json({ message: 'User not found' });
  }

  return c.json({ user });
}

export async function deleteUserHandler(c: Context) {
  const userId = c.req.param('id');
  const authenticatedUserId = c.get('userId') as string;

  if (userId !== authenticatedUserId) {
    c.status(403);
    return c.json({ message: 'You are not authorized to delete this user' });
  }

  const user = await deleteUser(userId);

  if (!user) {
    c.status(404);
    return c.json({ message: 'User not found' });
  }

  return c.json({ message: 'User deleted successfully' });
}
