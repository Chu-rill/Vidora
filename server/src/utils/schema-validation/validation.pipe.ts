import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

@Injectable()
export class ZodPipe implements PipeTransform<any> {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (err) {
      if (err instanceof ZodError) {
        const errorMessages: string[] = [];
        for (let i = 0; i < err.issues.length; i++) {
          errorMessages.push(err.issues[i].message);
        }
        throw new BadRequestException(errorMessages);
      }
    }
  }
}
