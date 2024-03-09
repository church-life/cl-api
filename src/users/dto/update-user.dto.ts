import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { DocumentType } from '@prisma/client';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'The display name that will be shown in the app',
    example: 'Test User',
  })
  displayName?: string;

  @ApiPropertyOptional({
    description: 'The names of the user',
    example: 'Test',
  })
  names?: string;

  @ApiPropertyOptional({
    description: 'The last names of the user',
    example: 'User',
  })
  lastNames?: string;

  @ApiPropertyOptional({
    description: 'The birth date of the user',
    example: '1990-01-01',
    type: String,
    format: 'date',
  })
  birthDate?: string;

  @ApiPropertyOptional({
    description: 'The email of the user',
    example: 'test@gmail.com',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'The type of document',
    example: 'CC',
    enum: DocumentType,
    enumName: 'DocumentType',
  })
  documentType?: DocumentType;

  @ApiPropertyOptional({
    description: 'The document id of the user',
    example: '1234567890',
  })
  documentId?: string;

  @ApiPropertyOptional({
    description: 'The phone number of the user',
    example: '+573001234567',
  })
  phone?: string;

  @ApiPropertyOptional({
    description: 'The password of the user',
    example: 'Th1s1sA$tr0ngP@ssw0rd!',
  })
  password?: string;
}
