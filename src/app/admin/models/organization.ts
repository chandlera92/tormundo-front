import {AppFile} from '../../core/models/appfile';
import {OrganizationDisplayCard} from '../../core/models/organization-display-card';
import {GeoLocation} from '../../core/models/geo-location';

/*export class Organization {
  constructor(public id: number,
              public name: string,
              public language_id: number,
              public profiles: OrganizationProfile[],
              public cards: OrganizationDisplayCard[],
              public files: AppFile[],
              public location: GeoLocation) {
  }
}*/
export class Organization {
  constructor(public id: number,
              public name: string,
              public language_id: number,
              public location: GeoLocation) {
  }
}

export class Organization1 {
  constructor(public id: number,
              name: string,
              language_id: number,
              location: GeoLocation,
              files: AppFile[]) {
  }
}

export class OrganizationProfile {
  constructor(public id: number,
              public language_id: number,
              public description: string,
              public isPublic: boolean) {

  }
}

export class OrganizationCard {
  constructor(public id: number,
              public language_id: number,
              public description: string,
              public image: AppFile,
              public location: GeoLocation,
              public isPublic: boolean) {
  }
}



