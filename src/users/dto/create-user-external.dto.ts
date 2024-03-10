import { ApiProperty } from '@nestjs/swagger';
import { type Prisma } from '@prisma/client';

export class CreateUserExternalDto implements Prisma.UserCreateInput {
  @ApiProperty({
    description: "Clerk's external id",
  })
  externalId: string;

  @ApiProperty({
    description: 'The names of the user',
    example: 'Test',
  })
  names: string;

  @ApiProperty({
    description: 'The last names of the user',
    example: 'User',
  })
  lastNames: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'test@gmail.com',
  })
  email: string;
}
