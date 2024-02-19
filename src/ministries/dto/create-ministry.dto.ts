import { ApiProperty } from '@nestjs/swagger';
import { type Prisma } from '@prisma/client';

export class CreateMinistryDto implements Prisma.MinistryCreateInput {
  @ApiProperty({
    description: 'The name of the ministry',
    example: 'Youth',
  })
  name: string;

  @ApiProperty({
    description: 'The minimum age for the ministry',
    example: 21,
    required: false,
  })
  minAge?: number | null | undefined;

  @ApiProperty({
    description: 'The maximum age for the ministry',
    example: 35,
    required: false,
  })
  maxAge?: number | null | undefined;
}
