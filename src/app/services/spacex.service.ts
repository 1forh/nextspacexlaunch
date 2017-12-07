import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// constants
const API_BASE = '//api.spacexdata.com/v2';

@Injectable()
export class SpaceXService {
  constructor(private http: HttpClient) { }

  public getLatestLaunches(): Observable<any> {
    try {
      return this.http.get(`${API_BASE}/launches/latest`);
    } catch (error) {
      console.error('Error from SpaceXService: ', error);
    }
  }

  public getUpcomingLaunces(): Observable<any> {
    try {
      return this.http.get(`${API_BASE}/launches/upcoming`);
    } catch (error) {
      console.error('Error from SpaceXService: ', error);
    }
  }
}