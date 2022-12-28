import { Controller, Patch,  UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../Auth/shared/jwt-auth.guard';
import { UserService } from './Shared/user.service';

@Controller('v1/user')
@ApiTags('Users')
export class UserController {
    constructor(private readonly userServices: UserService) {}

    @Patch('pro')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Turn user to Pro plan' })
    @ApiBearerAuth('JWT-auth')
    public async turnToPro(@Request() req:any) {
        return await this.userServices.turnToPro(req.user);
    }

    @Patch('free')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Turn user to Free plan' })
    @ApiBearerAuth('JWT-auth')
    public async turnToFree(@Request() req:any) {
        return await this.userServices.turnToFree(req.user);
    }
}
