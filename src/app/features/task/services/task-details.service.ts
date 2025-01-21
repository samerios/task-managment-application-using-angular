import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateTaskDetails,
  TaskDetails,
} from 'src/app/shared/models/task/task-details';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskDetailsService {
  private readonly api = `${environment.apiUrl}TaskDetails`;

  constructor(private http: HttpClient) {}

  getUserTasks(userId: string): Observable<TaskDetails[]> {
    return this.http.get<TaskDetails[]>(
      `${this.api}/TaskDetailsBelongsToUser/${userId}`
    );
  }

  createTask(taskDetails: CreateTaskDetails) {
    return this.http.post<any>(`${this.api}`, taskDetails);
  }

  putTask(id: number, taskDetails: any) {
    return this.http.put<any>(`${this.api}/${id}`, taskDetails);
  }

  deleteTask(id: number) {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
}
