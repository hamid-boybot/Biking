import { ApiProperty } from '@nestjs/swagger';

export class OpenRouteDTO {
  @ApiProperty()
  sql_request: string;
}
