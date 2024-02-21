import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

export class UpdatePasswordDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'The password of the user',
    example: 'Th1s1sA$tr0ngP@ssw0rd!',
  })
  password?: string;
}
