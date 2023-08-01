import { renderHook } from '@testing-library/react-hooks';
import * as z from 'zod';
import { useValidators } from './useValidators';

const createSchema = (schema: z.ZodObject<{ field: z.ZodTypeAny }>) => {
  const { result } = renderHook(() => useValidators());

  const { createResolver } = result.current;

  const resolver = createResolver(schema);
  const getError = async (value: string | Date | Record<string, unknown> | null | undefined) => {
    const res = await resolver({ field: value }, null, {
      criteriaMode: 'firstError',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fields: { field: null },
      shouldUseNativeValidation: false,
    });
    return 'field' in res.errors ? res.errors.field?.message : '';
  };

  return { getError };
};

describe('useValidators', () => {
  it('alphaNumericEn', async () => {
    const { result } = renderHook(() => useValidators());

    const { validators } = result.current;

    const { getError } = createSchema(z.object({ field: validators.alphaNumericEn }));

    expect(await getError('1aA')).toEqual('');
    expect(await getError('@')).toEqual('Valid characters are A-Z a-z 0-9');
    expect(await getError(' ')).toEqual('Valid characters are A-Z a-z 0-9');
    expect(await getError('.')).toEqual('Valid characters are A-Z a-z 0-9');
    expect(await getError('-')).toEqual('Valid characters are A-Z a-z 0-9');
  });

  it('uppercaseAlphaNumericEn', async () => {
    const { result } = renderHook(() => useValidators());

    const { validators } = result.current;

    const { getError } = createSchema(z.object({ field: validators.uppercaseAlphaNumericEn }));

    expect(await getError('A5')).toEqual('');
    expect(await getError('AB')).toEqual('');
    expect(await getError('32')).toEqual('');
    expect(await getError('ab')).toEqual('Valid characters are A-Z 0-9');
    expect(await getError(' ')).toEqual('Valid characters are A-Z 0-9');
    expect(await getError('.')).toEqual('Valid characters are A-Z 0-9');
    expect(await getError('-')).toEqual('Valid characters are A-Z 0-9');
  });

  it('dateInFuture', async () => {
    const { result } = renderHook(() => useValidators());

    const { validators } = result.current;

    const { getError } = createSchema(z.object({ field: validators.dateInFuture() }));

    expect(await getError(new Date('02.02.3000'))).toEqual('');
    expect(await getError(new Date('02.02.2000'))).toEqual('Invalid input');
    expect(await getError('02.02.3000')).toEqual('Expected date, received string');
  });

  it('email', async () => {
    const { result } = renderHook(() => useValidators());

    const { validators } = result.current;

    const { getError } = createSchema(
      z.object({ field: validators.trimDoubleLines(validators.trim(validators.email())) })
    );

    expect(await getError('test@tt.tt')).toEqual('');
    expect(await getError('ab')).toEqual('Please fill in a valid email address');
    expect(await getError(' ')).toEqual('Please fill in a valid email address');
    expect(await getError('.')).toEqual('Please fill in a valid email address');
    expect(await getError('-')).toEqual('Please fill in a valid email address');
  });

  it('file', async () => {
    const { result } = renderHook(() => useValidators());

    const { validators } = result.current;

    const { getError } = createSchema(
      z.object({
        field: validators.file({ allowedFileExtensions: ['PDF'], maxFileSize: '35125KB' }),
      })
    );

    expect(await getError('')).toEqual("This field can't be empty");
  });

  it('file default', async () => {
    const { result } = renderHook(() => useValidators());

    const { validators } = result.current;

    const { getError } = createSchema(
      z.object({
        field: validators.file(),
      })
    );

    expect(await getError('')).toEqual("This field can't be empty");
  });

  it.each<'allowedFileExtensions' | 'maxFileSize'>(['allowedFileExtensions', 'maxFileSize'])(
    'should validate nullish file value correctly when %s specified',
    async (validation) => {
      const fileValidations = { allowedFileExtensions: ['PDF'], maxFileSize: '1MB' };
      const fileValidationPayload = { [validation]: fileValidations[validation] };

      const { result } = renderHook(() => useValidators());
      const { validators } = result.current;
      const { getError } = createSchema(
        z.object({
          field: validators.file(fileValidationPayload),
        })
      );

      expect(await getError(null)).toEqual("This field can't be empty");
    }
  );

  it('requiredObject', async () => {
    const { result } = renderHook(() => useValidators());
    const { validators } = result.current;
    const { getError } = createSchema(
      z.object({ field: validators.requiredObject(z.object({ name: z.string() }), 'error') })
    );

    expect(await getError({ name: '' })).toEqual('');
    expect(await getError({ name: '1234' })).toEqual('');
    expect(await getError({ name: '', extraField: 0 })).toEqual('');
    expect(await getError(null)).toEqual('error');
    expect(await getError(undefined)).toEqual('error');
    expect(await getError('string')).toEqual('Expected object, received string');
  });

  it('stringEn', async () => {
    const { result } = renderHook(() => useValidators());

    const { validators } = result.current;

    const { getError } = createSchema(z.object({ field: validators.stringEn }));

    expect(await getError('1aA -_. ')).toEqual('');
    expect(await getError('@')).toEqual('Valid characters are A-Z a-z 0-9 . _ -');
  });

  it('ownReference', async () => {
    const { result } = renderHook(() => useValidators());

    const { validators } = result.current;

    const { getError } = createSchema(z.object({ field: validators.ownReference }));

    expect(await getError('1aA -_. ')).toEqual('');
    expect(await getError('@')).toEqual('Valid characters are A-Z a-z 0-9 . _ -');
    expect(await getError('long long long long long long string')).toEqual('Max 25 characters are allowed');
  });

  it('partNumber', async () => {
    const { result } = renderHook(() => useValidators());

    const { validators } = result.current;

    const { getError } = createSchema(z.object({ field: validators.partNumber }));

    expect(await getError('1aAds21')).toEqual('');
    expect(await getError('1')).toEqual('At least 6 characters must be set');
    expect(await getError('@')).toEqual('Valid characters are A-Z a-z 0-9');
    expect(await getError(' ')).toEqual('Valid characters are A-Z a-z 0-9');
    expect(await getError('.')).toEqual('Valid characters are A-Z a-z 0-9');
    expect(await getError('-')).toEqual('Valid characters are A-Z a-z 0-9');
    expect(await getError('longlonglonglonglonglongstring')).toEqual('Max 10 characters are allowed');
  });

  describe('stringNotEmpty', () => {
    it('default error', async () => {
      const { result } = renderHook(() => useValidators());

      const { validators } = result.current;

      const { getError } = createSchema(z.object({ field: validators.stringNotEmpty() }));

      expect(await getError('ABC')).toEqual('');
      expect(await getError('')).toEqual("This field can't be empty");
    });

    it('custom error', async () => {
      const { result } = renderHook(() => useValidators());

      const { validators } = result.current;

      const { getError } = createSchema(z.object({ field: validators.stringNotEmpty('my own error message') }));

      expect(await getError('ABC')).toEqual('');
      expect(await getError('')).toEqual('my own error message');
    });
  });

  it('Should emit default error', async () => {
    const { result } = renderHook(() => useValidators());

    const { validators } = result.current;

    const { getError } = createSchema(
      z.object({ field: validators.stringEn.refine((string) => string !== '1', { params: {} }) })
    );
    expect(await getError('1')).toEqual('Invalid input');
  });

  it('Should emit custom error', async () => {
    const { result } = renderHook(() => useValidators());

    const { validators } = result.current;

    const { getError } = createSchema(
      z.object({
        field: validators.stringEn.refine((string) => string !== '1', { params: { myField: 'custom error text' } }),
      })
    );
    expect(await getError('1')).toEqual('Bad input: custom error text');
  });

  it('Should emit wrong type error', async () => {
    const { result } = renderHook(() => useValidators());

    const { validators } = result.current;

    const { getError } = createSchema(z.object({ field: validators.stringEn }));
    const number = 1 as unknown;
    expect(await getError(number as string)).toEqual('Expected string, received number');
  });

  it('Should emit empty field error', async () => {
    const { result } = renderHook(() => useValidators());

    const { validators } = result.current;

    const { getError } = createSchema(z.object({ field: validators.stringEn }));

    expect(await getError(undefined)).toEqual("This field can't be empty");
  });
});
