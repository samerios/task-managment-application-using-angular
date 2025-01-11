import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDetails } from 'src/app/shared/models/task/task-details';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskDetailsService {
  private readonly api = `${environment.apiUrl}TaskDetails`;

  constructor(private http: HttpClient) { }

  getUserTasks(userId: number): Observable<any> {
    return this.http.get<{ token: string }>(`${this.api}/TaskDetailsBelongsToUser/${userId}`);
  }

  createTask(taskDetails: TaskDetails) {
    return this.http.post<{ token: string }>(`${this.api}`, taskDetails);
  }

  putTask(id: number, taskDetails: any) {
    return this.http.patch<{ token: string }>(`${this.api}/${id}`, taskDetails);
  }
}
