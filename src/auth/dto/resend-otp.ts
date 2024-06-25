import { ApiProperty } from "@nestjs/swagger";

export class ResendOtp {
    @ApiProperty()
    email: string;

}