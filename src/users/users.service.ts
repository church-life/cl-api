import clerkClient from '@clerk/clerk-sdk-node';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/db/prisma.service';

import { type CreateUserDto } from './dto/create-user.dto';
import { type UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async create(createUserDto: CreateUserDto) {
    const userAlreadyExists = await this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (userAlreadyExists) {
      return userAlreadyExists;
    }

    const createdClerkUser = await clerkClient.users.createUser({
      emailAddress: [createUserDto.email],
      firstName: createUserDto.names,
      lastName: createUserDto.lastNames,
      phoneNumber: [createUserDto.phone],
      password: createUserDto.password,
    });

    const createdUser = await this.prismaService.user.create({
      data: {
        externalId: createdClerkUser.id,
        displayName: createUserDto.displayName,
        names: createUserDto.names,
        lastNames: createUserDto.lastNames,
        email: createUserDto.email,
        phone: createUserDto.phone,
        documentType: createUserDto.documentType,
        documentId: createUserDto.documentId,
        birthDate: createUserDto.birthDate,
      },
    });

    return createdUser;
  }

  // TODO: Optimize this method
  async update(id: string, updateUserDto: UpdateUserDto) {
    const { password, email, phone, ...rest } = updateUserDto;

    const user = await this.getValidatedUser(id);

    if (password) {
      await this.changePassword(user, password);
    }

    if (email) {
      await this.changeEmail(user, email);
    }

    if (phone) {
      await this.changePhone(user, phone);
    }

    return this.prismaService.user.update({
      where: { id },
      data: rest,
    });
  }

  async remove(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    if (user.externalId) {
      await clerkClient.users.deleteUser(user.externalId);
      console.log('User deleted from Clerk');
    }
    const d = await this.prismaService.user.delete({ where: { id } });

    console.log('User deleted from Prisma');
    return d;
  }

  private async changePassword(
    user: Awaited<ReturnType<typeof UsersService.prototype.getValidatedUser>>,
    password: string,
  ) {
    await clerkClient.users.updateUser(user.externalId, { password });
  }

  private async changeEmail(
    user: Awaited<ReturnType<typeof UsersService.prototype.getValidatedUser>>,
    newEmail: string,
  ) {
    const usersWithSameEmail = await this.prismaService.user.findMany({
      where: { email: newEmail },
    });

    if (usersWithSameEmail.length > 0) {
      throw new Error('Email already in use');
    }

    const newEmailInClerk = await clerkClient.emailAddresses.createEmailAddress({
      userId: user.externalId,
      emailAddress: newEmail,
      verified: true,
    });

    if (!newEmailInClerk) {
      throw new Error('Error creating email in Clerk');
    }

    //remove old email from clerk
    const clerkUser = await clerkClient.users.getUser(user.externalId);

    if (clerkUser.primaryEmailAddressId) {
      await clerkClient.emailAddresses.deleteEmailAddress(clerkUser.primaryEmailAddressId);
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { email: newEmail },
    });
  }

  private async changePhone(
    user: Awaited<ReturnType<typeof UsersService.prototype.getValidatedUser>>,
    newPhone: string,
  ) {
    const usersWithSamePhone = await this.prismaService.user.findMany({
      where: { phone: newPhone },
    });

    if (usersWithSamePhone.length > 0) {
      throw new Error('Phone already in use');
    }

    const newPhoneInClerk = await clerkClient.phoneNumbers.createPhoneNumber({
      userId: user.externalId,
      phoneNumber: newPhone,
      verified: true,
    });

    if (!newPhoneInClerk) {
      throw new Error('Error creating phone in Clerk');
    }

    //remove old phone from clerk
    const clerkUser = await clerkClient.users.getUser(user.externalId);

    if (clerkUser.primaryPhoneNumberId) {
      await clerkClient.phoneNumbers.deletePhoneNumber(clerkUser.primaryPhoneNumberId);
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { phone: newPhone },
    });
  }

  private async getValidatedUser(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.externalId) {
      throw new Error('User not found in Clerk');
    }

    return {
      ...user,
      externalId: user.externalId,
    };
  }
}
