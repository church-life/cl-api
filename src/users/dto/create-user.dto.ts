import { ApiProperty } from '@nestjs/swagger';
import { DocumentType, type Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty({
    description: 'The display name that will be shown in the app',
    example: 'Test User',
  })
  displayName: string;

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
    description: 'The birth date of the user',
    example: '1990-01-01',
    type: String,
    format: 'date',
  })
  birthDate: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'test@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'The type of document',
    example: 'CC',
    enum: DocumentType,
    enumName: 'DocumentType',
  })
  documentType: DocumentType;

  @ApiProperty({
    description: 'The document id of the user',
    example: '1234567890',
  })
  documentId: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '+573001234567',
  })
  phone: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Th1s1sA$tr0ngP@ssw0rd!',
  })
  password: string;
}
