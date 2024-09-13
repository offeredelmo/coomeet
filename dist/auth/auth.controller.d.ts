import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from 'src/users/enums/rol.enum';
import { RecoveryPasswordDto } from './dto/recoveryPassword.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        name: string;
        email: string;
        role: UserRole[];
        id: any;
        access_token: string;
        refresh_token: string;
    }>;
    register(registerDto: RegisterDto): Promise<import("mongoose").Document<unknown, {}, import("../users/entities/user.entity").User> & import("../users/entities/user.entity").User & Required<{
        _id: string;
    }>>;
    sendRecoveryCodeEmail(email: string): Promise<string>;
    recoveryPasswordByEmail(recoveryPasswordDto: RecoveryPasswordDto): Promise<string>;
    refreshTokens(req: Request): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    test(): Promise<string>;
}
