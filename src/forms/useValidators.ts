import * as z from 'zod';
import type { ZodObject, ZodTypeAny } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface Lables {
  CANNOT_BE_EMPTY: () => string;
  MIN_CHARS: (minimum: number) => string;
  MAX_CHARS: (minimum: number) => string;
  BAD_INPUT: (field: string) => string;
  VALID_CHARACTERS: (chars: string) => string;
  INVALID_EMAIL: () => string;
  ATTACHMENTS_UNSUPPORTED_EXTENSION: () => string;
  ATTACHMENTS_MAX_SIZE_EXCEEDED: (maxFileSize?: MaxFileSize) => string;
  ATTACHMENTS_DUPLICATION: () => string;
}

type MaxFileSize = `${number}${'KB' | 'MB'}`;

interface FileValidationPayload {
  notFileMessage?: string;
  maxFileSize?: MaxFileSize;
  maxFileSizeMessage?: string;
  allowedFileExtensions?: string[];
  fileExtensionsMessage?: string;
}

const EMAIL_DOMAIN_PATTERN = /[^a-z0-9.-]/gi;

// hook is required because error messages will be localized with react-i18-next
// translation messages are accessible only inside react component or hook
export const useValidators = (labels?: Lables) => {
  const l = labels || {
    CANNOT_BE_EMPTY: () => "This field can't be empty",
    MIN_CHARS: (count) => `At least ${count} characters must be set`,
    MAX_CHARS: (count) => `Max ${count} characters are allowed`,
    BAD_INPUT: (field) => `Bad input: ${field}`,
    VALID_CHARACTERS: (chars) => `Valid characters are ${chars}`,
    INVALID_EMAIL: () => 'Please fill in a valid email address',
    ATTACHMENTS_UNSUPPORTED_EXTENSION: () => 'This file format is not allowed',
    ATTACHMENTS_MAX_SIZE_EXCEEDED: (size = '1000MB') => `Attachment must be less than ${size}`,
    ATTACHMENTS_DUPLICATION: () => 'File with same name has already been uploaded',
  };

  const errorMap: z.ZodErrorMap = (error, ctx) => {
    /*

    If error.message is set, that means the user is trying to
    override the error message. This is how method-specific
    error overrides work, like this:

    z.string().min(5, { message: "TOO SMALL 🤬" })

    It is a best practice to return `error.message` if it is set.

    */
    if (error.message) return { message: error.message };

    /*
    This is where you override the various error codes
    */
    switch (error.code) {
      case z.ZodIssueCode.too_big: {
        return { message: l.MAX_CHARS(error.maximum) };
      }
      case z.ZodIssueCode.too_small: {
        if (error.minimum === 1) {
          return { message: l.CANNOT_BE_EMPTY() };
        }
        return { message: l.MIN_CHARS(error.minimum) };
      }
      case z.ZodIssueCode.invalid_string: {
        if (error.validation === 'email') {
          return { message: l.INVALID_EMAIL() };
        }
        break;
      }
      case z.ZodIssueCode.invalid_union: {
        if (error.message) {
          return { message: error.message };
        }
        // return the first error message
        return { message: error.unionErrors[0].errors[0].message };
      }
      case z.ZodIssueCode.invalid_type: {
        if (error.received === 'undefined' || error.received === 'null') {
          return { message: l.CANNOT_BE_EMPTY() };
        }
        break;
      }
      case z.ZodIssueCode.custom: {
        // produce a custom message using error.params
        // error.params won't be set unless you passed
        // a `params` arguments into a custom validator
        const params = error.params || {};
        if (params.myField) {
          return { message: l.BAD_INPUT(params.myField) };
        }

        break;
      }
      default:
        break;
    }

    // fall back to default message!
    return { message: ctx.defaultError };
  };

  const positiveInt = z.string().regex(/^[0-9]*$/, l.VALID_CHARACTERS('0-9'));

  const alphaNumericEn = z.string().regex(/^[a-zA-Z0-9]*$/, l.VALID_CHARACTERS('A-Z a-z 0-9'));

  const uppercaseAlphaNumericEn = z.string().regex(/^[A-Z0-9]*$/, l.VALID_CHARACTERS('A-Z 0-9'));

  const stringEn = z.string().regex(/^[a-zA-Z0-9_\-. ]*$/, l.VALID_CHARACTERS('A-Z a-z 0-9 . _ -'));

  const dateInFuture = (message?: string) =>
    z.date().refine((val) => val.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0), { message });

  const stringNotEmpty = (message?: string) =>
    z
      .string()
      .min(1, message)
      .regex(/^$|.*\S+.*/);

  const trim = (schema: ZodTypeAny) =>
    z.preprocess((value) => (typeof value === 'string' ? String(value).trim() : value), schema);

  const trimDoubleLines = (schema: ZodTypeAny) =>
    z.preprocess((value) => (typeof value === 'string' ? String(value).replace(/[\r\n]{2,}/g, '\n\n') : value), schema);

  const requiredEntity = <T extends ZodTypeAny>(validationType: T, message: string) => {
    return z.union([
      validationType,
      z.null().refine((val) => val !== null, {
        message,
      }),
      z.undefined().refine((val) => val !== undefined, {
        message,
      }),
    ]);
  };

  const requiredObject = <T extends { [key: string]: ZodTypeAny }>(validationType: ZodObject<T>, message: string) => {
    return requiredEntity(validationType, message);
  };

  const email = (localPartMaxLength = 64, message = l.INVALID_EMAIL()) =>
    z
      .string()
      .email()
      .refine((val) => {
        const emailParts = val.split('@');
        return (
          typeof val === 'string' &&
          emailParts[0].length <= localPartMaxLength &&
          !EMAIL_DOMAIN_PATTERN.test(emailParts[1])
        );
      }, message);

  const convertKBToBytes = (kb: number) => kb * 1024;

  function getMaxFileSize(maxFileSize: MaxFileSize) {
    const sizeValue = Number(maxFileSize.match(/([0-9]*[.])?[0-9]+/)?.[0]);
    const size = maxFileSize.includes('KB') ? sizeValue : sizeValue * 1024;

    return convertKBToBytes(size);
  }

  const file = (payload?: FileValidationPayload) =>
    z
      .instanceof(File, {
        message: payload?.notFileMessage || l.CANNOT_BE_EMPTY(),
      })
      .refine((fileValue) => {
        if (!payload?.allowedFileExtensions) return true;
        const allowedExtensions = payload.allowedFileExtensions?.map((type) => type.toLowerCase());
        const extension = fileValue?.name?.toLowerCase().split('.').pop() || '';
        return allowedExtensions.includes(extension);
      }, payload?.fileExtensionsMessage || l.ATTACHMENTS_UNSUPPORTED_EXTENSION())
      .refine((fileValue) => {
        if (!payload?.maxFileSize) return true;
        const actualFileSize = fileValue?.size ?? 0;
        const maxFileSizeInBytes = getMaxFileSize(payload.maxFileSize);
        return actualFileSize <= maxFileSizeInBytes;
      }, payload?.maxFileSizeMessage || l.ATTACHMENTS_MAX_SIZE_EXCEEDED(payload?.maxFileSize));

  const validators = {
    positiveInt,
    alphaNumericEn,
    uppercaseAlphaNumericEn,
    stringEn,
    dateInFuture,
    stringNotEmpty,
    trim,
    trimDoubleLines,
    ownReference: stringEn.max(25),
    partNumber: alphaNumericEn.min(6).max(10),
    requiredEntity,
    requiredObject,
    email,
    file,
  };

  const createResolver = (schema: z.ZodSchema<unknown>) => zodResolver(schema, { errorMap });

  return {
    createResolver,
    validators,
  };
};
