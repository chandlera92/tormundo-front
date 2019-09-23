import {AppFile} from './appfile';
import {GeoLocation} from './geo-location';

export class OrganizationDisplayCard {
  constructor(public id: number,
              public name: string,
              public description: string,
              public language_id: number,
              public isPublic: boolean,
              public file: AppFile,
              public location: GeoLocation) {
  }
}
