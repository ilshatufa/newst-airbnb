import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ParamValidationPipe implements PipeTransform {
  async transform(value, metadata: ArgumentMetadata) {
    console.log(metadata);
    if (metadata.type === 'param') {
      // This is the relevant part: value -> { id: value }
      const valueInstance = plainToClass(metadata.metatype, { id: value });
      const validationErrors = await validate(valueInstance);
      if (validationErrors.length > 0) {
        throw new BadRequestException(validationErrors, 'Invalid route param');
      }
      console.log(valueInstance);
      return valueInstance;
    } else {
      console.log(value);
      return value;
    }
  }
}
