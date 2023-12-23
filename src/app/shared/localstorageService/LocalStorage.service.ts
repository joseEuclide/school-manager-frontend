// local-storage.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  setIntItem(key: string, value: number): void {
    localStorage.setItem(key, value.toString());
  }

  getIntItem(key: string): number | null {
    const item = localStorage.getItem(key);
    return item ? parseInt(item, 10) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
