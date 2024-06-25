// import { ValidationArguments } from 'class-validator';
// import {
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
// } from 'class-validator';
// import { Injectable } from '@nestjs/common';
// import { UserService } from '../../app/identity';
// import { compare } from './security.util';

// @Injectable()
// @ValidatorConstraint({ name: 'isPinValid', async: true })
// export class IsPinValid implements ValidatorConstraintInterface {
//   constructor(protected readonly userService: UserService) {}

//   async validate(value: string, args: ValidationArguments) {
//     if (!args.object || !args.object['userId']) {
//       return false;
//     }

//     const user = await this.userService.userRepository.findOne({
//       where: [{ id: args.object['userId'] }],
//     });

//     if (!user?.pin) {
//       return false;
//     }

//     return compare(value, user.pin);
//   }

//   defaultMessage(validationArguments?: ValidationArguments): string {
//     return `The provided PIN is incorrect`;
//   }
// }
