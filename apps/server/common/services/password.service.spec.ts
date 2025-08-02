import { PasswordService } from './password.service';

describe('PasswordService', () => {
  describe('hash', () => {
    it('returns a hashed string for a valid password', async () => {
      const password = 'validPassword';
      const hashed_password = await PasswordService.hash(password);
      expect(hashed_password).toMatch(/^\$2[ayb]\$.{56}$/);
    });

    it('returns different hashes for the same password', async () => {
      const password = 'validPassword';
      const hashed_password_1 = await PasswordService.hash(password);
      const hashed_password_2 = await PasswordService.hash(password);
      expect(hashed_password_1).not.toBe(hashed_password_2);
    });
  });

  describe('compare', () => {
    it('returns true for matching password and hash', async () => {
      const password = 'validPassword';
      const hashed_password = await PasswordService.hash(password);
      const is_match = await PasswordService.compare(password, hashed_password);
      expect(is_match).toBe(true);
    });

    it('returns false for non-matching password and hash', async () => {
      const password = 'validPassword';
      const hashed_password = await PasswordService.hash(password);
      const is_match = await PasswordService.compare(
        'invalidPassword',
        hashed_password,
      );
      expect(is_match).toBe(false);
    });
  });
});
