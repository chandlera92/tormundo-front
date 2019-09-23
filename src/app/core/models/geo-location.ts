export class GeoLocation {
  constructor(public id: number,
              public organization_id: number,
              public project_id: number,
              public country: string,
              public city: string,
              public lat: number,
              public lng: number) {
  }
}
