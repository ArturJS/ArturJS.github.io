import { ErrorNotFound, ErrorAlreadyExists } from '../../common/exceptions';
import usersDAL from './users.dal';

class UsersService {
    async getAll() {
        const users = await usersDAL.getAll();

        return users.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }));
    }

    async getByEmail(email, { suppressError = false }) {
        const user = await usersDAL.getByEmail(email);

        if (!user) {
            if (suppressError) {
                return null;
            }

            throw new ErrorNotFound(`User with email="${email}" not found!`);
        }

        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            notes: user.notes
        };
    }

    async create(user) {
        const isUserAlreadyExists = await this.getByEmail(user.email, {
            suppressError: true
        });

        if (isUserAlreadyExists) {
            throw new ErrorAlreadyExists(
                `User with email="${user.email}" already exists!`
            );
        }

        const createdUser = await usersDAL.create({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });

        return {
            id: createdUser.id,
            firstName: createdUser.firstName,
            lastName: createdUser.lastName,
            email: createdUser.email,
            notes: createdUser.notes
        };
    }
}

export default new UsersService();