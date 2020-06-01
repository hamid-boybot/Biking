import { BikeRepository } from '../bike/bike.repository';
import {
  UserInformationDTO,
  ProfileType,
} from './../user/dto/user-information.dto';
import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { AuthCredentialsDTO } from '../user/dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { SignInDTO } from '../user/dto/sign-in.dto';
import { UpdateUserDTO } from '../user/dto/update-user.dto';
import { User } from '../user/user.entity';
import { MailService } from '../mail/mail.service';
import { ResetPasswordDTO } from '../user/dto/reset-password.dto';
import { RequestPasswordResetDTO } from '../user/dto/request-password-reset.dto';
import * as bcrypt from 'bcryptjs';
import { ActivateAccountDTO } from '../user/dto/activate-account.dto';

const crypto = require('crypto');

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private mailService: MailService,
    private readonly bikeRepository: BikeRepository,
  ) {}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
    const { username, mail } = authCredentialsDTO;

    const user = await this.userRepository.findOne({ username });
    if (user) {
      throw new ForbiddenException('this username is already taken');
    }
    // à ne pas envoyer en prod
    const result = await this.userRepository.signUp(authCredentialsDTO);
    await this.mailService.sendActivationMail(
      result.mail,
      result.username,
      result.activation_code,
    );

    return result;
  }

  async signIn(signInDTO: SignInDTO): Promise<{}> {
    const username = await this.userRepository.validatePassword(signInDTO);

    if (!username) {
      throw new UnauthorizedException('wrong username or password ');
    }

    const user = await this.userRepository.findOne({ username });

    if (!user.activated) {
      throw new UnauthorizedException('You account is not activated');
    }

    const payload: JwtPayload = {
      username: user.username,
      roles: [user.user_type],
      id_user: user.id_user,
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  async updateUser(updateUserDTO: UpdateUserDTO, user): Promise<User> {
    return this.userRepository.updateUser(updateUserDTO, user);
  }

  async userInformation(userInformationDTO: UserInformationDTO, user) {
    const { profile_type, profile_id } = userInformationDTO;

    if (profile_type) {
      const findPublicProfile = await this.userRepository
        .createQueryBuilder('user')

        .where('user.id_user = :id', { id: profile_id })
        .select([
          'user.first_name AS first_name',
          'user.last_name AS last_name',
          'user.imgUrl AS "imgUrl"',
          'user.age AS age',
        ])
        .groupBy('user.id_user')
        .getRawOne();

      const findProperty: any = await this.bikeRepository
        .createQueryBuilder('property')
        .innerJoin('property.user', 'user', 'user.id_user = :id', {
          id: profile_id,
        })
        .getMany();

      const profile = { user: findPublicProfile, property: findProperty };
      return profile;
    }

    const findUser = await this.userRepository.findOne({
      id_user: user.id_user,
    });
    if (!findUser) {
      throw new UnauthorizedException(
        'Not allowed to access these informations',
      );
    }

    return findUser;
  }

  async activateAccount(activateAccountDTO: ActivateAccountDTO) {
    const { username, activation_code } = activateAccountDTO;

    const user = await this.userRepository.findOne({ username });

    if (activation_code == user.activation_code) {
      user.activated = true;
      await user.save();
      await this.mailService.successActivatedAccountMail(
        user.mail,
        user.username,
      );
    } else {
      throw new NotAcceptableException('The activation code is wrong');
    }

    const payload: JwtPayload = {
      username: user.username,
      roles: [user.user_type],
      id_user: user.id_user,
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  async resetPasswordRequest(requestPasswordResetDTO: RequestPasswordResetDTO) {
    const { mail } = requestPasswordResetDTO;
    const buffer = crypto.randomBytes(32);
    const resetPassword = buffer.toString('hex');
    const user = await this.userRepository.findOne({ mail: mail });

    if (!user) {
      throw new NotFoundException([{ property: 'mail not foud' }]);
    }
    user.password_reset_token = resetPassword;
    await user.save();

    const resetUrl = `http://localhost:3000/change-password?passwordResetToken=${resetPassword}`;
    await this.mailService.sendResetPasswordRequestMail(mail, resetUrl);
  }

  async resestPassword(resetPasswordDTO: ResetPasswordDTO, resetPasswordToken) {
    const { password } = resetPasswordDTO;

    const user = await this.userRepository.findOne({
      password_reset_token: resetPasswordToken,
    });
    const buffer = crypto.randomBytes(32);
    const resetPassword = buffer.toString('hex');
    user.password_reset_token = resetPassword;

    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);

    await user.save();
    this.mailService.sendResetedPasswordMail(user.mail);
  }
}
