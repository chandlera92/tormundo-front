import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class ImageUploadService {

  private fileObj: BehaviorSubject<any>;

  constructor() {
    this.fileObj = new BehaviorSubject<any>({
      file: null,
      imgSelected: false,
      loc: null
    });
  }

  setFile(file: any) {
    this.fileObj.next(file);
  }

  getFile(): Observable<any> {
    return this.fileObj.asObservable();
  }

}
