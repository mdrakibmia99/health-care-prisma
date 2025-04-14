
import * as bcrypt from 'bcrypt'
import prisma from '../../shared/prisma';
import { UserStatus } from '@prisma/client';
import { jwtHelpers } from '../../helpers/jwtHelpers';

const loginUser = async (payload: {
    email: string,
    password: string
}) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    });

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);

    if (!isCorrectPassword) {
        throw new Error("Password incorrect!")
    }
    const accessToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    },
        "abcdefg",
        "5m"
    );

    const refreshToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    },
        "abcdefghgijklmnop",
        "30d"
    );

    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.needPasswordChange
    };
};




export const AuthServices = {
    loginUser,
}