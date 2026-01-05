import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpaService {

  // Base URL
  private baseUrl = 'https://EXAMPLE.COM';

  // Endpunkte
  private usersUrl = this.baseUrl + '/users';
  private kriterienUrl = this.baseUrl + '/kriterien';

  constructor(private http: HttpClient) {
  }

  getExampleCriteria(): Observable<any> {
    return this.http.get<any>('mock/criteria.example.json');
  }


  // ---------- User ----------

  getUsers(): Observable<any> {
    return this.http.get<any>(this.usersUrl);
  }

  createUser(username: string): Observable<any> {
    return this.http.post<any>(this.usersUrl, {
      username: username
    });
  }

  // ---------- Kriterien ----------

  getKriterien(username: string): Observable<any> {
    return this.http.get<any>(this.kriterienUrl + '/' + username);
  }

  // ---------- Anforderung abhaken ----------

  updateAnforderung(
    username: string,
    anforderungId: number,
    isComplete: boolean
  ): Observable<any> {
    return this.http.put<any>(
      this.usersUrl +
      '/' +
      username +
      '/anforderungen/' +
      anforderungId,
      {
        isComplete: isComplete
      }
    );
  }

  // ---------- Kommentar speichern ----------

  updateKommentar(
    username: string,
    kriteriumId: string,
    comment: string
  ): Observable<any> {
    return this.http.put<any>(
      this.usersUrl +
      '/' +
      username +
      '/kriterien/' +
      kriteriumId +
      '/comment',
      {
        comment: comment
      }
    );
  }
}
