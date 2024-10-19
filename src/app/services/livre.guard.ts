import { CanActivateFn } from '@angular/router';

export const livreGuard: CanActivateFn = (route, state) => {
  return true;
};
