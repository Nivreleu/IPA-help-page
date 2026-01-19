import { Injectable } from '@angular/core';

export type Guetestufe = 'G1' | 'G2' | 'G3' | 'NZ';
type UserGrades = Record<string, Guetestufe>; // criterionId -> Guetestufe

@Injectable({ providedIn: 'root' })
export class GradeService {
  private keyForUser(username: string) {
    const clean = (username ?? 'unknown').trim().toLowerCase();
    return `ipahelp:grades:${clean}`;
  }

  private read(username: string): UserGrades {
    try {
      const raw = localStorage.getItem(this.keyForUser(username));
      if (!raw) return {};
      return JSON.parse(raw) as UserGrades;
    } catch {
      return {};
    }
  }

  private write(username: string, data: UserGrades) {
    localStorage.setItem(this.keyForUser(username), JSON.stringify(data));
  }

  getGrade(username: string, criterionId: string): Guetestufe | null {
    const data = this.read(username);
    return data[criterionId] ?? null;
  }

  setGrade(username: string, criterionId: string, grade: Guetestufe) {
    const data = this.read(username);
    data[criterionId] = grade;
    this.write(username, data);
  }

  getAllGrades(username: string): UserGrades {
    return this.read(username);
  }

  clearUser(username: string) {
    localStorage.removeItem(this.keyForUser(username));
  }
}
